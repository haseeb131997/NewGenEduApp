
import React, { Component } from "react";
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Card, Text, Divider, Title, Subheading, Caption } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import { UiColor } from "../../../../theme";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SearchUtils from "../../../../utils/SearchUtils";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import CustomCarousel from '../../../../components/CustomCarousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';









class UserProfileParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }

  }
  _studentDetailItem = ({ item, index }) => {
    const {
      stateObject,
    } = this.props

    const { editable } = stateObject.state

    return (
      <View key={index.toString()} style={[AppStyles.marginTop_3, AppStyles.marginLeft_1, AppStyles.marginRight_2]}  >
        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Student Name'}
            secureTextEntry={false}
            value={item.studentName}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Student ID'}
            secureTextEntry={false}
            value={item.studentID}
            editable={editable}
          />
        </View>

        <View style={AppStyles.marginTop_3}>
          <InputText
            label={'Institute Name'}
            secureTextEntry={false}
            value={item.instituteName}
            editable={editable}
          />
        </View>





      </View>
    );
  }




  render() {
    const {
      stateObject,
    } = this.props

    const { dataModel, editable } = stateObject.state




    return dataModel.parentRoleMapping.length != 0 && (
      <View >
        <Title>Students Info</Title>
        <Divider style={AppStyles.marginTop_1} />
        {/* <MaterialCommunityIcons name={"message-reply-text"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} /> */}


          {dataModel.parentRoleMapping.map((item, index) => (
        <View key={index.toString()} style={[AppStyles.flexDirectionRow,AppStyles.marginTop_3]}>
          <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.marginTop_2]}
            source={require('./../../../../asssets/icons/com003.png')}
          />
          <View style={[AppStyles.marginLeft_2, AppStyles.flex_one]}>
            <Subheading>{item.studentName}</Subheading>
            <Caption style={AppStyles.textColor}>{item.studentID}</Caption>
            <View style={[AppStyles.dashContainer, AppStyles.marginTop_1]}>
              <Caption style={AppStyles.textColor}>Institute Name</Caption>
              <Subheading>{item.instituteName}</Subheading>
            </View>

            <View style={[AppStyles.dashContainer, AppStyles.marginTop_1]}>
            <Caption style={AppStyles.textColor}>Institute ID</Caption>
              <Subheading>{item.instituteID}</Subheading>
            </View>
          </View>

        </View>
    ))}
 
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default UserProfileParent;

