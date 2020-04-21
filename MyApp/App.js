/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ToastAndroid,
  Modal,
  FlatList,
  View,
  AsyncStorage,
  Navigator,
  TouchableHighlight,
  propTypes,
  Dimensions,
  Button
} from 'react-native';

import Swiper from 'react-native-swiper';
import PwdInput from 'react-native-pwd-input'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// <Icon name="ios-person" size={30} color="#4F8EF7" />
// https://oblador.github.io/react-native-vector-icons

import Search from './Search';
import Set from './Set';
import Personal from './Personal'
import About from './About'
import ChangePw from './ChangePw'
import ChangeInformation from './ChangeInformstion'
import Detail from './Detail'
import Me from './Me';
import LogOn from './LogOn';
import MuseumNearby from './MuseumNearby';
import SearchFromTheDetailPage from './SearchFromTheDetailPage';
import EducationItem from './EducationItem';
import ExhibitionItem from './ExhibitionItem';
import LearningItem from './LearningItem';
import SearchComment from './SearchComment';
import SearchCollection from './SearchCollection';


import {
    List,
    ListItem,
    SocialIcon
} from 'react-native-elements';

//import MainPage from './MainPage'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var images=[
    'http://ac-c6scxa78.clouddn.com/f6b64dc4bf7bee56.jpg',
    'http://ac-c6scxa78.clouddn.com/91ead58b0bb213b6.jpg',
    'http://ac-c6scxa78.clouddn.com/d67316858f6c71f3.jpg',
    'http://ac-c6scxa78.clouddn.com/c81c5b7be1838a1e.jpg',
    'http://ac-c6scxa78.clouddn.com/54fe022399902788.jpg',
];

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

type Props = {};
class home extends Component {
    imguri={
        shanxi:require('./img/shanxi.jpg'),
        jinsha:require('./img/jinsha.jpg'),
        xuchang:require('./img/xuchang.jpg'),
        shanghai:require('./img/shanghai.jpg'),
    }
  constructor(props){
    super(props);
    let UN = ''
    if('params' in props.navigation.state){
        UN = props.navigation.state.params.user
    }
    this.state = {
        userPwd: '',
        userName:UN,
        museumList:[],
        modalVisible: (!('params' in props.navigation.state)||(props.navigation.state.params.page=='reLog'))
    }

  }

