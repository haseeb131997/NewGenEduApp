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

/* * * Change Tag: NEAI2-61
 Change Desc: Mobile :- Add new feature "Teacher Notes".
 Changed By : Shashank
 Date:18-06-2021
 */

/* * * Change Tag: NEAI2-67
Change Desc: Mobile :- Add new feature "Class Assignment".
Changed By : Shashank
Date:18-06-2021
*/

/* * * Change Tag: NEAI2-249
Change Desc: Mobile :- Oracle Object Storage Upload changes.
Changed By : Shashank
Date:04-07-2021
*/

/* * * Change Tag: NEAI2-302
Change Desc: Mobile :- If upload more than 500MB error. App automatically logout
Changed By : Shashank
Date:01-09-2021
*/

/* * * Change Tag:3.0 UI/UX
Change Desc:  Mobile :-  change 
Changed By : Shashank
Date:10-10-2021 
*/

// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Exception from '../utils/Exception'
import { httpUtils } from '../utils/HttpUtils';
import apiCall from "../ApiCall/ActionApi";
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');

var Buffer = require('buffer/').Buffer

// videoFile

class Upload { }

// starts NEAI2-249
var STORAGE_CONFIG = {
  "studentPhoto": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "familyMember": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "teacherPhoto": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "familyprofileImg": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "ducuentFile": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "questionImg": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "institutePhoto": {
    "storage": "server_storage",
    "cloudVendor": "Oracle"
  },
  // "institutePhoto": {
  //   "storage": "object_storage",
  //   "cloudVendor": "Oracle"
  // },
  "notesFile": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "assignemntFile": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "answerAssignemntFile": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "videoFile": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  },
  "enventImage": {
    "storage": "object_storage",
    "cloudVendor": "Oracle"
  }
};

// end NEAI2-249

Upload.abortController = '';


Upload.getFileType =  function (stateObject) {
 
  if(stateObject.state.serviceName == 'ClassAssignment' || stateObject.state.serviceName == 'ECircular'){
    return DocumentPicker.types.pdf
  }
  else if(stateObject.state.serviceName == 'InstituteOtherActivity'){
    return DocumentPicker.types.images
  }
  else if(stateObject.state.serviceName == 'QuestionPaperConfiguration'){
    return DocumentPicker.types.images
  }
  else{
    return DocumentPicker.types.allFiles
  }

}


// start NEAI2-61
// Upload.documentUpload = async function (stateObject, elmentName, currentIndex) {
Upload.documentUpload = async function (stateObject, elmentName, currentIndex, childIndex) {
  // ends NEAI2-61
  // Pick a single file

  try {
    const reso = await DocumentPicker.pick({
      // type: [DocumentPicker.types.allFiles],
      type: [Upload.getFileType(stateObject)],
      // type: [DocumentPicker.types.pdf],
    });
    var res = reso[0]
    console.log(res, "res")


    var fileSize = res.size / 1000000
    var fileType = res.name.substring(res.name.lastIndexOf('.') + 1)

    // //console.log(
    //   res.uri,
    //   res.type, // mime type
    //   res.name,
    //   res.size
    // );
    ////console.log(res.name.length,"length of file")
    const file = {
      uri: res.uri,
      type: res.type,
      name: res.name,
    }
    var reWhiteSpace = new RegExp("/^\s+$/");

    // if (fileType != 'pdf' && fileType != 'PDF') {
    //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-041', errorMessage: '', errorParam: ['pdf, PDF'] }])
    //   return false;
    // }
    // starts NEAI2-249
    // if (res.name.length > 25) {
      if (res.name.length > 25 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
    // ends NEAI2-249
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-043', errorMessage: '', errorParam: [res.name] }])
      return false;
    }
     // starts NEAI2-249
    // if (1 < fileSize) {
      if (1 < fileSize && STORAGE_CONFIG[elmentName].storage == "server_storage") {
    // ends NEAI2-249
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-042', errorMessage: '', errorParam: [] }])
      return false;
    }
    // starts NEAI2-302
    if (10 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
      return false;
    }
     // ends NEAI2-302
    if (res.name.indexOf(' ') >= 0 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-044', errorMessage: '', errorParam: [] }])
      return false;
    }
    stateObject.parentStateChange({
      isLoading: true
    })
    // starts NEAI2-249
    // Upload.imageUploadApi(file, stateObject, elmentName, currentIndex)
   await Upload.imageUploadApi(file, stateObject, elmentName, currentIndex, childIndex)
    // ends NEAI2-249
    stateObject.parentStateChange({
      isLoading: false
    })

  } catch (err) {
    stateObject.parentStateChange({
      isLoading: false
    })
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

// Upload.imageUpload = async function (stateObject, elmentName, currentIndex) {
//   console.log(elmentName,'elmentName')
//   var options = {
//     title: 'Select Image',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };
//   //   this.parentStateChange = parentStateChange;
//   await ImagePicker.showImagePicker(options, response => {
//     console.log('Response = ', response);

//     if (response.didCancel) {
//       //console.log('User cancelled image picker');
//     } else if (response.error) {
//       //console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       //console.log('User tapped custom button: ', response.customButton);
//       alert(response.customButton);
//     } else {
//       let source = response;
//       // You can also display the image using data:
//       // let source = { uri: 'data:image/jpeg;base64,' + response.data }; isLoading
//       // setfilePath(source)
//       console.log(source, 'image')

//       var fileSize  = source.fileSize/1000000
//       var fileType = Platform.OS == 'ios' ? source.uri.substring(source.uri.lastIndexOf('.') + 1) : source.path.substring(source.path.lastIndexOf('.') + 1)
//       var fileName =  Platform.OS == 'ios' ? source.uri.substring(source.uri.lastIndexOf('/') + 1) : source.path.substring(source.path.lastIndexOf('/') + 1)

//       ////console.log(fileType,"fileType")
//       ////console.log(fileName,"fileName")
//       const file = {
//         uri: source.uri,
//         type: source.type,
//         name: source.fileName,
//       }

//       var reWhiteSpace = new RegExp("/^\s+$/");

//       if (fileType != 'jpg' && fileType != 'JPG' && fileType != 'jpeg' && fileType != 'JPEG' && fileType != 'png' && fileType != 'PNG') {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-041', errorMessage: '', errorParam:['jpg JPG jpeg JPEG png PNG'] }])
//         return false;
//       }
//       if (fileName.length > 25 ) {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-043', errorMessage: '', errorParam:[fileName] }])
//         return false;
//       }
//       if (1 < fileSize) {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-042', errorMessage: '', errorParam:[] }])
//         return false;
//       }
//       if (fileName.indexOf(' ') >= 0) {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-044', errorMessage: '', errorParam:[] }])
//         return false;
//       }


//       stateObject.parentStateChange({
//         isLoading: true
//       })
//       Upload.imageUploadApi(file, stateObject, elmentName, currentIndex)
//     }
//   });
// }
// starts NEAI2-249
var binaryData = ""
// ends NEAI2-249
Upload.galleryImageUpload = async function (stateObject, elmentName, currentIndex) {
  console.log(elmentName, 'elmentName')
  var options = {
    // mediaType: 'photo'
    mediaType: 'photo',
    // includeBase64:true
  };
  await launchImageLibrary(options, async response => {

    try{
    console.log('Response = ', response);

    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.errorCode == "camera_unavailable") {
      return false
      //console.log('ImagePicker Error: ', response.error);
    } else if (response.errorCode == 'other') {
      //console.log('User tapped custom button: ', response.customButton);
      alert(response.errorMessage);
    } else {
// starts 3.0 UI/UX
      // let source = response;
      let source = response.assets[0];
// end 3.0 UI/UX
      // You can also display the image using data:
      console.log(source, 'image 1' )


      // return
      var fileSize = source.fileSize / 1000000

      console.log(fileSize,"fileSize ..")

      var fileType = source.uri.substring(source.uri.lastIndexOf('.') + 1)
      var fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1)

      var fileName1 = ''
      if (fileName.length > 25) {
        fileName1 = fileName.substring(fileName.length, fileName.length - 25);
      }
      else {
        fileName1 = fileName
      }


      // name: Platform.OS === 'android' ? filename : image.filename,
      // type: image.mime,

      const file = {
        uri: source.uri,
        type: source.type,
        // type: 'image/jpg',
        name: fileName1,
      }

      var reWhiteSpace = new RegExp("/^\s+$/");

      if (fileType != 'jpg' && fileType != 'JPG' && fileType != 'jpeg' && fileType != 'JPEG' && fileType != 'png' && fileType != 'PNG') {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-041', errorMessage: '', errorParam: ['jpg, JPG, jpeg, JPEG, png, PNG'] }])
        return false;
      }
        // starts NEAI2-249
      // if (fileName1.length > 25) {
      if (fileName1.length > 25 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
          // ends NEAI2-249
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-043', errorMessage: '', errorParam: [fileName1] }])
        return false;
      }
        // starts NEAI2-249
      // if (1 < fileSize) {
      if (1 < fileSize && STORAGE_CONFIG[elmentName].storage == "server_storage") {
          // ends NEAI2-249
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-042', errorMessage: '', errorParam: [] }])
        return false;
      }
  // starts NEAI2-249
  // starts NEAI2-302
      // if (1024 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
      //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
      //   return false;
      // }
      if (10 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
        return false;
      }
        // ends NEAI2-302
  // ends NEAI2-249
      if (fileName.indexOf(' ') >= 0 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-044', errorMessage: '', errorParam: [] }])
        return false;
      }


      stateObject.parentStateChange({
        isLoading: true
      })

      await  Upload.imageUploadApi(file, stateObject, elmentName, currentIndex)

     stateObject.parentStateChange({
      isLoading: false
    })
    }
  }
  catch(err){
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-088', errorMessage: '', errorParam:"" }])
    stateObject.parentStateChange({
      isLoading: false
    })
    return false
  }

  });


}



