import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import HomeScreen from './pages/HomePage';
import MineScreen from './pages/MinePage';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
    const Tab = TabNavigator(
      {
        Home:{
          screen:HomeScreen,
          navigationOptions:({navigation}) => ({
            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor}) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./imgs/nav_fav@2x.png')}
                selectedImage={require('./imgs/nav_fav_actived@3x.png')}
              />
            )
          }),
        },

        Mine:{
              screen:MineScreen,
              navigationOptions:({navigation}) => ({
              tabBarLabel:'我',
              tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                 tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./imgs/tab_me_nor@3x.png')}
                  selectedImage={require('./imgs/tab_me_selected@2x.png')}
                />
              )
            }),
          },
        },

        {
          tabBarComponent:TabBarBottom,
          tabBarPosition:'bottom',
          swipeEnabled:false,
          animationEnabled:false,
          lazy:true,
          tabBarOptions:{
            activeTintColor:'#06c1ae',
            inactiveTintColor:'#979797',
            style:{backgroundColor:'#ffffff',},
            labelStyle: {
                  fontSize: 20, // 文字大小
              },
          }

        }

      );

      //modal 放登录，navigater用按钮传值