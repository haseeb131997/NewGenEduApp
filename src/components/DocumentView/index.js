
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { UiColor } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height




class DocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }

  getIcon(fileType) {
    switch (fileType) {
      case 'doc':
        return require('../../asssets/icons/doc.png')
        break;
      case 'docx':
        return require('../../asssets/icons/doc.png')
        break;
      case 'docx':
        return require('../../asssets/icons/doc.png')
        break;
      case 'txt':
        return require('../../asssets/icons/txt.png')
        break;
      case 'ppt':
        return require('../../asssets/icons/ppt.png')
        break;
      case 'pptx':
        return require('../../asssets/icons/ppt.png')
        break;
      case 'xls':
        return require('../../asssets/icons/xls.png')
        break;
      case 'xlsx':
        return require('../../asssets/icons/xls.png')
        break;
      case 'pdf':
        return require('../../asssets/icons/pdf.png')
        break;
      case 'png':
        return require('../../asssets/icons/png.png')
        break;
      case 'jpg':
        return require('../../asssets/icons/jpg.png')
        break;
      case 'jpeg':
        return require('../../asssets/icons/jpg.png')
        break;
      case 'mp4':
        return require('../../asssets/icons/mp4.png')
        break;
      default:
        return require('../../asssets/icons/doc.png')
        break;
    }
  }




  render() {
    const { stateObject, fileName, fileType, value, openDocument } = this.props
    return (<View>
      {(value != '' && (fileType == 'doc' || fileType == 'docx' || fileType == 'txt' || fileType == 'ppt' || fileType == 'pptx' || fileType == 'xls' || fileType == 'xlsx')) &&
        <View style={[styles.container, AppStyles.marginTop_2, AppStyles.flex_one]}>
          <Image
            resizeMode='contain'
            source={this.getIcon(fileType)}
            style={styles.imgIcon}
          />
          <View style={[AppStyles.row_space_between, { width: '100%', flex: 1 }, AppStyles.marginHorizontal_1]}>
            <Subheading>{fileName}</Subheading>
            <Ionicons
              onPress={openDocument}
              name="eye"
              size={styles.eyeIcon.height}
              color={UiColor.LIGHT_TEXT_COLOR}
              style={AppStyles.addIconStyle}
            />
          </View>
        </View>}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: UiColor.LIGHT_TEXT_COLOR, borderRadius: 5, paddingHorizontal: w('1%')
  },
  imgIcon: {
    width: w('10%'), height: h('10%')
  },
  eyeIcon: {
    height: h('3%')
  }


})

export default DocumentView