Upload.cameraImageUpload = async function (stateObject, elmentName, currentIndex) {


  console.log(elmentName, 'elmentName')
  var options = {
    mediaType: 'photo'
  };
  await launchCamera(options, async response => {
    try{
    console.log('Response = ', response);

    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.errorCode == "camera_unavailable") {
      return false
      //console.log('ImagePicker Error: ', response.error);
    } else if (response.errorCode == 'other') {
      //console.log('User tapped custom button: ', response.customButton);
      alert(response.errorMessage);
    } else {
     // starts 3.0 UI/UX
      // let source = response;
      let source = response.assets[0];
// end 3.0 UI/UX
      // You can also display the image using data:
      console.log(source, 'image')
      // if(source.errorCode == 'camera_unavailable'){
      // return false
      // }
      var fileSize = source.fileSize / 1000000
      var fileType = source.uri.substring(source.uri.lastIndexOf('.') + 1)
      var fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1)
      var fileName1 = ''
      if (fileName.length > 25) {
        fileName1 = fileName.substring(fileName.length, fileName.length - 25);
      }
      else {
        fileName1 = fileName
      }





      const file = {
        uri: source.uri,
        type: source.type,
        name: fileName1,
      }

      var reWhiteSpace = new RegExp("/^\s+$/");

      if (fileType != 'jpg' && fileType != 'JPG' && fileType != 'jpeg' && fileType != 'JPEG' && fileType != 'png' && fileType != 'PNG') {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-041', errorMessage: '', errorParam: ['jpg, JPG, jpeg, JPEG, png, PNG'] }])
        return false;
      }
      //   // starts NEAI2-249
      // if (fileName1.length > 25) {
      if (fileName1.length > 25 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
          // ends NEAI2-249
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-043', errorMessage: '', errorParam: [fileName1] }])
        return false;
      }
        // starts NEAI2-249
      // if (1 < fileSize) {
      if (1 < fileSize && STORAGE_CONFIG[elmentName].storage == "server_storage") {
          // ends NEAI2-249
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-042', errorMessage: '', errorParam: [] }])
        return false;
      }
        // starts NEAI2-249
          // starts NEAI2-302
      // if (1024 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
      //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
      //   return false;
      // }
      if (10 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
        return false;
      }
        // ends NEAI2-302
        // ends NEAI2-249
      // if (fileName.indexOf(' ') >= 0 ) {
      if (fileName.indexOf(' ') >= 0 && STORAGE_CONFIG[elmentName].storage == "object_storage") {
         // ends NEAI2-249
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-044', errorMessage: '', errorParam: [] }])
        return false;
      }


      stateObject.parentStateChange({
        isLoading: true
      })
     await Upload.imageUploadApi(file, stateObject, elmentName, currentIndex)

    stateObject.parentStateChange({
      isLoading: false
    })
    }
  }
  catch(err){
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-088', errorMessage: '', errorParam:"" }])
    stateObject.parentStateChange({
      isLoading: false
    })
    return false
  }
  });
}


