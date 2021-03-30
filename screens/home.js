import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            inviteList: [],
            userId: firebase.auth().currentUser.email
        }
        this.requestref = null;
    }
    getRequestedBooks = ()=>{
        this.requestref = db.collection("invites").where('status', '==', 'open').onSnapshot((snapshot)=>{
            var requestList = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                inviteList: requestList
            })
            console.log(this.state.inviteList);
        })
    }
    componentDidMount(){
        this.getRequestedBooks();
    }
    componentWillUnmount(){
        this.requestref = null;
    }
        render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "View Events"></MyHeader>
                <View style = {{flex: 1}}>
                     {this.state.inviteList.length == 0?(
                        <View style = {{flex: 1}}>
                            <Text style = {{fontSize: 20}}>              Loading</Text>
                        </View>
                    ):(
                        <FlatList
          data={this.state.inviteList}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2, flex: 1, flexDirection: 'row'}}>
                <View sytle = {{flex: 1, borderWidth: 2}}>
              <Text>{"Event: " + item.invite}</Text>
              <Text>{"Description: " + item.description}</Text>
              </View>
              <View>
              <TouchableOpacity style = {styles.button} onPress = {()=>{
                this.props.navigation.navigate("EventDetails",{"details": item})
            }}>
                                <Text style = {styles.buttonText}>View</Text>
                            </TouchableOpacity>
                            </View>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
        /> 
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
        fontSize: 20,
        marginRight: 10
    }
})