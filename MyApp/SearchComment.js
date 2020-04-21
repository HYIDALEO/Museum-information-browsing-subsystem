import React, { Component } from 'react';

import {
    Image,
    TextInput,
    View,
    Text,
    Modal,
    Platform,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';
import {
    List,
    ListItem
} from 'react-native-elements';

import MyList from './MyList'
//export 因为要在其他类中使用
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class SearchComment extends Component{

        constructor(props){
              super(props);

            let museum = '';
            if('params' in props.navigation.state){

                museum = props.navigation.state.params.museum
            }

              this.state = {

                text: museum,
                content:'',
                commentList:[],
                CIDList:[],
                UserList:[],
                museumName:'',
              };

              this.fetchSearchDiFormInformation("http://192.168.111.1/searchComment.php")
              this.fetchSearchCIDInformation("http://192.168.111.1/searchCIDFromComment.php")
              this.fetchSearchUserInformation("http://192.168.111.1/searchUserFromComment.php")
          }
    render(){
        const { navigate } = this.props.navigation;
        var content = null;
        if(this.state.UserList.length>=1){
            content = <MyList theUserList={this.state.UserList}
                              theCommentList={this.state.commentList}/>

        }
        return (
        <View style={styles.container}>
                <View style={styles.backdrop}>
                    {content}
                </View>

          </View>
        )
    }

     fetchSearchUserInformation=(url_test)=>{


         let formData = new FormData();

         formData.append("museum",this.state.text)

         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
                var SearchList = this.state.UserList;
                var retData = data;

                for(var i=0;i<retData.length;i++){
                    SearchList.push(retData[i]);

                }

                this.setState({
                    UserList:SearchList,

                })

         })
         .then(response=> {
            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
     //       alert(error)
         });

     }//fetch
     fetchSearchCIDInformation=(url_test)=>{


         let formData = new FormData();

         formData.append("museum",this.state.text)

         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
                var SearchList = this.state.CIDList;
                var retData = data;

                for(var i=0;i<retData.length;i++){
                    SearchList.push(retData[i]);

                }

                this.setState({
                    CIDList:SearchList,

                })

         })
         .then(response=> {
            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
     //       alert(error)
         });

     }//fetch
     fetchSearchDiFormInformation=(url_test)=>{


         let formData = new FormData();

         formData.append("museum",this.state.text)

         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
                var SearchList = this.state.commentList;
                var retData = data;

                for(var i=0;i<retData.length;i++){
                    SearchList.push(retData[i]);

                }

                this.setState({
                    commentList:SearchList,

                })

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
    searchBox:{//搜索框
      height:30,
      flexDirection: 'row',   // 水平排布
      flex:5,
      borderRadius: 5,  // 设置圆角边
      backgroundColor: 'white',
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8,
    },
    searchIcon: {//搜索图标
        height: 20,
        width: 20,
        marginLeft: 5,
        resizeMode: 'stretch'
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
    scanIcon: {//搜索图标
        height: 26.7,
        width: 26.7,
        resizeMode: 'stretch'
    },
    container:{
            flex: 1,

    },
    backdrop:{
        flex:1,

    },
});