Upload.galleryVideoUpload = async function (stateObject, elmentName, currentIndex) {
  console.log(elmentName, 'elmentName')
  var options = {
    mediaType: 'video'
  };
  await launchImageLibrary(options, async response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.errorCode == "camera_unavailable") {
      return false
      //console.log('ImagePicker Error: ', response.error);
    } else if (response.errorCode == 'other') {
      //console.log('User tapped custom button: ', response.customButton);
      alert(response.errorMessage);
    } else {
        // starts 3.0 UI/UX
      // let source = response;
      let source = response.assets[0];
// end 3.0 UI/UX
      // You can also display the image using data:
      console.log(source, 'image')
      var fileSize = source.fileSize / 1000000

      // var fileType = source.uri.substring(source.uri.lastIndexOf('.') + 1)
      var fileType = 'mp4'
      var fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1)

      var fileName1 = ''
      if (fileName.length > 25 ) {
        fileName1 = fileName.substring(fileName.length, fileName.length - 25);
      }
      else {
        fileName1 = fileName
      }

      const file = {
        uri: source.uri,
        // type: 'mp4',
        type: 'video/mp4',
        name: fileName1,
      }

      var reWhiteSpace = new RegExp("/^\s+$/");

      if (fileType != 'mp4') {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-041', errorMessage: '', errorParam: ['mp4'] }])
        return false;
      }
      if (fileName1.length > 25 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-043', errorMessage: '', errorParam: [fileName1] }])
        return false;
      }
      if (1 < fileSize && STORAGE_CONFIG[elmentName].storage == "server_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-042', errorMessage: '', errorParam: [] }])
        return false;
      }
  // starts NEAI2-302
      // if (1024 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
      //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
      //   return false;
      // }
      if (10 < fileSize && STORAGE_CONFIG[elmentName].storage == "object_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-077', errorMessage: '', errorParam: [] }])
        return false;
      }
  // ends NEAI2-302
      if (fileName.indexOf(' ') >= 0 && STORAGE_CONFIG[elmentName].storage == "server_storage") {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-044', errorMessage: '', errorParam: [] }])
        return false;
      }


      stateObject.parentStateChange({
        isLoading: true
      })
   await  Upload.imageUploadApi(file, stateObject, elmentName, currentIndex)

    stateObject.parentStateChange({
      isLoading: false
    })
    }
  });
}

// starts NEAI2-249
// async function imageUploadApi($scope, form, elmentName) {
Upload.imageUploadApi = async function (file, stateObject, elmentName, currentIndex, childIndex) {
  if (STORAGE_CONFIG[elmentName].storage == "server_storage") {
    // await server_imageUploadApi($scope, form, elmentName)
    await Upload.server_imageUploadApi(file, stateObject, elmentName, currentIndex, childIndex)
  } else if (STORAGE_CONFIG[elmentName].storage == "object_storage" && STORAGE_CONFIG[elmentName].cloudVendor == "Oracle") {
    // await OracleObjectStorageUpload($scope, form, elmentName)
    await Upload.OracleObjectStorageUpload(file, stateObject, elmentName, currentIndex, childIndex)
  }
}

// ends NEAI2-249


// start NEAI2-61
// Upload.imageUploadApi = async function (file, stateObject, elmentName, currentIndex) {
// starts NEAI2-249
// Upload.imageUploadApi = async function (file, stateObject, elmentName, currentIndex, childIndex) {
Upload.server_imageUploadApi = async function (file, stateObject, elmentName, currentIndex, childIndex) {
  // ends NEAI2-249
  // end NEAI2-61

  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  //var tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));
  var resToken = ''
  await apiCall.functions.getServiceToken(stateObject.state.serviceName).then(
    async (values) => {
      if (values == null) {
        await apiCall.functions.callRequestToken(globalData, stateObject.state.serviceName)
        await apiCall.functions.getServiceToken(stateObject.state.serviceName).then((token) => {
          resToken = token;
          return
        })
      }
      // resToken = values;
      else {
        resToken = values;
      }
      //console.log('Then: ',resToken);
    });



  //console.log(resToken,"resToken in upload")


  var imgfile = {
    uri: file.uri,
    type: file.type,
    name: file.name,
  };

  var data = new FormData();
  data.append("user", globalData.userID);
  data.append("institute", globalData.instituteID);
  data.append("token", resToken);
  data.append("service", stateObject.state.serviceName);
  data.append('profileImg', imgfile);
  // data.append("fileName",file.name);

  console.log(data, "data")

  await fetch(httpUtils.getURL('image', 'StudentPhoto'), {
    signal: Upload.abortController.signal,
    method: 'POST',
    headers: {
      'Accept': 'application/octet-stream',
      // 'Content-Type':'multipart/form-data', 
      // 'boundary':"----WebKitFormBoundary7MA4YWxkTrZu0gW"
    },
    body: data

  }).then(response => {
    stateObject.parentStateChange({
      isLoading: false
    })
    if (response.status != null && response.status == '200') {
      response.blob().then((blb) => {
        if (blb != null || blb != '') {
          ////console.log(blb, 'blb')
          const reader = new FileReader();

          reader.addEventListener('loadend', (e) => {
            const xhr = e.srcElement.result;
            if (xhr.includes("success")) {
              var res = xhr.split("~");
              var fileName = res[2];
              var uploadID = res[1];
              // start NEAI2-61
              // Upload.postUpload(fileName, uploadID, stateObject, elmentName, currentIndex)
              // starts NEAI2-249
              // Upload.postUpload(fileName, uploadID, stateObject, elmentName, currentIndex, childIndex)
              var url = "/CohesiveUpload/images/" + uploadID + "/" + fileName
              Upload.postUpload(fileName, uploadID, stateObject, elmentName, currentIndex, childIndex, url)
              // ends NEAI2-249
              // end NEAI2-61
            }
            else {
              var res = xhr.split("~");
              var errCode = res[1];
              var errMsg = res[2];
              var error = [{
                errorCode: "",
                errorMessage: ""
              }];
              error[0].errorCode = errCode;
              error[0].errorMessage = errMsg;
              stateObject.parentStateChange({
                isLoading: false
              })

              if (errCode == 'BS_VAL_101') {
                Exception.functions.showBackendError(stateObject, error)
                return false;
              }
              else {
                Exception.functions.showBackendError(stateObject, error)
                return false;
              }
            }


          });
          reader.readAsText(blb);
        }
      });
    }
    else {
      //var res = xhr.split("~");

      var errCode = 'SERVER_ERROR';
      if (response.status == '500') {
        var errMsg = `There is Server error ${response.status},Image/File can not be uploaded, Please logout and retry or contact Support`;
      }
      else {
        var errMsg = `There is Server error ${response.status},Image/File can not be uploaded, Please contact Support`;

      }


      var error = [{
        errorCode: "",
        errorMessage: ""
      }];
      error[0].errorCode = errCode;
      error[0].errorMessage = errMsg;
      Exception.functions.showBackendError(stateObject, error)
    }

  })
    .catch((e) => {
      stateObject.parentStateChange({
        isLoading: false
      })
      var errCode = 'SERVER_ERROR';
      var errMsg = `There is Server error ,Image/File can not be uploaded, Please contact Support`;
      var error = [{
        errorCode: "",
        errorMessage: ""
      }];
      error[0].errorCode = errCode;
      error[0].errorMessage = errMsg;
      Exception.functions.showBackendError(stateObject, error)
      // Alert('Upload Failed')

    });
}