  render() {
    
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
            <Modal
               style={[{backgroundColor:'grey',opacity: 0.5}]}
               animationType='slide'           // 从底部滑入
               transparent={false}             // 不透明
               visible={this.state.modalVisible}    // 根据isModal决定是否显示
               onRequestClose={() => {this.onRequestClose()}}  // android必须实现
            >
            <View style = {{flex:1}}>
                    <View style={[styles.item, { justifyContent: 'center'}]}>
                        <Text style={[{ fontWeight:'28' ,color: 'dodgerblue',fontSize:28, extAlign:'center',paddingTop:30}]}> 博物馆信息浏览系统 </Text>
                </View>
                <View style={styles.item}>

                    <Text style={[styles.textStyle,{paddingLeft :15}]}> 用户帐号：</Text>
                        <TextInput
                            ref="inputLoginName"
                            autoFocus={true}
                            underlineColorAndroid="grey"
                            placeholder="请输入用户名"
                            clearTextOnFocus={true}
                            clearButtonMode="while-editing"
                            style={{flex: 1,fontSize:18}}
                            onChangeText={(input) => this.setState({userName: input})}
                        ></TextInput>

                </View>

                <View style={styles.item}>
                 
                    <Text style={[styles.textStyle,{paddingLeft :15}]}> 用户密码：</Text>
                    
                        <PwdInput
                            ref="inputLoginPwd"
                            containerStyle={[{ flex: 1}]}
                            style={{ fontSize: 18, backgroundColor: 'white' }}
                            underlineColorAndroid="grey"
                            placeholder='请输入密码'
                            closeImg={require('./eye_close.png')}
                            openImg={require('./eye_open.png')}
                            clearButtonMode="while-editing"
                            clearTextOnFocus={true}
                            autoFocus={true}
                            imageStyle={[{ width: 25, height: 25 }]}
                            onChangeText={(input) => this.setState({ userPwd: input })} />
                </View>
                <TouchableHighlight
                    style={[styles.login,{backgroundColor: 'dodgerblue',}]}
                    underlayColor='transparent'
                    onPress={()=>{{this.fetchLogInInformation("http://192.168.111.1/logIn.php")}}}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.login,{backgroundColor: 'skyblue',}]}
                    underlayColor='transparent'
                    onPress={()=>{{
                        this.setState({
                            modalVisible:false,
                        })
                        navigate('LogOn',{page:'home',user:''})
                    }}}>
                    <Text style={styles.loginText}>注册</Text>
                </TouchableHighlight>

            </View>
        </Modal>
       
        <View style={styles.container}>    
          <View style={styles.upContainer}>
            <View style={styles.imageContainer}>
                <Swiper
                    height={240}
                    autoplay={true}
                >
                    {this.renderImg()}
                </Swiper>
            </View>
        
          </View>
                <View style={[{flex:5}]}>
                    <View style={[{ height:ScreenHeight / 9}]}>
                <SocialIcon
                title='附近的博物馆'
                button
                style={[{}]}
                type='wordpress'
                    onPress={()=>{
                        navigate('MuseumNearby',{page:'home',user:this.state.userName})
                    }}
                />
            </View>
          </View>
            <View style={styles.downContainer}>
                <View style={styles.downPageButton}>

                    <TouchableHighlight
                        style={styles.highNavi}
                        underlayColor='transparent'
                        onPress={()=>{
                             navigate('home',{page:'home',user:this.state.userName})
                         }}>
                         <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="home" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>首页</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.login}
                        underlayColor='transparent'
                        onPress={()=>{
                             navigate('Search',{page:'home',user:this.state.userName})

                         }}>
                        <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="search" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>搜索</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.login}
                        underlayColor='transparent'
                        onPress={()=>{

                             navigate('Set',{page:'home',user:this.state.userName})
                         }}>
                        <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="gear" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>设置</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.downPageButton}>
                    <TouchableHighlight
                        style={styles.login}
                        underlayColor='transparent'
                        onPress={()=>{

                             navigate('Me',{page:'home',user:this.state.userName})
                         }}>
                       <View style={[{flex:1,alignItems:'center',flexDirection:'column'}]}>
                            <Icon name="user" size={28} color="#fff" />  
                            <Text style={[{fontSize: 10,color: '#FFF'}]}>我</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
      </View>
    );
  }
     fetchLogInInformation=(url_test)=>{


         let formData = new FormData();
         UN = this.state.userName;
         UP = this.state.userPwd;

         formData.append("username",UN)
         formData.append("userpw",UP)
         fetch(url_test,{
            method:'POST',

      //      Origin: "xxxx",
      //      body: JSON.stringify({"username":UN,"userpw":UP}),
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
           if(data.username == "out" && data.userpw == "out"){
                alert('用户名或密码错误');
                this.setState({
                    userPwd:''
                })

           }else{


                this.setState({
                    modalVisible:false,
                })
           }


         })
         .then(response=> {
            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
     //       alert(error)
         });

     }//fetch
