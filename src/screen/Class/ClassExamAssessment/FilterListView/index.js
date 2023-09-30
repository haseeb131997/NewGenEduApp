
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import { ListItem } from 'react-native-elements';



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }




  render() {
    const { stateObject } = this.props;
    var showResults = []
    showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={index}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  // menuTitle={['View', 'Edit', 'Delete', 'Approve/Reject']}

                  />
                </View>
              </View>
              <Card.Content>
                {/* <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
              <Title style={[AppStyles.titleColor]}>{rowData.class}</Title>
                  <Caption style={[AppStyles.width85,AppStyles.textAlign_center]}>{rowData.classDesc}</Caption>
                </View> */}
                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.examDescription}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>{'Exam'}</Caption>
                </View>

                <View style={[AppStyles.row_space_between, AppStyles.width85, AppStyles.alignSelf, AppStyles.marginTop_2]}>
                  {/* <View style={[AppStyles.width48,AppStyles.alignItems]}>
                  <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.examDescription}</Subheading>
                  <Caption >{'Exam'}</Caption>
                    </View> */}
                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.class}</Subheading>
                    <Caption style={[AppStyles.textAlign_center,AppStyles.textColor]}>{rowData.classDesc}</Caption>
                  </View>

                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, rowData.subjectID)}</Subheading>
                    <Caption style={[AppStyles.textAlign_center,AppStyles.textColor]}>{'Subject'}</Caption>
                  </View>
                </View>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.succusImgColor]}
                    source={require('./../../../../asssets/icons/exam.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Top Mark</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.topMark}</Text>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.voiletImgColor]}
                    source={require('./../../../../asssets/icons/exam.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Average Mark</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.averageMark}</Text>
                  </View>
                </ListItem>



                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/exam.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Low Mark</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.lowMark}</Text>
                  </View>
                </ListItem>


               {(rowData.gradeDetails != undefined && rowData.gradeDetails.length != 0) &&<View>
               <View style={AppStyles.alignItems}>
                  <Text style={AppStyles.titleColor}>Grade Details</Text>
                </View>
                <Card.Content>
                  {rowData.gradeDetails.map((itemData, index1) => (
                    <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                      <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                        <View style={AppStyles.width85}>
                          <Text style={AppStyles.textColor}>{`No. of student with grade ${itemData.grade}`}</Text>
                        </View>
                        {<View style={AppStyles.qeueCountContainer}>
                          <Text style={AppStyles.countStyle}>{itemData.studentCount}</Text>
                        </View>}
                      </View>
                    </View>))
                  }
                </Card.Content>
               </View>}


               




              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaierWidth: {
    width: '48%'
  },
  menuContainer: {
    top: h('1%'),
    right: h('2%')

  },
  titleColor: {
    color: UiColor.SKYBLUE,
    fontWeight: '500'
  },
  instructionStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  }
})



