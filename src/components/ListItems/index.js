
import React, { Component } from 'react';
import {  View,  } from 'react-native';
//import { h, w } from '../../utils/Dimensions';
//import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import GeneralUtils from "../../utils/GeneralUtils";
import { Subheading,Text} from 'react-native-paper';



export default class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  


  render() {
    const { itemHeadings, itemColumns,itemArray } = this.props;
    return (
      <View>
        {itemArray.map((rowData, index) => (
          <View key={index.toString()} style={[AppStyles.eventContainer,{borderLeftColor: GeneralUtils.functions._getRandomColor(index)}]}>
          { /* <View style={[AppStyles.row_space_between, AppStyles.alignItems]}> */}
              
                
                {itemHeadings.map((headings,headingIndex)=> (  
                <View key={headingIndex.toString()} > 
                   {rowData[itemColumns[headingIndex]] !='' && 
                <View  style={AppStyles.width85}>
                  
                <Subheading>{rowData[itemColumns[headingIndex]]}</Subheading>
                <Text style={AppStyles.attrNameStyle}>{headings}</Text>

                </View> }
                </View> 
               ))
                }
              
           {/* </View> */}
           </View>))
        }
      </View>
    )
  }
}


