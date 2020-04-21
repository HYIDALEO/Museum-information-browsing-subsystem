import React, { Component } from 'react';

import {
    Image,
    TextInput,
    View,
    Text,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';
import {
    List,
    ListItem,
    SideMenu,
    SocialIcon
} from 'react-native-elements';
//export 因为要在其他类中使用

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class EducationItem extends Component{
        constructor(props){
              super(props);
              zip = props.navigation.state.params.name
              museuma = props.navigation.state.params.museum
              user  = props.navigation.state.params.user

              this.state = {
                text:zip,
                museum :museuma,
                time:'',
                content:'',
              };
              this.fetchSearchInformation("http://192.168.111.1/searchEducation.php",zip);
          }

    render(){
        const { navigate } = this.props.navigation;

        return (

        <View style={styles.container}>

                <View style={styles.downContainer}>


                    <View style={styles.title}>
                        <View style={{flex:1,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                                <View style={{flex:1}}>
                                     <Text
                                           style={styles.txtCommon}
                                     >
                                          {this.state.text}
                                     </Text>
                                </View>
                                <View style={{flex:1,flexDirection: 'column'}}>
                                     <View style={{flex:1}}>

                                     </View>
                                     <View style={{flex:1}}>
                                         <Text
                                               style={{flex: 1,fontSize:15}}
                                         >
                                              时间:{this.state.time}
                                         </Text>
                                     </View>
                                </View>
                         </View>
                    </View>
                    <View style={{flex:1}}>
                    </View>

                    <View style={styles.content}>
                         <ScrollView>
                             <Text
                                   style={styles.txtCommonContent}
                             >
                                  {this.state.content}
                             </Text>
                         </ScrollView>
                    </View>


                 </View>
          </View>

        )
    }


     fetchSearchInformation=(url_test,zip)=>{


         let formData = new FormData();
         text = zip;

         formData.append("educationName",text)
         formData.append("museum",this.state.museum)
         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{

            this.setState({
                time:data.educationTime,
                content:data.educationIntroduction
            });

         })
         .then(response=> {
            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
     //       alert(error)
         });

     }//fetch
}

const styles = StyleSheet.create({
    containerSea: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        backgroundColor: 'dodgerblue',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    logo: {//图片logo
        height: 24,
        width: 64,
        resizeMode: 'stretch'  // 设置拉伸模式
    },
    downPageButton:{
        flex:1,

    },
    buttonRow:{
        flexDirection: 'row',
        flex:1
    },
    downContainer: {
        flex: 7,

    },
    iconCommon: {
        marginRight: 10
    },
    txtCommon: {
        marginLeft: 15,
        flex: 1,
        fontSize:30
    },
    txtCommonContent: {
        marginLeft: 15,
        flex: 1,
        fontSize:15
    },
    buttonList:{
        flex:2.8,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonItem:{
        flex:1,
        alignItems: 'center',

    },
    buttonStyle:{
        width:120,
        borderRadius:0
    },


    inputText:{
      flex:1,
      backgroundColor:'transparent',
      fontSize:15,
    },
    voiceIcon: {
        marginLeft: 5,
        marginRight: 8,
        width: 15,
        height: 20,
        resizeMode: 'stretch'
    },

    container:{
            flex: 1,

    },
    backdrop:{
        flex:1,
        flexDirection:'column'
    },

    downContainer: {
        flex: 15,
        flexDirection: 'column',

    },
    back:{
        fontSize:20
    },
    upNavi:{


    },
    title:{
        flex: 1

    },
    content:{
        flex: 7.5
    },
    txtCommonContent:{
        fontSize:20
    }
});