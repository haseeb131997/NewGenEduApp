
import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/Ionicons'
import RNRestart from 'react-native-restart'
// some stylesheet
import styles from "./styles";
// some button component
import Buttons from '../../components/Buttons';

export class ErrorBoundary extends React.Component {

  state = {
    error: false
  }

  static getDerivedStateFromError(error) {
    //console.log('getDerive')
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    // deal with errorInfo if needed
  }

  destroyAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('GLOBAL')
      await AsyncStorage.removeItem('Rst')
      // await AsyncStorage.getAllKeys()
      // .then(keys => AsyncStorage.multiRemove(keys))
      await AsyncStorage.getAllKeys()
        .then(keys => {
          //console.log(keys, "keys")
          for (let item of keys) {
            if (item != 'DashboardModel') {
              AsyncStorage.removeItem(item)
            }
          }
        }
        )
    }
    catch (err) {
    }
  }

  handleBackToSignIn = async () => {
    // remove user settings
    await this.destroyAuthToken();
    // restart app
    RNRestart.Restart();
  }

  render() {

    const { theme } = this.context;

    if (this.state.error) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.margin}>
            <Text style={styles.width}>
              <FontAwesome
                name='ios-information-circle-outline'
                size={60}
              // color={theme.priText}
              />
            </Text>
            <Text style={styles.titleText}>Oops, Something Went Wrong</Text>
            <Text style={styles.textStyle}>
              The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in. Please contact support@newgeneducationapp.com if this issue persists.
            </Text>
            <Buttons
              color={"#2C87D7"}
              mode="contained"
              label={'Back to Sign In Screen'}
              onPress={this.handleBackToSignIn}
            // contentStyle={styles.contentStyle}
            />
          </View>
        </SafeAreaView>
      )
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;