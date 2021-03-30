import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Button} from 'react-native';
import db from '../config';
import MyHeader from '../components/header';
import firebase from 'firebase';

export default class CreateEvent extends React.Component {
    constructor(){
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            title: '',
            description: '',
            time: ''
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addEvent = (title, time, request)=>{
        var userID = this.state.userID;
        var ItemId = this.createUniqueId();
        db.collection('invites').add({
            "userId": userID,
            "invite": title,
            "description": request,
            "time": time,
            "ID": ItemId,
            "status": 'open'
        })
        this.setState({
            title: '',
            time: '',
            description: ''
        })
        return Alert.alert("Event Added");
    }
    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Add Event"></MyHeader>
                <KeyboardAvoidingView style = {styles.keyView}>
                    <TextInput style = {styles.input} placeholder = {"Title"}
                    onChangeText = {(text)=>{this.setState({
                        title: text
                    })}} value = {this.state.title}></TextInput>
                    <TextInput style = {styles.input} placeholder = {"Date and Time"}
                    onChangeText = {(text)=>{this.setState({
                        time: text
                    })}} value = {this.state.time}></TextInput>
                    <TextInput style = {styles.input} placeholder = {"Description"}
                    onChangeText = {(text)=>{this.setState({
                        description: text
                    })}} value = {this.state.description}></TextInput>
                    <TouchableOpacity style = {styles.button} onPress = {()=>{
                        this.addEvent(this.state.title, this.state.time, this.state.description)
                    }}>
                        <Text style = {styles.buttonText}>Add Event</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    input: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: 'blue',
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