// Starts NEAI2-249
var ObjectStorageServiceName = "ObjectStorage";
var NAMESPACE = "lrunsfbywn6i";
var COMPARTMENT_ID = "ocid1.compartment.oc1..aaaaaaaaf5kttr4b2axtmvnpxg75yh6eqig2ohg64cft244edscqb4222zua";
var HOST = "https://objectstorage.uk-london-1.oraclecloud.com";
var HOSTwithoutHTTPS = "objectstorage.uk-london-1.oraclecloud.com";
var auth_header;
var contentLength;
var x_content;
var uniqueName;
var resToken = '';
var returnValue = false;
var imagefile;
var FirstPutFromCreate = true;
var changeOnProgress = false;

// async function OracleObjectStorageUpload($scope, form, elmentName) {
Upload.OracleObjectStorageUpload = async function (file, stateObject, elmentName, currentIndex, childIndex) {
  // file = form[0].files[0];
  console.log(file, "file")
  imagefile = file
  console.log("--inside OracleObjectStorageUpload---")
  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  // var resToken = '';
  await apiCall.functions.getServiceToken(ObjectStorageServiceName).then(
    async (values) => {
      if (values == null) {
        await apiCall.functions.callRequestToken(globalData, ObjectStorageServiceName)
        await apiCall.functions.getServiceToken(ObjectStorageServiceName).then((token) => {
          resToken = token;
          return
        })
      }
      else {
        resToken = values;
      }
    });

  // window.parent.fn_show_spinner();
  // stateObject.parentStateChange({
  //   isLoading: true
  // })
  // await createBucketIfAbsent(elmentName)
  // await createBucketIfAbsent(elmentName, stateObject, currentIndex, childIndex)
  await putObject(elmentName, stateObject, currentIndex, childIndex)
  console.log("--exit OracleObjectStorageUpload---")
}

