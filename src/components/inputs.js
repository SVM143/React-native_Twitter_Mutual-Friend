
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

class Inputs extends Component {
   state = {
      screen_name1: undefined,
      screen_name2: undefined
   }
   handleText1 = (text,type) => {
      this.setState({ screen_name1: text })
   }
   handleText2 = (text) => {
      this.setState({ screen_name2: text })
   }
   login = (screen_name1, screen_name2) => {
      alert('twitterHandle1: ' + screen_name1 + ' twitterHandle2: ' + screen_name2)
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter twitter handle"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleText1}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter twitter handle"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleText2}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => {
                     this.state.screen_name1 && this.state.screen_name2 ? Actions.Timeline({'screen_name1':this.state.screen_name1,'screen_name2':this.state.screen_name2}) :null
                  }
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      padding:70,
      justifyContent:'center',
      flex:1,
      alignItems:'center'
   },
   input: {
      margin: 15,
      height: 40,
      width:250,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      width:70,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      borderTopLeftRadius:10,
      borderTopRightRadius:10
   },
   submitButtonText:{
      color: 'white'
   }
})