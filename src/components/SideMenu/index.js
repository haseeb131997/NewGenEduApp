
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AppStyles from "../../AppStyles/AppStyles";
import { Menu } from 'react-native-paper';
import NewOperation from "../../utils/NewOperation";
import SubScreenUtils from "../../utils/SubScreenUtils";
import GeneralUtils from "../../utils/GeneralUtils";
import apiCall from "../../ApiCall/ActionApi";




export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  openMenu = () => this.setState({ visible: true });

  closeMenu = () => this.setState({ visible: false });


  hideMenu = async (item, selectedIndex) => {
    const { stateObject, stateValue, viewDetail, summaryResultIndex } = this.props
    const { parentStateChange } = stateObject
    console.log('inside result menu cick->',item)
      switch (item) {
      case 'Assess':
        stateObject.state.dataModel.assignmentID = viewDetail.assignmentID
        stateObject.state.dataModel.classID = viewDetail.classID
        stateObject.state.dataModel.type = viewDetail.type
        stateObject.setState({
          viewDetail: viewDetail,
          currentOperation: 'Create-Default',
          selectedTabIndex: 0
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
      case 'View':

        if(stateObject.state.serviceName == 'InstituteOtherActivity'){
          viewDetail.type = 'View'
        }
        stateObject.setState({
          viewDetail: viewDetail,
          type:'View',
          currentOperation: 'Query',
          selectedTabIndex: 0
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
      case 'Edit':
        // parentStateChange({currentOperation: 'Modification' })
        GeneralUtils.functions.uploadEventImage = false
        GeneralUtils.functions.showCompletion = false

        if(stateObject.state.serviceName == 'InstituteOtherActivity'){
          viewDetail.type = 'Edit'
        }
        stateObject.setState({
          viewDetail: viewDetail,
          type:'Edit',
          currentOperation: 'ModificationStep1',
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
      case 'Delete':
        if (stateObject.state.serviceName != 'TeacherLessonPlannerService') {
          if(stateObject.state.serviceName == 'InstituteOtherActivity'){
            viewDetail.type = ''
          }
          stateObject.setState({
            // auditDataModel:stateObject.state.auditDataModel,
            viewDetail: viewDetail,
            type:'',
            summaryResultIndex: summaryResultIndex,
            currentOperation: 'Deletion',
            // isLoading:true
          }, () => {
            // NewOperation.functions.delete(stateObject)
            SubScreenUtils.functions.deleteCall(stateObject)
          })
        }
        else {
          stateObject.setState({
            // auditDataModel:stateObject.state.auditDataModel,
            viewDetail: viewDetail,
            summaryResultIndex: summaryResultIndex,
            currentOperation: 'Deletion',
            // isLoading:true
          }, () => {
            SubScreenUtils.functions.deleteCall(stateObject)
          })
        }


        break;
        case 'Cancel':
          stateObject.setState({
            // auditDataModel:stateObject.state.auditDataModel,
            viewDetail: viewDetail,
            summaryResultIndex: summaryResultIndex,
            currentOperation: 'Deletion',
            // isLoading:true
          }, () => {
            // NewOperation.functions.delete(stateObject)
            SubScreenUtils.functions.deleteCall(stateObject)
          })
      
        break;
        
      case 'Approve/Reject':
        // parentStateChange({ 
        //   currentOperation: 'Authorisation',
        //   selectedTabIndex: 0
        // })
        stateObject.setState({
          viewDetail: viewDetail,
          currentOperation: 'AuthorisationStep1',
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
      case 'Shortlist participants':
        GeneralUtils.functions.uploadEventImage = false

        if(stateObject.state.serviceName == 'InstituteOtherActivity'){
          viewDetail.type = 'Shortlist'
        }

        stateObject.setState({
          type:'Shortlist',
          viewDetail: viewDetail,
          currentOperation: 'ModificationStep1',
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
      case 'Result declaration':
        GeneralUtils.functions.uploadEventImage = false
        if(stateObject.state.serviceName == 'InstituteOtherActivity'){
          viewDetail.type = 'Result'
        }
        console.log('inside result menu cick')
        stateObject.setState({
          viewDetail: viewDetail,
          type:'Result',
          currentOperation: 'ModificationStep1',
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break;
        case 'Enroll Students':
          // parentStateChange({currentOperation: 'Modification' })
          GeneralUtils.functions.uploadEventImage = false
    
  
          if(stateObject.state.serviceName == 'InstituteOtherActivity'){
            viewDetail.type = 'Enroll'
          }
  
          stateObject.setState({
            viewDetail: viewDetail,
            type:'Enroll',
            currentOperation: 'ModificationStep1',
          }, () => {
            NewOperation.functions.screenEventHandler(stateObject)
          })
          break;
          case 'Event Gallery':
            // parentStateChange({currentOperation: 'Modification' })
            GeneralUtils.functions.uploadEventImage = true
  
    
            if(stateObject.state.serviceName == 'InstituteOtherActivity'){
              viewDetail.type = 'Edit'
            }
    
            stateObject.setState({
              viewDetail: viewDetail,
              type:'Edit',
              currentOperation: 'ModificationStep1',
            }, () => {
              NewOperation.functions.screenEventHandler(stateObject)
            })
            break;
        case 'Copy':
          stateObject.setState({
            viewDetail: viewDetail,
            currentOperation: 'Query',
            selectedTabIndex: 0
          }, async () => {
         await  NewOperation.functions.screenEventHandler(stateObject)
         if(!apiCall.functions.apiError){
           for (let value of stateObject.state.primaryKeyCols) {
            stateObject.state.dataModel[value] = "";
          }
          SubScreenUtils.functions.copyAction = true
          SubScreenUtils.functions.createNew(stateObject)
         }
       
          })
          break; 
      case 'Mark Completion':
        // parentStateChange({currentOperation: 'Modification' })
        GeneralUtils.functions.showCompletion = true
        stateObject.setState({
          viewDetail: viewDetail,
          currentOperation: 'ModificationStep1',
        }, () => {
          NewOperation.functions.screenEventHandler(stateObject)
        })
        break; 

      default:
        break;
    }

    this.setState({
      visible: false
    })
  };


  render() {
    const { menuTitle } = this.props;
    return (
      <Menu
        visible={this.state.visible}
        onDismiss={this.closeMenu}
        anchor={<TouchableOpacity onPress={() => this.openMenu()}><Image resizeMode='contain' style={AppStyles.activeMoreIcon}
          source={require('./../../asssets/icons/gen024.png')}
        /></TouchableOpacity>}>
        {menuTitle.map((item, index) => (
          <View key={index.toString()}>
            <Menu.Item onPress={() => this.hideMenu(item, index)} title={item} />
            {/* {otherTabHeading.length > 1 && <Divider />} */}
          </View>
        ))
        }

      </Menu>

    )
  }
}


