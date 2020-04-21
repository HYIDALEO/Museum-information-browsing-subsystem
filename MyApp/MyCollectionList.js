

import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 ScrollView,
 Image
} from 'react-native';


var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class MyCollectionList extends Component {

   render() {
     var NameData = this.props.theNameList;
     var commentData = this.props.theCommentList;
     var list = [];
     for(var i in commentData){
       var item = (
         <View key={i} style={[styles.backdrop, styles.list_item]}>
            <View style={[styles.row, styles.list_item_text]}>
               <Text style={styles.list_item_desc}>
                 {NameData[i]}
               </Text>
               <Text style={styles.list_item_comment}>
                 {commentData[i]}
               </Text>
           </View>
                     <Image

                         style={{height:200}}
                         source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523857680540&di=6ca5446544c128e35aa174bba30b49af&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2430433098%2C1633799192%26fm%3D214%26gp%3D0.jpg'}}
                         />
         </View>
       );
       list.push(item);
     }
     return (
     <ScrollView style={styles.flex1}>
         {list}
     </ScrollView>
     );
   }
 }

//       <View style={styles.flex,{marginTop:35}}>
//         <List goods={Goods}></List>
//       </View>


 const styles = StyleSheet.create({
  flex1: {
     flex:1
  },
  row:{
    flexDirection: 'row',
  },
  list_item:{
    height: 300
  },
  list_item_text:{
    height: 100
  },
  list_item_desc:{
    flex:1,
    fontSize:15
  },
  list_item_comment:{
    flex:4,
    fontSize:10
  },
    backdrop:{
        flex:1,
        flexDirection:'column',
        marginBottom: 10,
    },
 });
