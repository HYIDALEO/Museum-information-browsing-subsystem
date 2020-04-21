import React, { Component } from 'react';

import {
    Image,
    TextInput,
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

//export 因为要在其他类中使用
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class Information extends Component{
        constructor(props){
              super(props);
              this.state = {text: ''};
          }
    render(){
        const { navigate } = this.props.navigation;
        const last = this.props.navigation.state.params.page;
        return (

           <View style={styles.container}>


           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    pic:{

    },
    min_information:{

    },
    text_introduction:{

    },
});