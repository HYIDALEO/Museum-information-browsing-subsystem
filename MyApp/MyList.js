import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 ScrollView,
} from 'react-native';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class MyList extends Component {

   render() {
     var userData = this.props.theUserList;
     var commentData = this.props.theCommentList;
     var list = [];
     for(var i in commentData){
       var item = (
         <View key={i} style={[styles.row, styles.list_item]}>
           <Text style={styles.list_item_desc}>
             {userData[i]}
           </Text>
           <Text style={styles.list_item_comment}>
             {commentData[i]}
           </Text>
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
    marginBottom: 10,
  },
  list_item:{
    height: 50
  },
  list_item_desc:{
    flex:1,
    fontSize:15
  },
  list_item_comment:{
    flex:4,
    fontSize:10
  },
 });
