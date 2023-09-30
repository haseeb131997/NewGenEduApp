/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/


import React, { Component } from "react";
import { View, StyleSheet,} from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";





class UserProfileFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1,]}>
        <FilterSuggestionTextInput
          required={false}
          editable={editable}
          label={'User Name'}
          placeholder={'Select user name'}
          secureTextEntry={false}
          value={summaryDataModel.filter.userName}
          onFocus={() => {
            SearchUtils.functions.launchSuggestion(stateObject, '', 'userName')
          }
          }
          onClear={() => {
            summaryDataModel.filter.userName = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

        {/*<FilterSuggestionTextInput
          required={false}
          editable={editable}
          label={'User Id'}
          placeholder={'Select user Id'}
          secureTextEntry={false}
          value={summaryDataModel.filter.userID}
          onFocus={() => {
            SearchUtils.functions.launchSuggestion(stateObject, '', 'userID')
          }
          }
          onClear={() => {
            summaryDataModel.filter.userID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />*/}

        <View>
          <CustomDropDownPicker
            stateObject={stateObject}
            label={'User Types'}
            items={SelectListUtils.functions.selectMaster.UserTypeMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.UserTypeMaster, summaryDataModel.filter.userType)}
            placeholder="Select user type"
            onChangeValue={(value) => {
              summaryDataModel.filter.userType = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'userTypeDropdown'} 
          subHeadingRecordName = "an user type"
          onClear={() => {
          summaryDataModel.filter.userType = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
          />
        </View>

        <View>
          <CustomDropDownPicker
            stateObject={stateObject}
            label={'Select Approval status'}
            items={SelectListUtils.functions.selectMaster.AuthStatusMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AuthStatusMaster, summaryDataModel.filter.authStat)}
            placeholder="Select Approval status"
            onChangeValue={(value) => {
              summaryDataModel.filter.authStat = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'authDropdown'} 
          subHeadingRecordName = "an approval status"
          onClear={() => {
          summaryDataModel.filter.authStat = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
          />
        </View>


        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'users'}
          colHeading={['Name', 'Id']}
          mapping={['userName', 'userID']}
          SuggestionHeading={'User name'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000
  }
})
export default UserProfileFilter;

