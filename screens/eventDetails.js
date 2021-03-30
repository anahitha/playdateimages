import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class EventDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: '',
            organiserId: this.props.navigation.getParam('details')["userId"],
            eventId: this.props.navigation.getParam('details')["ID"],
            event: this.props.navigation.getParam('details')["invite"],
            description: this.props.navigation.getParam('details')["description"],
            time: this.props.navigation.getParam('details')["time"],
            organiserName: '',
            organiserContact: '',
            organiserAddress: '',
            organiserEmail: '',
            organisereventDocId: ''
        }
        console.log("printing user id")
        console.log(this.state.userId)
    }   
    getOrganiserDetails = ()=>{
        db.collection('users').where('email', '==', this.state.organiserId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    organiserName: doc.data().firstName,
                    organiserContact: doc.data().contact,
                    organiserAddress: doc.data().address,
                    organiserEmail: doc.data().email
                })
            })
        });
        db.collection('invites').where('ID', '==', this.state.eventId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    organisereventDocId: doc.id
                })
            })
        })
    }
    getUserDetails = (userId)=>{
        db.collection('users').where('email', '==', this.state.userId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    userName: doc.data().firstName + ' '+ doc.data().lastName
                })
            })
        })    
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addNotification = ()=>{
        var message =this.state.userName + " is interested in attending";
        var notificationId = this.createUniqueId();
        db.collection('notifications').add({
            targetUserId: this.state.organiserId,
            user: this.state.userId,
            eventId: this.state.eventId,
            event: this.state.event,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notificationStatus: 'unread',
            message: message,
            notificationId:notificationId
        })
        console.log("Hi, hello, how are you");
        db.collection('participants').add({
            "participant": this.state.userId,
            "status": 'unconfirmed',
            "eventId": this.state.eventId,
            "organiser": this.state.organiserEmail
        })
    }
    componentDidMount(){
        this.getOrganiserDetails();
        this.getUserDetails(this.state.userId);
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex: 0.1}}>
                    <Header 
                        leftComponent = {<Icon name = 'arrow-left' type= 'feather' color = '#696969' onPress= {()=>this.props.navigation.goBack()}></Icon>}
                        centerComponent={{text: 'Sign up', style: {color: '#90a5a9', fontSize: 20, fontWeight: 'bold'}}}
                        backgroundColor = '#eaf8fe'
                    ></Header>
                </View>
                <View style = {{flex: 0.3}}>
                    <Card title= {"Event Info"} textStyle= {{fontSize: 20}}>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Event: {this.state.event}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Time: {this.state.time}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Description: {this.state.description}</Text>
                        </Card>
                    </Card>
                </View>
                <View style = {{flex: 0.3}}>
                    <Card title= {"Organiser Info"} textStyle= {{fontSize: 20}}>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Name: {this.state.organiserName}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Contact: {this.state.organiserContact}</Text>
                        </Card>
                        <Card>
                        <Text style = {{fontWeight: 'bold'}}>Address: {this.state.organiserAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style= {styles.buttonCont}>
                    {this.state.organiserId!=this.state.userId?(
                        <TouchableOpacity style = {styles.button} onPress = {()=>{
                            this.addNotification();
                            console.log("I am here");
                            this.props.navigation.navigate('UpcomingEvents');
                        }}>
                            <Text>I want to attend</Text>
                        </TouchableOpacity>
                    ):null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    buttonCont: {
        flex: 0.3,
        justifyContent: 'center'
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: '#000',
        shadowOffset:{width: 0, height: 8},
        elevation: 16
    }
})