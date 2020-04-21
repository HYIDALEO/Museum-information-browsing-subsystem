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

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

//export 因为要在其他类中使用
export default class MuseumNearby extends Component{
        constructor(props){
              super(props);
              this.state = {
                text: '',
                content:'',
                museumList:[],
                modalVisible:true,
                museumName:'',
              };

              this.fetchSearchByLocationInformation("http://192.168.111.1/searchByLocation.php")
          }
    render(){
        const { navigate } = this.props.navigation;

        return (
        <View style={styles.container}>
                <View style={styles.backdrop}>
                   <View style={styles.containerSea}>
                                <TouchableHighlight
                                    onPress={()=>{
                                         navigate('home',{page:'Search',user:this.props.navigation.state.params.user})
                                     }}>
                                    <Text>〈  </Text>
                                </TouchableHighlight>

                        <View style={styles.searchBox}>


                        </View>

                   </View>
                    <List>
                        <FlatList
                                renderRow={this.renderRow}
                                data={this.state.museumList}
                                keyExtractor={item => item}
                                renderItem={({item,index}) => (
                                    <ListItem
                                        title={`${item}`}
 
                                        onPress={()=>{{

                                            this.setState({
                                                museumName:'',
                                                museumList:[]
                                            })
                                            navigate('Detail',{museum:item,user:this.props.navigation.state.params.user})
                                        }}}
                                    />
                                )}
                        />
                    </List>
                </View>

          </View>
        )
    }
    search(){
        this.fetchSearchInformation()
    }
      save(key,value){
         AsyncStorage.setItem(key,value, function (error) {
             if (error) {
                 alert('存储失败');
             } else {

             }
         })
      }

     fetchSearchByLocationInformation=(url_test)=>{


         let formData = new FormData();
         UN = this.state.userName;
         UN = '123456'
         formData.append("username",UN)
         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
                var SearchList = this.state.museumList;
                var retData = data;

                for(var i=0;i<retData.length;i++){
                    SearchList.push(retData[i]);

                }

                this.setState({
                    museum:SearchList,
                    modalVisible:false
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
      height:ScreenHeight/12,
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
        flexDirection:'column'
    },
});