import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';

export default class MyUpcomingEvents extends React.Component {
    constructor(){
        super();
        this.state = {
            eventList: [],
            userId: firebase.auth().currentUser.email,
            eventId: ''
        }
        this.eventref = null;
    }
    getMyEvents = ()=>{
        this.eventref = db.collection("participants").where('participant', '==', this.state.userId).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
            this.setState({
                eventId: doc.data()
            })})
        })
        console.log(this.state.eventId);
        this.eventref2 = db.collection("invites").where('ID', '==', this.state.eventId).onSnapshot((snapshot)=>{
            var requestList = snapshot.docs.map((doc)=>doc.data())    
            this.setState({
                eventList: requestList
            })
        })
    }
    componentDidMount(){
        this.getMyEvents();
    }
    componentWillUnmount(){
        this.eventref = null;
    }
    keyExtractor = (item, index)=>index.toString();
    renderItem= ({item, I})=>{
        return(
            <ListItem >
                <ListItem.Content onPress = {()=>{
                this.props.navigation.navigate("EventDetails",{"details": item})
            }}>
                    <ListItem.Title>{item.invite}</ListItem.Title>
                    <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            )}
            
    /*renderItem= ({item, I})=>{
        return(
            <ListItem key = {I} 
            title = {item.invite} subtitle = {item.time} titleStyle = {{color: 'black', fontWeight: 'bold'}} 
            rightElement = {<TouchableOpacity style = {styles.button} 
            onPress = {()=>{
                this.props.navigation.navigate("EventDetails",{"details": item})
            }}>
                                <Text style = {styles.buttonText}> View </Text>
                            </TouchableOpacity>}
            bottomDivider/>
        )                                                                     
    }*/
        render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "My Upcoming Events"></MyHeader>
                <View style = {{flex: 1}}>
                    {this.state.eventList.length == 0?(
                        <View style = {{flex: 1}}>
                            <Text style = {{fontSize: 20}}>Events</Text>
                        </View>
                    ):(
                        <FlatList keyExtractor = {this.keyExtractor} 
                        data = {this.state.eventList}
                        renderItem = {this.renderItem}></FlatList>
                    )}
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    keyView: {
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }, 
    button: {
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    },
    input: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 12,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText:{
        color: 'black',
        fontSize: 20
    }
})