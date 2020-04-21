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
import Icon from 'react-native-vector-icons/FontAwesome';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
//export 因为要在其他类中使用
export default class Set extends Component{
        constructor(props){
              super(props);
              this.state = {text: ''};

          }
    render(){
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <View style={styles.upContainer}>

                
                <View style={styles.personalInformation}>
                    <TouchableHighlight
                        style={styles.txtCommon}
                        underlayColor='transparent'
                        onPress={()=>{
                             navigate('About',{page:'About',user:this.props.navigation.state.params.user})
                         }}>
                        <Text style={[{fontSize:20}]}>关于</Text>
                    </TouchableHighlight>
                    <Icon style={styles.iconCommon} name='angle-right' size={20}/>
                </View>

                <View style={styles.personalInformation}>

                </View>

            </View>
            <View style={styles.downContainer}>
                <View style={styles.downPageButton}>

                    <TouchableHighlight
                        style={styles.navi}
                        underlayColor='transparent'
                        onPress={()=>{
                             navigate('home',{page:'home',user:this.props.navigation.state.params.user})
                         }}>
                       <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="home" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>首页</Text>
                        </View>
                    </TouchableHighlight>


                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.navi}
                        underlayColor='transparent'
                        onPress={()=>{
                             navigate('Search',{page:'Set',user:this.props.navigation.state.params.user})

                         }}>
                        <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="search" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>搜索</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.highNavi}
                        underlayColor='transparent'
                        onPress={()=>{

                             navigate('Set',{page:'Set',user:this.props.navigation.state.params.user})
                         }}>
                        <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="gear" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>设置</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.navi}
                        underlayColor='transparent'
                        onPress={()=>{

                             navigate('Me',{page:'Set',user:this.props.navigation.state.params.user})
                         }}>
                        <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="user" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>我</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
        )
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
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    navi: {
        height: 40,
        backgroundColor: 'dodgerblue',
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
    }

});