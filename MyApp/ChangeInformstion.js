


import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  View,
  AsyncStorage,
  Navigator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;



export default class Personal extends Component{
  constructor(props){
    super(props);
    this.state = {
        results: []
    }
        this2=this;
        AsyncStorage.getAllKeys(function (error, result) {
            if (!error) {
                if(result){
                    this2.setState({
                        results: result
                    })
                }
            }
        })

  }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.upContainer}>
                    <View style={{flex:2}}>

                        <TouchableHighlight
                            style={styles.upNavi}
                            underlayColor='transparent'
                            onPress={()=>{
                                 navigate('Set',{page:'Set'})
                             }}>
                            <Text style={styles.back}>〈  返回</Text>
                        </TouchableHighlight>


                    </View>
                    <View style={styles.downPageButton}>



                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.back}>个人信息</Text>


                    </View>
                    <View style={styles.downPageButton}>



                    </View>

                    <View style={styles.downPageButton}>

                    </View>
                </View>
                <View style={styles.downContainer}>
                    <View style={styles.personalInformation}>
                        <TouchableHighlight
                            style={styles.txtCommon}
                            underlayColor='transparent'
                            onPress={()=>{
                                 navigate('home',{page:'reLog'})
                             }}>
                            <Text>退出登录</Text>
                        </TouchableHighlight>
                        <Icon style={styles.iconCommon} name='angle-right' size={20}/>
                     </View>
                    <View style={styles.personalInformation}>
                        <Text
                            style={styles.txtCommon}
                            >
                            所在城市{this.load('username')}</Text>

                    </View>
                </View>



            </View>

        )

    }
     _delete(key) {
            return AsyncStorage.removeItem(key);
     }
     load(keyName) {
         //this 是指当前对象
          this2 = this;
          AsyncStorage.getItem(keyName, function (error, result) {
               if (!error) {
                     this2.setState(
                       {
                         results: result
                       }
                     )
               }
           })
           return this.state.results
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    downContainer: {
        flex: 9,

    },
    iconCommon: {
        marginRight: 10
    },
    txtCommon: {
        marginLeft: 15,
        flex: 1
    },

    personalInformation:{
        height:ScreenHeight/12,
        borderBottomWidth:10,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff'

    },
    upContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7',

    },
    downPageButton:{
        flex:1,

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    back:{
        fontSize:20
    },
    upNavi:{


    }

})