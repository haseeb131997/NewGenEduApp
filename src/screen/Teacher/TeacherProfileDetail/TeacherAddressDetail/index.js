
import React, { Component } from "react";
import { View, StyleSheet} from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';





class TeacherAddressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    const { stateObject } = this.props
    const { dataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={AppStyles.margin_1}>



<View style={AppStyles.marginTop_2}>
          <InputText
            label={'Adress Line 1'}
            secureTextEntry={false}
            value={dataModel.general.address.addressLine1}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Adress Line 2'}
            secureTextEntry={false}
            value={dataModel.general.address.addressLine2}
            editable={editable}
          />
        </View>
        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Adress Line 3'}
            secureTextEntry={false}
            value={dataModel.general.address.addressLine3}
            editable={editable}
          />
        </View>
        <View style={AppStyles.marginTop_3}>
          <InputText
             label={'Adress Line 4'}
            secureTextEntry={false}
            value={dataModel.general.address.addressLine4}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Adress Line 5'}
            secureTextEntry={false}
            value={dataModel.general.address.addressline5}
            editable={editable}
          />
        </View>
       

      </View>
    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherAddressDetail;

