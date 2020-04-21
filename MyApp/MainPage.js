import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'首页'
        }
    }
    //渲染
    renderScene(route, navigator) {
        //导航条跳转传递参数 params 为传递的参数 其他页面传值时的名字要和这里设置的一样
        return <route.component {...route.params} navigator={navigator}/>

        //没有参数
        // return <route.component navigator={navigator} />
    }
    creatNavigator (component){
        return (
            <Navigator
                initialRoute={{ name: component, component: component }}//默认加载的页面
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                style={{flex:1}}
                navigationBar={
                    <Navigator.NavigationBar style={HomePageNavStyle.navStyleBase}
                    routeMapper={NavigationBarRouteMapper}/>
                }
            />
        )
    }

    CreatTabNavigatorItem (showtitle ,index ,normalImage , selectImage){
        let subview = {}
        switch (index){
            case 1:
                subview=this.creatNavigator(FirstPage);
                break;
            case 2:
                subview=this.creatNavigator(SecondPage);
                break;
            case 3:
                subview=this.creatNavigator(ThirdPage);
                break;
            case 4:
                subview=this.creatNavigator(FourPage);
                break;
            }
        return(
            <TabNavigator.Item
            title={showtitle}
            onPress={()=>{this.setState({selectedTab:showtitle})}}
            selected={this.state.selectedTab === showtitle}
            titleStyle={HomePageNavStyle.TBarTitleStyle}
            selectedTitleStyle={HomePageNavStyle.TBarTitleSelectStyle}
            renderIcon={() => {return <Image source={normalImage}/> }}
            renderSelectedIcon={() => { return <Image source={selectImage}/> }}
            /* * 另一种写法，如果又返回值，可以直接省去{return }
            * renderIcon={() => <Image source={normalImage} />}
            * renderSelectedIcon={() => <Image source={selectImage} />}
            *
            */

            >
                {subview}
            </TabNavigator.Item>
        );
    }
    CreatTabBarView () {
    return(
        <TabNavigator>
        {this.CreatTabNavigatorItem('首页',1 , require('./appImages/homepage@2x.png') ,require('./appImages/homepage_select@2x.png'))}
        {this.CreatTabNavigatorItem('消息',2 , require('./appImages/message@2x.png'), require('./appImages/message_select@2x.png'))}
        {this.CreatTabNavigatorItem('朋友',3 , require('./appImages/friend@2x.png'), require('./appImages/friend_select@2x.png'))}
        {this.CreatTabNavigatorItem('我的',4 , require('./appImages/mine@2x.png'),require('./appImages/mine_select@2x.png') )}
        </TabNavigator>
        );
    }




    render() {
        return (
            <View style={HomePageNavStyle.viewStyle}>
                {this.CreatTabBarView()}
                <StatusBar barStyle={'light-content' }/>
            </View>

    )
    }
}
let getNavigatorTitle = (route) => {
    let NavigatorTitle;
    switch (route.component.name){
    case 'FirstPage':
        NavigatorTitle = '首页'
        break;
    case 'SecondPage':
        NavigatorTitle = '消息'
        break;
    case 'ThirdPage':
        NavigatorTitle = '朋友'
        break;
    case 'FourPage':
        NavigatorTitle = '我的'
        break;
    }
    return (
        <View>
            <Text style={HomePageNavStyle.navTitleStyle}>
                {NavigatorTitle}
            </Text>
        </View>
    );
}

    var NavigationBarRouteMapper = {
        // 标题
        Title(route, navigator, index, navState) {
            return ( getNavigatorTitle(route) );
        },
        // 左键
        LeftButton(route, navigator, index, navState) {
            if (index > 0) {
                return (
                    <View>
                        <TouchableOpacity
                            underlayColor='transparent'
                            onPress={() => {
                            if (index > 0) {
                                navigator.pop()
                            } }}>
                            <Text style={HomePageNavStyle.navLeftButtonStyle}>
                                返回
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return null;
            }
        },
        RightButton(route, navigator, index, navState) {
            if (route.onPress)
                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => route.onPress()}
                        >
                            <Text style={HomePageNavStyle.navRightButtonStyle}>
                                right
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
        },
    };




/*
const TabRouteConfigs = {
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_homepage_2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected_2x.png')}
                />
            ),
        }),
    },
    NearBy: {
        screen: NearByScreen,
        navigationOptions: {
            tabBarLabel: '附近',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_merchant_2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected_2x.png')}
                />
            ),
        },
    }
    ,
    Mine: {
        screen: MineScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_mine_2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected_2x.png')}
                />
            ),
        },
    }
};
const TabNavigatorConfigs = {
    initialRouteName: 'Home',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
};
const Tab = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

*/
const HomePageNavStyle = StyleSheet.create({
    viewStyle:{
        flex:1,
    },
    TBarTitleStyle:{
        color:'black',
    },
    TBarTitleSelectStyle:{
        color:'red',
    },
    textStyleBase:{
        marginTop:40,
        marginHorizontal:20,
        color:'red',
        textAlign:'center',
    },
    navStyleBase:{
        backgroundColor:'blue',
    },
    navTitleStyle:{
        color:'white',
        textAlign:'center',
        flex:1,
        fontSize:18,
        fontWeight:'bold',
        marginVertical:5,
    },
    navLeftButtonStyle:{
        color:'white',
        marginLeft:10,
        fontSize:15,
        marginTop:5,
    },
    navRightButtonStyle:{
        color:'black',
        marginRight:10,
        fontSize:15,
    },
});