
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView,Image,TouchableOpacity } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Title, Caption, Card,Text,Divider } from 'react-native-paper';
import SubScreenUtils from "../../utils/SubScreenUtils";
import CustomTabScreen from '../../components/CustomTabScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButtons from '../../components/CustomButtons';





export default class InstituteScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.openAuditDetail = this.openAuditDetail.bind(this)
  }


  openAuditDetail (){
    const { stateObject} = this.props
    stateObject.parentStateChange({
      auditModalVisible : true
    })

  }


  openToottipHelp(){
    const {stateObject} = this.props;
    // ScreenContents.functions.showTooltipModal = true
    stateObject.parentStateChange({
      showTooltipModal:true
    })
  }
  
  onClickSaveChanges(){
    const {stateObject,screenType} = this.props;
    if(screenType =='others'){
      stateObject.onOtherSubmit()
    }
    else if(screenType =='logo'){
      stateObject.onImageSubmit()
    }
  }

  


  render() {
    const {title,breadcrumb,intialFetching,stateObject,screenType} = this.props;
    console.log(screenType)
    return (
      <View>
       <View style={AppStyles.row_space_between}>
       {/* <Title>{title}</Title> */}
       <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems,AppStyles.flex_one,]}>
       <Title>{title}</Title>
       <View style={AppStyles.marginLeft_1}>
       <AntDesign  onPress={()=> this.openToottipHelp()}  name="questioncircle" size={styles.tooltipIcn.height} color={UiColor.VOILET_COLOR} />
       </View>
       </View>
      
       {(screenType =='others' || screenType == 'logo') && <CustomButtons
          onPress={() => this.onClickSaveChanges()}
          title="Save changes"
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
    
        />}
        </View>
       
       {/* <TouchableOpacity onPress={()=> this.openAuditDetail()}>
       <Image
        resizeMode='contain'
        style={AppStyles.auditIconStyle}
        source={require('../../asssets/icons/audit.png')}
        />
       </TouchableOpacity> */}
           
        <Caption>{breadcrumb}</Caption>
          {/* <CustomTabScreen
            tabHeading={['Subject', 'Fee Type']}
            otherTabHeading={['Institute logo', 'Other Configurations']}
            stateObject={stateObject}
            stateValue={'selectedTabIndex'}
            selectedStateValue={stateObject.state.selectedTabIndex}
            barColor={UiColor.APP_BACKGROUND}
          />
             <Divider /> */}
        {intialFetching && <Card>
          <Card.Content>
           <View style={[styles.dashContainer]}>
           <Title>We need your attention!</Title>
           <Text style={styles.textStyle}>Data fetching is in progress , please wait!</Text>
           </View>
          </Card.Content>
        </Card>}

      </View>
    )
  }
}


const styles = StyleSheet.create({
  dashContainer:{
    borderWidth:1,
    padding:h('2%'),
    borderRadius:5,
    borderStyle:'dashed',
    backgroundColor:UiColor.LIGHT_ORANGE_COLOR,
    borderColor:UiColor.ORANGE_COLOR
  },
  textStyle:{
    color:UiColor.DRAK_GRAY_COLOR,
    
  },
  tooltipIcn:{
    height:h('2.5%')
  },
 
 
 
  
  })