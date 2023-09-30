
import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, PixelRatio,Keyboard } from 'react-native';
import { TextInput,} from 'react-native-paper';
import InputTextArea from '../../../../components/InputTextArea';
import AppStyles from "../../../../AppStyles/AppStyles";
import LabelText from '../../../../components/LabelText';








class ClassAssignmentInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }





  render() {
    const {
      stateObject,
      label
    } = this.props
    const { dataModel,editable,} = stateObject.state

    const { parentStateChange } = stateObject

  
    return (
      <View >
      {stateObject.state.currentOperation =='Create' || stateObject.state.currentOperation =='Modification' ? <InputTextArea
          editable ={!editable}
          label={stateObject.state.dataModel.type == 'W' ? 'Instructions for Worksheets' : 'Instructions for Questions'}
          secureTextEntry={false}
          value={dataModel.instructions}
          placeholder={'Teacher can enter instruction to student about Question/Worksheet'}
          onChangeText={text => {
            dataModel.instructions = text;
            parentStateChange({ dataModel: dataModel })
          }}

        /> :  <View>
        <LabelText
          label={stateObject.state.dataModel.type == 'W' ? 'Instructions for Worksheets' : 'Instructions for Questions'}
          value={dataModel.instructions}
        />
      </View>}
      </View>
    );
  }
}


const styles = StyleSheet.create({


})
export default ClassAssignmentInstructions;

