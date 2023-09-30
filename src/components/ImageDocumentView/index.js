
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { UiColor } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";
import { httpUtils } from '../../utils/HttpUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height




class ImageDocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }

  getIcon(fileType) {
    switch (fileType) {
      case 'png':
        return require('../../asssets/icons/png.png')
        break;
        case 'PNG':
          return require('../../asssets/icons/png.png')
          break;
      case 'jpg':
        return require('../../asssets/icons/jpg.png')
        break;
        case 'jpeg':
          return require('../../asssets/icons/jpg.png')
          break;
      default:
        return require('../../asssets/icons/doc.png')
        break;
    }
  }



 getImagePath  () {
  const { stateObject, fileName, fileType, value ,} = this.props

  const {  nekot,
    ivas,
    uhtuliak } = stateObject.state

console.log(value,"value jj kdksklj lkdjsl")
 
if(typeof value == 'string' && value.includes('CohesiveUpload')){
  return {uri:`${httpUtils.FILE_URL()}${value}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`}
}
else if(typeof value == 'string' && value.includes('objectstorage')){
  return {uri : value}
}
else{
  return  httpUtils.DEFAULT_IMAGE_FILE_PATH()
}
}




  render() {
    const { stateObject, fileName, fileType, value,openDocument } = this.props
    return value != '' && (fileType == 'png' || fileType == 'PNG' || fileType == 'jpg' ||  fileType == 'JPG' || fileType == 'jpeg' || fileType == 'JPEG' ) ? (<View style={[AppStyles.marginTop_2,AppStyles.alignItems]}> 
     <View>


{console.log(this.getImagePath(),"this.getImagePath()")}

     <Image
          resizeMode='contain'
          source={this.getImagePath()}
          style={{width:w('50%'),height:h('25%')}}
        />
     </View>


     <View style={styles.textConationer}>
          <Image
          resizeMode='contain'
          source={this.getIcon(fileType)}
          style={styles.iconImg}
          />
          <Subheading style={AppStyles.marginLeft_1}>{fileName}</Subheading>
          <Ionicons
                onPress={openDocument}
                name="eye"
                size={h('3%')}
                color={UiColor.LIGHT_TEXT_COLOR}
                style={AppStyles.addIconStyle}
              />
        </View>
    </View>
    ): null;
  }
}

const styles = StyleSheet.create({
  textConationer:{
    width: w('50%'),flexDirection:'row',alignItems:'center'

  },
  iconImg:{
    width:w('5%'),height:h('5%'),marginLeft:w('2%')
  }



})

export default ImageDocumentView
