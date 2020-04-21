/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ToastAndroid,
  Modal,
  View,
  AsyncStorage,
  Navigator,
  TouchableHighlight
} from 'react-native';

import PwdInput from 'react-native-pwd-input'
import { StackNavigator } from 'react-navigation';
import Search from './Search';
import Set from './Set';
import Personal from './Personal'
import About from './About'
import ChangePw from './ChangePw'
import ChangeInformation from './ChangeInformstion'
import Detail from './Detail'
import Me from './Me';
import {
    List,
    ListItem
} from 'react-native-elements';
//import MainPage from './MainPage'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
type Props = {};
export default class LogOn extends Component{
  constructor(props){
    super(props);
    let UN = ''
    if('params' in props.navigation.state){
        UN = props.navigation.state.params.user
    }
    this.state = {
        reUserPwd: '',
        userPwd: '',
        userName:UN,
        location:'',
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

            <View style = {{flex:1}}>
                <View style={styles.item}>
                    <Text style={styles.textStyle}>用户帐号：</Text>
                        <TextInput
                            ref="inputLoginName"
                            autoFocus={true}
                            underlineColorAndroid="gray"
                            placeholder="请输入用户名"
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1}}
                            onChangeText={(input) => this.setState({userName: input})}
                        ></TextInput>

                </View>

                <View style={styles.item}>
                    <Text style={styles.textStyle}>用户密码：</Text>
                    <TextInput
                        ref="inputLoginPwd"
                        underlineColorAndroid="gray"
                        placeholder="请输入密码"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={{ flex: 1 }}
                        onChangeText={(input) => this.setState({ userPwd: input })}
                    ></TextInput>
                </View>
                <View style={styles.item}>
                    <Text style={styles.textStyle}>重复密码：</Text>
                        <TextInput
                             ref="inputLoginPwd"
                             underlineColorAndroid="gray"
                             placeholder="再次输入密码"
                             clearTextOnFocus={true}
                             clearButtonMode="while-editing"
                             style={{flex: 1}}
                             onChangeText={(input) => this.setState({reUserPwd: input})}
                        ></TextInput>
                </View>
                <View style={styles.item}>
                    <Text style={styles.textStyle}>所在地区：</Text>
                        <TextInput
                             ref="inputLoginPwd"
                             underlineColorAndroid="gray"
                             placeholder="请输入地区"
                             clearTextOnFocus={true}
                             clearButtonMode="while-editing"
                             style={{flex: 1}}
                             onChangeText={(input) => this.setState({location: input})}
                        ></TextInput>
                </View>

                <TouchableHighlight
                    style={styles.login}
                    underlayColor='transparent'
                    onPress={()=>{{

                        if(this.state.reUserPwd==this.state.userPwd){
                            this.logonInMainPage();
                            navigate('home',{page:'reLog',user:''});
                        }else{
                            alert("密码不一致");
                        }

                    }}}>
                    <Text style={styles.loginText}>注册</Text>
                </TouchableHighlight>
            </View>


      </View>
    );
  }

     fetchLogOnInformation=(url_test)=>{


         let formData = new FormData();
         UN = this.state.userName;
         UP = this.state.userPwd;
         Location = this.state.location;

         formData.append("username",UN)
         formData.append("userpw",UP)
         formData.append("Location",Location)
         fetch(url_test,{
            method:'POST',

      //      Origin: "xxxx",
      //      body: JSON.stringify({"username":UN,"userpw":UP}),
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
           //  alert(data.userpw);
           alert(data.va)


         })
         .then(response=> {
        //    ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
            alert(error)
         });

     }//fetch



  logonInMainPage() {

     this.fetchLogOnInformation("http://192.168.111.1/logOn.php");

  }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    upContainer: {
        flex: 9,

    },
    downContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    downPageButton:{
        flex:1,
        backgroundColor:'dodgerblue'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    login: {
        borderRadius:20,
        height: 40,
        
        margin: 20,
        justifyContent: 'center',
    },
    highNavi:{
        height: 40,
        backgroundColor: 'dodgerblue',
        margin: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    },
    imageContainer:{
        flex: 4,
    },
    textContainer:{
        flex: 6,
    },
});