async function getAuthHeader(data, elmentName, stateObject) {
  try {
    console.log("--inside getAuthHeader---")
    auth_header = "";
    contentLength = "";
    x_content = "";
    uniqueName = "";


    await axios({
      method: "put",
      url: httpUtils.getURL('ObjectStorage', 'GetSignatureHeader'),
      headers: {
        'Content-Type': 'application/json'
      },
      // data: JSON.stringify(data),
      data: data,
      // cancelToken: apiCall.getApiCancelToken(service),
      timeout: 40000
    },
    )
      .then(response => {
        console.log(response, 'getAuthHeader response')
        // stateObject.parentStateChange({
        //   isLoading: false
        // })
        if (response.data.header.status == "success") {
          auth_header = response.data.body.AuthorizationHeader;
          contentLength = response.data.body.contentLength;
          x_content = response.data.body.x_content;
          uniqueName = response.data.body.uniqueName
        } else {
          changeOnProgress = true;
          // $('#' + elmentName).filestyle('clear');
          var error = response.data.error;
          stateObject.parentStateChange({
            isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
          returnValue = false;
          return false
        }
        returnValue = true;
        return true
      })
      .catch(function (error) {
        console.log(error, 'getAuthHeader error')
         // stateObject.parentStateChange({
        //   isLoading: false
        // })
        Upload.catchErrorhandling(error,stateObject)

       
        //console.log(error.code, 'call request error code')
      });

    // await fetch(httpUtils.getURL('ObjectStorage', 'ListBuckets'), {
    //   signal: Upload.abortController.signal,
    //   method: 'PUT',
    //   cache:'no-cache',
    //   // xhrFields: {
    //   //       withCredentials: true
    //   //   },
    //   // processData: false,
    //   // dataType: 'json',
    //   headers: {
    //     contentType: "application/json"
    //   },
    //   body: JSON.stringify(data)

    // }).then(response => {
    //   console.log(response,"response of getAuthHeader")

    //   stateObject.parentStateChange({
    //     isLoading: false
    //   })
    //   if (response.header.status == "success") {
    //     auth_header = response.body.AuthorizationHeader;
    //     contentLength = response.body.contentLength;
    //     x_content = response.body.x_content;
    //     uniqueName = response.body.uniqueName
    //   } else {
    //     changeOnProgress = true;
    //     // $('#' + elmentName).filestyle('clear');
    //     var error = [{
    //       errorCode: response.error.errorCode,
    //       errorMessage: response.error.errorMessage
    //     }];
    //     stateObject.parentStateChange({
    //       isLoading: false,
    //       error: error,
    //       errorType: 'BE',
    //       showAlert: true
    //     })
    //     returnValue = false;
    //     return false
    //   }
    //   returnValue = true;
    //   return true

    // })
    //   .catch((e) => {
    //     console.log(e,"getAuthHeader error")
    //     stateObject.parentStateChange({
    //       isLoading: false
    //     })
    //   });
  } catch (ex) {
    returnValue = false;
    return false
  }
  console.log("--exit getAuthHeader---")
}
// 1. create bucket if absent --> resp --> list of buckets
// create bucket --> 
// put object -> upload the file to oracle
// get uri --> resp : URI of the uploaded file --> 30mins

// async function createBucketIfAbsent(elmentName, stateObject, currentIndex, childIndex) {
//   console.log("--inside  createBucketIfAbsent---")
//   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
//   var date_object = (new Date()).toUTCString();
//   var body = {
//     token: resToken,
//     userID: globalData.userID,
//     instid: globalData.instituteID,
//     service: ObjectStorageServiceName
//   };
//   var payloadHeaders = [{
//     name: "(request-target)",
//     value: "get /n/" + NAMESPACE + "/b?compartmentId=" + COMPARTMENT_ID
//   }, {
//     name: "host",
//     value: HOSTwithoutHTTPS
//   }, {
//     name: "x-date",
//     value: date_object
//   }];
//   var data = {
//     body: body,
//     payloadHeaders: payloadHeaders,
//     payloadBody: {}
//   };
//   await getAuthHeader(data, elmentName, stateObject).then(async function () {
//     if (returnValue) {
//       returnValue = false;


//       await axios({
//         method: "get",
//         url: HOST + "/n/" + NAMESPACE + "/b?compartmentId=" + COMPARTMENT_ID,
//         headers: {
//           "x-date": date_object,
//           "Authorization": auth_header
//         },
//         // cancelToken: apiCall.getApiCancelToken(service),
//       },
//       )
//         .then(response => {
//           console.log(response, "response of createBucketIfAbsent")

//           stateObject.parentStateChange({
//             isLoading: false
//           })

//           var list = response.data;
//           var bucketExists = false;
//           for (var i = 0; i < list.length; i++) {
//             if (list[i].name == globalData.instituteID) {
//               bucketExists = true;
//               break
//             }
//           }
//           if (!bucketExists) {
//             createBucket(elmentName, stateObject, currentIndex, childIndex)
//           } else {
//             console.log('bucket already exists');
//             putObject(elmentName, stateObject, currentIndex, childIndex)
//           }
//         })
//         .catch(function (error) {
//           console.log(error, 'createBucketIfAbsent error')
//           stateObject.parentStateChange({
//             isLoading: false
//           })
//         });


//     }
//   })
//   console.log("--exit  createBucketIfAbsent---")
// }
// async function createBucket(elmentName, stateObject, currentIndex, childIndex) {
//   console.log("--inside  createBucket---")
//   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

//   var date_object = (new Date()).toUTCString();
//   var body = {
//     token: resToken,
//     userID: globalData.userID,
//     instid: globalData.instituteID,
//     service: ObjectStorageServiceName
//   };
//   var payloadHeaders = [{
//     name: "(request-target)",
//     value: "post /n/" + NAMESPACE + "/b/"
//   }, {
//     name: "host",
//     value: HOSTwithoutHTTPS
//   }, {
//     name: "x-date",
//     value: date_object
//   }, {
//     name: "content-type",
//     value: "application/json"
//   }];
//   var payloadBody = {
//     compartmentId: COMPARTMENT_ID,
//     name: globalData.instituteID
//   };
//   var data = {
//     body: body,
//     payloadHeaders: payloadHeaders,
//     payloadBody: payloadBody
//   };
//   await getAuthHeader(data, elmentName, stateObject).then(async function () {
//     if (returnValue) {
//       returnValue = false;
  
//       await axios({
//         method: "post",
//         url: HOST + "/n/" + NAMESPACE + "/b/",
//         headers: {
//           // 'Content-Type': 'application/json',
//           "x-date": date_object,
//           "x-content-sha256": x_content,
//           "Authorization": auth_header
//         },
//         // data: JSON.stringify(payloadBody),
//         data: payloadBody,
//         // cancelToken: apiCall.getApiCancelToken(service),

//       },
//       )
//         .then(response => {
//           console.log(response, "response of createBucket")
//           stateObject.parentStateChange({
//             isLoading: false
//           })
//           console.log("created");
//           putObject(elmentName, stateObject, currentIndex, childIndex)

//         })
//         .catch(function (error) {
//           console.log(error, 'createBucket error')
//           stateObject.parentStateChange({
//             isLoading: false
//           })
//         });

//     }
//   })
//   console.log("--exit  createBucket---")
// }
async function putObject(elmentName, stateObject, currentIndex, childIndex) {
  try{

  
  console.log("--inside  putObject---")
  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  var date_object = (new Date()).toUTCString();
  console.log(imagefile, "imagefile")
  var actualFilename = imagefile.name;
  var extension = actualFilename.substring(actualFilename.lastIndexOf("."), actualFilename.length);
  console.log(extension, "extension")
  var body = {
    token: resToken,
    userID: globalData.userID,
    instid: globalData.instituteID,
    service: ObjectStorageServiceName
  };
  var payloadHeaders = [{
    name: "(request-target)",
    value: "put /n/" + NAMESPACE + "/b/" + globalData.instituteID + "/o/~~fileName~~" + extension
  }, {
    name: "host",
    value: HOSTwithoutHTTPS
  }, {
    name: "x-date",
    value: date_object
  }];
  var payloadBody = {};
  var data = {
    body: body,
    payloadHeaders: payloadHeaders,
    payloadBody: payloadBody
  };
  // var $scope = getSubScreenScope();
  var m_refID = "";
  var m_date = "";
  var m_type = "";
  switch (stateObject.state.serviceName) {
    case "GeneralLevelConfiguration":
      if (elmentName == "institutePhoto") {
        m_refID = globalData.instituteID;
        m_date = date_object;
        m_type = "Institute Logo"
      }
      break
    case "StudyMaterial":
      if (elmentName == "ducuentFile") {
        m_refID = stateObject.state.dataModel.materialID;
        m_date = date_object;
        m_type = "Study Material";
      }
      break;
      case "QuestionPaperConfiguration":
        if (elmentName == "questionImg") {
          m_refID = stateObject.state.dataModel.questionPaperId;
          m_date = date_object;
          m_type = "Question Paper configuration";
        }
        break;
    case "BlogService":
      if (elmentName == "ducuentFile") {
        m_refID = stateObject.state.dataModel.blogID;
        m_date = date_object;
        m_type = "Blog file";
      }
      break;
    case "StudentNotesService":
      if (elmentName == "notesFile") {
        m_refID = stateObject.state.dataModel.notesID + "/" + currentIndex + "/" + childIndex;
        m_date = date_object;
        m_type = "Student notes";
      }
      break;
    case "ClassAssignment":
      if (elmentName == "assignemntFile") {
        m_refID = stateObject.state.dataModel.assignmentID + "/" + currentIndex;
        m_date = date_object;
        m_type = "Class Assignment";
      }
      break;
    case "TeacherNotesService":
      if (elmentName == "notesFile") {
        m_refID = stateObject.state.dataModel.notesID + "/" + currentIndex + "/" + childIndex;
        m_date = date_object;
        m_type = "Teacher notes";
      }
      break;
    case "ECircular":
      if (elmentName == "ducuentFile") {
        m_refID = stateObject.state.dataModel.circularID;
        m_date = date_object;
        m_type = "Ecircular";
      }
      break;
    case "InstituteAssignment":
      if (elmentName == "videoFile") {
        m_refID = stateObject.state.dataModel.assignmentID;
        m_date = date_object;
        m_type = "Video Lesson";
      }
      break;
      case "InstituteOtherActivity":
        if (elmentName == "enventImage") {
          m_refID = stateObject.state.dataModel.activityID;
          m_date = date_object;
          m_type = "Event Image";
        }
        break;
    case "NewStudentAssignment":
      if (elmentName == "answerAssignemntFile") {
        m_refID = stateObject.state.dataModel.assignmentID + "/" + currentIndex;
        m_date = date_object;
        m_type = "Student Assignment";
      }
      break;

    case "StudentProfile":
      if (elmentName == "studentPhoto") {
        m_refID = stateObject.state.dataModel.studentID;
        m_date = date_object;
        m_type = "Student profile";
      } else if (elmentName == "familyMember") {
        m_refID = stateObject.state.dataModel.studentID + "/" + currentIndex;
        m_date = date_object;
        m_type = "Student family photo";
      }
      break;
    case "TeacherProfile":
      if (elmentName == "teacherPhoto") {
        m_refID = stateObject.state.dataModel.teacherID;
        m_date = date_object;
        m_type = "Teacher profile";
      } else if (elmentName == "familyprofileImg") {
        m_refID = stateObject.state.dataModel.teacherID + "/" + currentIndex;
        m_date = date_object;
        m_type = "Teacher family photo";
      }
      break;

  }
  await getAuthHeader(data, elmentName, stateObject).then(async function () {
    if (returnValue) {
      returnValue = false;

      // stateObject.parentStateChange({
      //   isLoading: true
      // })
      // var request = new FormData();
      // request.append('profileImg', imagefile);
      // starts NEAI2-302
      // const base64 = await RNFS.readFile(imagefile.uri, 'base64')
      // const buffer = Buffer.from(base64, 'base64')
      
      var base64 = ""
      var buffer = ""
      try{
         base64 = await RNFS.readFile(imagefile.uri, 'base64')
         buffer = Buffer.from(base64, 'base64')
      }catch (ex) {
         console.log(ex,"RNFS :- error")
         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-079', errorMessage: '', errorParam: [] }])
         stateObject.parentStateChange({
          isLoading: false,
        })
        return
        }
      // starts NEAI2-302

      console.log(buffer, "buffer")

      await axios({
        method: "put",
        url: HOST + "/n/" + NAMESPACE + "/b/" + globalData.instituteID + "/o/" + uniqueName + extension,
        // data: request,
        headers: {
          // 'Accept': 'application/octet-stream',
          // "Content-Type": `multipart/form-data; boundary=${request._boundary}`,
          'Content-Type': `${imagefile.type}; charset=utf-8`,
          'x-amz-acl': 'public-read',
          "x-date": date_object,
          "Authorization": auth_header,
          "ocp-meta-refID": m_refID,
          "ocp-meta-date": m_date,
          "ocp-meta-type": m_type,

        },
        // data: JSON.stringify(payloadBody),
        data: buffer,
        // cancelToken: apiCall.getApiCancelToken(service),
        timeout: 40000

      },
      )
        .then(async response  => {
          console.log(response, "response of putObject")
          // stateObject.parentStateChange({
          //   isLoading: false
          // })
          // // console.log("put object successful");
          // getUri(elmentName, uniqueName + extension, stateObject, currentIndex, childIndex)

          if (response.status == 200) {
            console.log("put object successful");
            //getUri(elmentName, uniqueName+extension);
          await getUri_webserver(elmentName, uniqueName + extension, stateObject, currentIndex, childIndex);
          }
          else if (response.status == 404) {
          await  Create_and_PutObject(elmentName, data, m_refID, m_date, m_type, extension,stateObject, currentIndex, childIndex);

          } else {
            // window.parent.fn_hide_parentspinner();
            var error = [{
              errorCode: "Err_O_put",
              errorMessage: "Please try again"
            }];
            // fn_show_backend_exception(error);
            stateObject.parentStateChange({
              isLoading: false,
              error: error,
              errorType: 'BE',
              showAlert: true
            })
            return null;
          }

        })
        .catch(function (error) {
          console.log(error, 'putObject error')
          // stateObject.parentStateChange({
          //   isLoading: false
          // })
          Upload.catchErrorhandling(error,stateObject)
  
        });


    }
  })
  console.log("--exit  putObject---")
}
catch(err){
  var error = [{
    errorCode: 'network error!',
     errorMessage: 'Sorry, There maybe network bandwidth error or insufficient memory buffer in your mobile. Please try uploading from mobile browser or try from different device.'
    }];
    stateObject.parentStateChange({
      isLoading: false,
      error: error,
      errorType: 'BE',
      showAlert: true
    })
}
}


async function Create_and_PutObject(elmentName, data, m_refID, m_date, m_type, extension,stateObject, currentIndex, childIndex) {
  try {
    auth_header = "";
    contentLength = "";
    x_content = "";
    uniqueName = "";

    data.body.refID = m_refID;
    data.body.date = m_date;
    data.body.type = m_type;
    data.body.extension = extension;
    stateObject.parentStateChange({
      isLoading: true
    })

    await axios({
      method: "put",
      url: httpUtils.getURL('CreateAndPut', 'CreateAndPut'),
      headers: {
        contentType: "application/json",
      },
      // data: JSON.stringify(data),
      data: data,
      // cancelToken: apiCall.getApiCancelToken(service),
      timeout: 40000

    },
    )
      .then(response => {
        console.log(response, "response of Create_and_PutObject")
        // stateObject.parentStateChange({
        //   isLoading: false
        // })

        if (response.data.header.status == "success") {
          if (FirstPutFromCreate) {
            FirstPutFromCreate = false;
            // putObject(data, elmentName);
             putObject(elmentName, stateObject, currentIndex, childIndex)
          }
        }
        else {
          changeOnProgress = true;
          // $('#' + elmentName).filestyle('clear');
          var error = [{
            errorCode: response.data.error[0].errorCode,
            errorMessage: response.data.error[0].errorMessage
          }];
          // window.parent.fn_hide_parentspinner();
          console.log("error response from Create_and_Put resource");
          // fn_show_backend_exception(error);
          stateObject.parentStateChange({
            isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
          returnValue = false;
          return false;
        }
        returnValue = true;
        return true;


      })
      .catch(function (error) {
        console.log(error, 'Create_and_Put error')

        // stateObject.parentStateChange({
        //   isLoading: false
        // })
        Upload.catchErrorhandling(error,stateObject)
      });
  }
  catch (ex) {
    returnValue = false;
    return false;
  }
}

async function getUri_webserver(elmentName, p_fileNameWithExtension, stateObject, currentIndex, childIndex) {

  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  var data = {
    body: {
      filename: p_fileNameWithExtension,
      instituteID: globalData.instituteID,
      token: resToken,
      userID: globalData.userID,
      service: ObjectStorageServiceName
    }
  };

  try {
 
    await axios({
      method: "put",
      url: httpUtils.getURL('GetUri', 'GetUri'),
      headers: {
        "contentType": "application/json",

      },
      // data: JSON.stringify(data),
      data: data,
      // cancelToken: apiCall.getApiCancelToken(service),
      timeout : 40000

    },
    )
      .then(response => {
        console.log(response, "response of getUri_webserver")
        // stateObject.parentStateChange({
        //   isLoading: false
        // })
        if (response.data.header.status == "success") {
          var url = HOST + response.data.body[0].URI;
           if (typeof url == 'undefined'  || url == null || url == '' ){
             var error = [{
            errorCode: 'network error!',
             errorMessage: 'Sorry, There maybe network bandwidth error or insufficient memory buffer in your mobile. Please try uploading from mobile browser or try from different device.'
            }];

            stateObject.parentStateChange({
              isLoading: false,
              error: error,
              errorType: 'BE',
              showAlert: true
            })

          }
           else{
            Upload.postUpload(p_fileNameWithExtension, "Oracle", stateObject, elmentName, currentIndex, childIndex, url);

           }
          // window.parent.fn_hide_parentspinner();
        }
        else {
          changeOnProgress = true;
          // $('#' + elmentName).filestyle('clear');
          var error = [{
            errorCode: response.error[0].errorCode,
            errorMessage: response.error[0].errorMessage
          }];
          // window.parent.fn_hide_parentspinner();
          console.log("error response from GetUri");
          // fn_show_backend_exception(error);
          stateObject.parentStateChange({
            isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
          returnValue = false;
          return false;
        }
        returnValue = true;
        return true;
      })
      .catch(function (error) {
        console.log(error, 'getUri_webserver error')
        // stateObject.parentStateChange({
        //   isLoading: false
        // })
        Upload.catchErrorhandling(error,stateObject)
      });


  }
  catch (ex) {
    returnValue = false;
    return false;
  }
}


// async function getUri(elmentName, p_fileNameWithExtension, stateObject) {
//   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

//   console.log("--inside  getUri---")
//   var date = new Date();
//   var date_object = (date).toUTCString();
//   date.setTime(date.getTime() + (30 * 60 * 1000));
//   // var fullyear = date.getFullYear();
//   // var month = parseInt(date.getMonth()) + 1;
//   // var dayOfMonth = date.getDate();
//   // var hour = date.getHours();
//   // var min = date.getMinutes();
//   // var sec = date.getSeconds();
//   var fullyear = date.getUTCFullYear();
//   var month = parseInt(date.getUTCMonth()) + 1;
//   if (month < 10) { month = "0" + month; }
//   var dayOfMonth = date.getUTCDate();
//   if (dayOfMonth < 10) { dayOfMonth = "0" + dayOfMonth; }
//   var hour = date.getUTCHours();
//   if (hour < 10) { hour = "0" + hour; }
//   var min = date.getUTCMinutes();
//   if (min < 10) { min = "0" + min; }
//   var sec = date.getUTCSeconds();
//   if (sec < 10) { sec = "0" + sec; }
//   var expires_date_object = fullyear + "-" + month + "-" + dayOfMonth + "T" + hour + ":" + min + ":" + sec + "Z";
//   var body = {
//     token: resToken,
//     userID: globalData.userID,
//     instid: globalData.instituteID,
//     service: ObjectStorageServiceName
//   };
//   var payloadHeaders = [{
//     name: "(request-target)",
//     value: "post /n/" + NAMESPACE + "/b/" + globalData.instituteID + "/p/"
//   }, {
//     name: "host",
//     value: HOSTwithoutHTTPS
//   }, {
//     name: "x-date",
//     value: date_object
//   }, {
//     name: "content-type",
//     value: "application/json"
//   }];
//   var payloadBody = {
//     accessType: "ObjectRead",
//     name: "GetObjectUri",
//     timeExpires: expires_date_object,
//     objectName: p_fileNameWithExtension
//   };
//   var data = {
//     body: body,
//     payloadHeaders: payloadHeaders,
//     payloadBody: payloadBody
//   };
//   await getAuthHeader(data, elmentName, stateObject).then(async function () {
//     if (returnValue) {
//       returnValue = false;
  
//       await axios({
//         method: "post",
//         url: HOST + "/n/" + NAMESPACE + "/b/" + globalData.instituteID + "/p/",
//         headers: {
//           // "contentType": "application/json",
//           "x-date": date_object,
//           "x-content-sha256": x_content,
//           "Authorization": auth_header,
//           'Content-Length': contentLength
//         },
//         data: JSON.stringify(payloadBody),
//         // data: payloadBody,
//         // cancelToken: apiCall.getApiCancelToken(service),

//       },
//       )
//         .then(response => {
//           console.log(response, "response of getUri")
//           stateObject.parentStateChange({
//             isLoading: false
//           })
//           console.log("GET Object successful");
//           var url = HOST + response.data.accessUri;
//           // postUpload(p_fileNameWithExtension, "Oracle", url, elmentName,currentIndex,childIndex);
//           Upload.postUpload(p_fileNameWithExtension, "Oracle", stateObject, elmentName, currentIndex, childIndex, url);

//         })
//         .catch(function (error) {
//           console.log(error, 'getUri error')
//           stateObject.parentStateChange({
//             isLoading: false
//           })
//         });

//     }
//   })
//   console.log("--exit  getUri---")
// }



// Ends NEAI2-249



// start NEAI2-61
// Upload.postUpload = function (fileName, UploadID, stateObject, elmentName, currentIndex) {
Upload.postUpload = function (fileName, UploadID, stateObject, elmentName, currentIndex, childIndex, url) {
  // end NEAI2-61
  // var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  //console.log(globalData)

  // "https://cohesivetest.ibdtechnologies.com/CohesiveUpload/images/3518b0e1-d3cf-48b3-9c4c-820f346ad5f6/profile.jpg?ivas="global.token1"&nekot="userid~instituteid"&uhtuliak="global.token0"

  // starts NEAI2-249
  // var imgUrl = "/CohesiveUpload/images/" + UploadID + "/" + fileName

  console.log(url, "url in postUpload")
  var imgUrl = url
  // ends NEAI2-249
  //   if (UploadID == "Oracle") {
  //     imgUrl = $scope;
  //     vidUrl = $scope;
  //     fileUrl = $scope;
  //     $scope = angular.element(document.getElementById('SubScreenCtrl')).scope()
  // }

  switch (elmentName) {
    case 'studentPhoto':
      stateObject.state.dataModel.profileImgPath = imgUrl
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel
      })
      break;
    case 'familyMember':
    //  starts 3.0 UI/UX
      // stateObject.state.dataModel.family[currentIndex].memberImgPath = imgUrl
      // stateObject.parentStateChange({
      //   dataModel: stateObject.state.dataModel
      // })
      stateObject.state.familyEmptyrecord.memberImgPath = imgUrl
      stateObject.parentStateChange({
        familyEmptyrecord: stateObject.state.familyEmptyrecord
      })
      // end 3.0 UI/UX
      break
    case 'teacherPhoto':
      stateObject.state.dataModel.profileImgPath = imgUrl
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel
      })
      break;
      //     //  starts 3.0 UI/UX
      case 'familyprofileImg':
        //console.log(imgUrl,"imgUrl")
        // stateObject.state.dataModel.family[currentIndex].memberImgPath = imgUrl
        // stateObject.parentStateChange({
        //   dataModel: stateObject.state.dataModel
        // })
        stateObject.state.familyEmptyrecord.cp_imgPath = imgUrl
        stateObject.parentStateChange({
          familyEmptyrecord: stateObject.state.familyEmptyrecord
        })
        break
            //  end 3.0 UI/UX
    case 'ducuentFile':
      stateObject.state.dataModel.contentPath = imgUrl
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel
      })
      break;

    case 'institutePhoto':
      stateObject.state.dataModel.profileImgPath = imgUrl
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel
      })
      break;
    case 'notesFile':
      // stateObject.state.dataModel.classAndSubjectDetails[currentIndex].notesDetails[childIndex].contentPath = imgUrl
      // stateObject.parentStateChange({
      //   dataModel: stateObject.state.dataModel
      // })
      stateObject.state.notesDetailsEmptyrecord.contentPath = imgUrl
      stateObject.parentStateChange({
        notesDetailsEmptyrecord: stateObject.state.notesDetailsEmptyrecord
      })
      break;

      case 'questionImg':
        stateObject.state.questionDetailsEmptyrecord.imagePath = imgUrl
        stateObject.parentStateChange({
          questionDetailsEmptyrecord: stateObject.state.questionDetailsEmptyrecord
        })
        break;
    // case 'assignemntFile':
    //   stateObject.state.dataModel.worksheets[currentIndex].workSheetPath = imgUrl
    //   stateObject.parentStateChange({
    //     dataModel: stateObject.state.dataModel
    //   })
    //   break;
    case 'assignemntFile':
      stateObject.state.worksheetsEmptyrecord.workSheetPath = imgUrl
      stateObject.parentStateChange({
        worksheetsEmptyrecord: stateObject.state.worksheetsEmptyrecord
      })
      break;
    case 'answerAssignemntFile':
      stateObject.state.worksheetsEmptyrecord.answerPath = imgUrl
      stateObject.parentStateChange({
        worksheetsEmptyrecord: stateObject.state.worksheetsEmptyrecord
      })
      break;
    case 'videoFile':
      // if(stateObject.state.currentOperation == "Create"){
      //   stateObject.state.dataModel.oracleURL = imgUrl
      // }
      // else{
      //   stateObject.state.dataModel.URL = imgUrl
      // }
      stateObject.state.dataModel.URL = imgUrl
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel
      })
      break;

      case 'enventImage':
        stateObject.state.eventImagesEmptyrecord.imagePath = imgUrl
        stateObject.parentStateChange({
          eventImagesEmptyrecord: stateObject.state.eventImagesEmptyrecord
        })
        break;
  }

}




