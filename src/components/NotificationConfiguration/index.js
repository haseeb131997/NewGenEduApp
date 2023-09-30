
import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import { Text, Divider,Title,Subheading } from 'react-native-paper';
import AppStyles from "../../AppStyles/AppStyles";
import CustomCheckBox from '../CustomCheckBox';











class NotificationConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentInd: null
    }

  }









  render() {
    //  var currentInd = 0
    const { stateObject } = this.props
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={{}}>
        <Subheading style={AppStyles.bold_600}>Notification Details</Subheading>
        
        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'SMS Notification Required'}
            onPress={() => {
              dataModel.smsNotification = !dataModel.smsNotification;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.smsNotification ? true : false}
            disabled={editable}
          />
        </View>

        <View style={AppStyles.marginTop_2}>
          <CustomCheckBox
            label={'E-mail Notification Required'}
            onPress={() => {
              dataModel.emailNotification = !dataModel.emailNotification;
              parentStateChange({ dataModel: dataModel })
            }}
            checked={dataModel.emailNotification ? true : false}
            disabled={editable}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default NotificationConfiguration;

