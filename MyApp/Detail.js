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

export default class Detail extends Component{
        constructor(props){
              super(props);
              zip = props.navigation.state.params.museum

              this.state = {
                text:zip,
                content:'',
              };
              this.fetchSearchInformation("http://192.168.111.1/search.php",zip);
          }

    render(){
        const { navigate } = this.props.navigation;

        return (

        <View style={styles.container}>

                <View style={styles.downContainer}>
                    <View style={styles.buttonList}>
                        <View style={styles.buttonRow}>
                        <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='介绍'        //MusemuItem
                                  button
                                  style={styles.buttonStyle}
                                  type='wordpress'
                                    onPress={()=>{
                                         this.fetchSearchMuseumInformation("http://192.168.111.1/museumInformation.php",'museumitem');

                                     }}
                                />
                            </View>
                            <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='教育活动'      //EducationItem
                                  button
                                  style={styles.buttonStyle}
                                  type='twitter'
                                    onPress={()=>{
                                         navigate('SearchFromTheDetailPage',{page:'Detail',user:this.props.navigation.state.params.user,choose:'1',museum:this.state.text})

                                     }}
                                />
                            </View>
                            <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='展览'        //ExhibitionItem
                                  button
                                  style={styles.buttonStyle}
                                  type='linkedin'
                                    onPress={()=>{
                                         navigate('SearchFromTheDetailPage',{page:'Detail',user:this.props.navigation.state.params.user,choose:'2',museum:this.state.text})

                                     }}
                                />
                            </View>
                            <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='藏品'        //CollectionItem
                                  button
                                  style={styles.buttonStyle}
                                  type='instagram'
                                    onPress={()=>{
                                         navigate('SearchCollection',{page:'Detail',user:this.props.navigation.state.params.user,choose:'3',museum:this.state.text})

                                     }}
                                />
                            </View>
                            
                        </View>

                        <View style={styles.buttonRow}>
                        <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='返回'        //CollectionItem
                                  button
                                  style={styles.buttonStyle}
                                  type='medium'
                                onPress={()=>{
                                     navigate('home',{page:'search',user:this.props.navigation.state.params.user})
                                 }}
                                />
                            </View>
                            <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='新闻'        //NEWS
                                  button
                                  style={styles.buttonStyle}
                                  type='facebook'
                                    onPress={()=>{
                                         navigate('SearchFromTheDetailPage',{page:'Detail',user:this.props.navigation.state.params.user,choose:'4',museum:this.state.text})

                                     }}
                                />
                            </View>
                            <View style={styles.buttonItem}>
                            <SocialIcon
                                  title='学术活动'        //LearningItem
                                  button
                                  style={styles.buttonStyle}
                                  type='foursquare'
                                    onPress={()=>{
                                         navigate('SearchFromTheDetailPage',{page:'Detail',user:this.props.navigation.state.params.user,choose:'5',museum:this.state.text})

                                     }}
                                />
                            
                                
                            </View>
                                                  
                           
                            <View style={styles.buttonItem}>
                                <SocialIcon
                                  title='评论'        //LearningItem
                                  button
                                  style={styles.buttonStyle}
                                  type='tumblr'
                                    onPress={()=>{
                                         navigate('SearchComment',{page:'Detail',user:this.props.navigation.state.params.user,museum:this.state.text});

                                     }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.title,{backgroundColor:'dodgerblue',justifyContent:'center',alignItems:'center'}]}>
                    
               
                                <View>
                                     <Text
                                           style={[styles.txtCommon,{textShadowColor:'steelblue', textShadowOffset: {width:5,height:5}}]}
                                     >
                                          {this.state.text}
                                     </Text>
                                </View>
             
                    </View>
                    <View style={[styles.content,{backgroundColor:'lightsteelblue',paddingRight:10}]}>
                         <ScrollView style={[{top:5,}]}>
                             <Text
                                   style={[styles.txtCommonContent,{backgroundColor:'snow',width:ScreenHeight*0.7,}]}
                             >
                                  {this.state.content}
                                  console.log({this.state.content});
                             </Text>
                         </ScrollView>
                    </View>


                 </View>
          </View>

        )
    }
    fetchSearchMuseumInformation=(url_test,form)=>{


         let formData = new FormData();
         text = this.state.text;

         formData.append("text",text)
         formData.append("form",form)
         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{


            this.setState({
                content:data.basicIntroduction
            });
         })
         .then(response=> {
            ToastAndroid.show(JSON.parse(response).status, ToastAndroid.LONG)

         })
         .catch(error=>{
       //     ToastAndroid.show(error.toString(), ToastAndroid.LONG)
     //       alert(error)
         });


    }

     fetchSearchInformation=(url_test,zip)=>{


         let formData = new FormData();
         text = zip;
       //  text = "故宫博物馆";
         formData.append("text",text)

         fetch(url_test,{
            method:'POST',
            body:formData,
         })
         .then(response =>response.json())
         .then(data =>{
           let name = data.name
           if(data.name == "not found"){
                    alert('not found')
                    return;
           }


            this.setState({
                text:name,
                content:data.basicIntroduction
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

    buttonRow:{
        flexDirection: 'row',
        flex:1,
    },
    downContainer: {
        flex: 7,
        flexDirection: 'column',
    },

    txtCommon: {
        marginLeft: 15,
        fontSize:30,
        color:'snow',
        

    },
    txtCommonContent: {
        
        marginLeft: 15,
        flex: 1,
        fontSize:20
    },
    buttonList:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'lightskyblue',
        paddingBottom :5,
    },
    buttonItem:{
        flex:3,
        alignItems: 'center',
        width:ScreenWidth/4
    },
    buttonStyle:{
        alignItems:'center',
        borderRadius:5,
        
    },


    container:{
        flex: 1,
        
    },
   
    back:{
        fontSize:20
    },
    upNavi:{

    },
    title:{
        top:0,
        flex: 1,
        height: 20,
        flex: 1,
        borderRadius:5,
    },
    content:{
        alignItems:'center',
        flex: 7.5
    },
    
});