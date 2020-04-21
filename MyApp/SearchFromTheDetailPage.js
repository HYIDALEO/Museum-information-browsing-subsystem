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
//export 因为要在其他类中使用
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class SearchFromTheDetailPage extends Component{

        constructor(props){
              super(props);
            let choose = '';
            let forma = '';//要进行查询的表
            let museum = '';
            if('params' in props.navigation.state){
                choose = props.navigation.state.params.choose
                museum = props.navigation.state.params.museum
            }
            if(choose == '1'){
                forma = 'educationitem'
            }else if(choose == '2'){
                forma = 'exhibitionitem'
            }else if(choose == '3'){
                forma = 'collectionitem'
            }else if(choose == '4'){
                forma = 'news'
            }else if(choose == '5'){
                forma = 'learningitem'
            }
              this.state = {
                form: forma,
                text: museum,
                content:'',
                museumList:[],
                choose:choose,
                museumName:'',
              };

              this.fetchSearchDiFormInformation("http://192.168.111.1/searchFromTheDetailPage.php")
          }
    render(){
        const { navigate } = this.props.navigation;

        return (
        <View style={styles.container}>
                <View style={styles.backdrop}>

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
                                            if(this.state.choose == '1'){
                                                forma = 'educationitem'
                                                navigate('EducationItem',{museum:this.state.text,name:item,user:this.props.navigation.state.params.user})
                                            }else if(this.state.choose == '2'){
                                                forma = 'exhibitionitem'
                                                navigate('ExhibitionItem',{museum:this.state.text,name:item,user:this.props.navigation.state.params.user})
                                            }else if(this.state.choose == '3'){
                                                forma = 'collectionitem'
                                                navigate('EducationItem',{museum:this.state.text,name:item,user:this.props.navigation.state.params.user})
                                            }else if(this.state.choose == '4'){
                                                forma = 'news'
                                                navigate('EducationItem',{museum:this.state.text,name:item,user:this.props.navigation.state.params.user})
                                            }else if(this.state.choose == '5'){
                                                forma = 'learningitem'
                                                navigate('LearningItem',{museum:this.state.text,name:item,user:this.props.navigation.state.params.user})
                                            }

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

     fetchSearchDiFormInformation=(url_test)=>{


         let formData = new FormData();

         formData.append("museum",this.state.text)
         formData.append("form",this.state.form)
         formData.append("choose",this.state.choose)
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
                    museumList:SearchList,

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