//在首页设置附近的博物馆按钮，点击跳转到一个新的搜索界面，在加载的时候fetch
//     fetchSearchByLocationInformation=(url_test)=>{
//
//
//         let formData = new FormData();
//         UN = this.state.userName;
//         UN = '123456'
//         formData.append("username",UN)
//         fetch(url_test,{
//            method:'POST',
//            body:formData,
//         })
//         .then(response =>response.json())
//         .then(data =>{
//                var SearchList = this.state.museumList;
//                var retData = data;
//
//                for(var i=0;i<retData.length;i++){
//                    SearchList.push(retData[i]);
//
//                }
//
//                this.setState({
//                    museum:SearchList,
//                    modalVisible:false
//                })
//                alert(this.state.museumList[0])
//
//         })
//         .then(response=> {
//            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)
//
//         })
//         .catch(error=>{
//       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
//     //       alert(error)
//         });
//
//     }//fetch

         renderImg(){
             var imageViews=[];

                 imageViews.push(
                     <Image
                         key={0}
                         style={{width: ScreenWidth, height:240,}}
                         source={this.imguri.shanxi}
                         />
                 );
                 imageViews.push(
                     <Image
                         key={1}
                         style={{width: ScreenWidth, height: 240,}}
                         source={this.imguri.jinsha}
                         />
                 );
                 imageViews.push(
                     <Image
                         key={2}
                        style={{width: ScreenWidth, height: 240,}}
                        
                         source={this.imguri.xuchang}
                         />
                 );
                 imageViews.push(
                     <Image
                         key={3}
                         style={{width: ScreenWidth, height: 240,}}
                         
                         source={this.imguri.shanghai}
                         />
                 );

             return imageViews;
         }//sw


  logonInMainPage() {
     UN = this.state.userName;
     UP = this.state.userPwd;
     key = 'username'
     this.fetchLogOnInformation("http://192.168.111.1/logOn.php");
     if(1){
        this.save(key,UN);
        //this.props.navigation.navigate('MainPage',{userName:UN});

     }else{

     }
  }
  save(key,value){
     AsyncStorage.setItem(key,value, function (error) {
         if (error) {
             alert('存储失败');
         } else {

         }
     })
  }
     _delete(key) {
            return AsyncStorage.removeItem(key);
     }
     load() {
         //this 是指当前对象
     //     this2 = this;
          AsyncStorage.getItem(keyName, function (error, result) {
               if (!error) {
                     this.setState(
                       {
                         result: result === null ? '数据已经删除，现在取的是空值' : result
                       }
                     )
               }
           })
    }
}

const App = StackNavigator({
    home:{
        screen: home,
        navigationOptions: {
              headerTitle: 'home',
              header: false,
        }
    },
    Me:{
        screen: Me,
        navigationOptions: {
              headerTitle: 'Me',
              header: false,
        }
    },
    Detail:{
        screen: Detail,
        navigationOptions: {
              headerTitle: 'Detail',
              header: false,
        }
    },
    Search:{
        screen: Search,
        navigationOptions: {
              headerTitle: 'Search',
              header: false,
        }
    },
    Set:{
        screen: Set,
        navigationOptions: {
              headerTitle: 'Set',
              header: false,
        }
    },
    Personal:{
        screen: Personal,
        navigationOptions: {
              headerTitle: 'Personal',
              header: false,
        }
    },
    About:{
        screen: About,
        navigationOptions: {
              headerTitle: 'About',
              header: false,
        }
    },

    ChangePw:{
        screen: ChangePw,
        navigationOptions: {
              headerTitle: 'ChangePw',
              header: false,
        }
    },

    ChangeInformation:{
        screen: ChangeInformation,
        navigationOption:{
              headerTitle: 'ChangeInformation',
              header: false,
        }
    },
    LogOn:{
        screen: LogOn,
        navigationOption:{
              headerTitle: 'LogOn',
              header: false,
        }
    },
    MuseumNearby:{
        screen: MuseumNearby,
        navigationOption:{
              headerTitle: 'MuseumNearby',
              header: false,
        }
    },
    SearchFromTheDetailPage:{
        screen: SearchFromTheDetailPage,
        navigationOption:{
              headerTitle: 'SearchFromTheDetailPage',
              header: false,
        }
    },
    EducationItem:{
        screen: EducationItem,
        navigationOption:{
              headerTitle: 'EducationItem',
              header: false,
        }

    },
    ExhibitionItem:{
        screen: ExhibitionItem,
        navigationOption:{
              headerTitle: 'ExhibitionItem',
              header: false,
        }
    },
    LearningItem:{
        screen: LearningItem,
        navigationOption:{
              headerTitle: 'LearningItem',
              header: false,
        }
    },
    SearchComment:{
        screen: SearchComment,
        navigationOption:{
              headerTitle: 'SearchComment',
              header: false,
        }
    },
    SearchCollection:{
        screen: SearchCollection,
        navigationOption:{
              headerTitle: 'SearchCollection',
              header: false,
        }
    }

});

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center',
        padding: 0
    },
    upContainer: {
        flex:3
    },
    downContainer:{
        flexDirection: 'row',
        height:ScreenHeight/9,
    },
    downPageButton:{
        flex:1,
        backgroundColor:'dodgerblue',
    },
    item: {
        flexDirection: 'row',
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
        height:240
    }
  
});

export default App;