Upload.catchErrorhandling = function (error,stateObject) {
  var response = {}
  if (error != null && typeof error != 'undefined') {

      if (typeof error.response == "undefined") {
        if (error.code == 'ECONNABORTED') {
          response = {
            status: 'error',
            error: [{
              errorCode: 'network error!',
              errorMessage: 'Network error! Time Out happened Please Retry'
            }]
          }
        }
        else {
          response = {
            status: 'error',
            error: [{
              errorCode: 'network error!',
              errorMessage: 'Network error! Please Retry'
            }]
          }
        }

      }
      else if (error.response != null && typeof error.response != 'undefined') {
        if (error.response.status != null && typeof error.response.status != 'undefined' && error.response.status == 500) {
          response = {
            status: 'error',
            error: [{
              errorCode: 'server error!',
              errorMessage: 'Server is not responding please try after sometime.'
            }]
          }
        } 

        else  if (error.response.status != null && typeof error.response.status != 'undefined' && error.response.status == 404) {
          response = {
            status: 'error',
            error: [{
              errorCode: 'server error!',
              errorMessage: 'Server is not responding please try after sometime.'
            }]
          }
        }
        else {
          response = {
            status: 'error',
            error: [{
              errorCode: 'server error!',
              errorMessage: 'Server is not responding please try after sometime.'
            }]
          }
        }
      }
    }
  else {
    response = {
      status: 'error',
      error: [{
        errorCode: 'network error!',
        errorMessage: 'Network error! Please Retry'
      }]
    }
  }

   stateObject.parentStateChange({
    isLoading: false,
    error: response.error,
    errorType: 'BE',
    showAlert: true
  })

}





module.exports = {
  functions: Upload
};