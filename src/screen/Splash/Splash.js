
import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { w, h } from "../../utils/Dimensions";
import { Portal, Provider } from 'react-native-paper';
import { UiColor } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";



class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  // -------- on Load--------

  UNSAFE_componentWillMount() {
    try {
      setTimeout(() => {
         this.props.navigation.navigate('Login')
      }, 1500);
    } catch (error) {
      //console.log("error" + error);
    }
  }


  render() {
    const { visible } = this.state
    return (
      <View style={AppStyles.splashMainContainer}>
      <View style={AppStyles.splashContainer}> 
      <View>
      <Image
        resizeMode='contain'
        style={AppStyles.splashLogo}
        source={require('./../../asssets/logo04.png')}/>
      </View>
    
       <View>
       <Image
        resizeMode='contain'
        style={AppStyles.illustrationImg}
        source={require('./../../asssets/image/clip-1387.png')}/>
       </View>
      </View>
      </View>

    );
  }
}
export default Splash;
