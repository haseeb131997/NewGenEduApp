import {ToastAndroid,Alert,PermissionsAndroid,Platform,Permis} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob'


class DownloadUtils{}

DownloadUtils.abortController = '';


DownloadUtils.requestPermission = async function(file){
    if(Platform.OS == 'android' ){
        try {
            const granted = Platform.OS == 'android' ? await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE) : await request(PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DownloadUtils.downloadPdf (file);
              ////console.log("Storage permission granted");
            } else {
              ////console.log("Storage permission denied");
            }
          } catch (err) {
            //console.log(err);
          } 
    }
    else{
        DownloadUtils.downloadPdf (file);
    }
    
    
}

DownloadUtils.downloadPdf = async function(file){
    console.log(file,'downloadPdf')
    //console.log(file,"file in download")
    var filename = file.substr(file.lastIndexOf("/")+1)
    //console.log(filename,"filename")
    if(file == '' || file == null){
        Alert.alert("File Not Available")
    } else {
        Platform.select({
        ios: () => {
            Alert.alert("Report is Downloading....");
        },
        android: () => {
            ToastAndroid.show("Report is Downloading", ToastAndroid.SHORT);
        }
        })();
        const { config, fs } = RNFetchBlob;
        let DownloadDir = fs.dirs.DownloadDir; // this is the Downloads directory.
        let options = {
        fileCache: true,
        addAndroidDownloads: {
            notification: true,
            useDownloadManager: true, //uses the device's native download manager.
            mime: `application/pdf`,
            title: "Document", // Title of download notification.
            path: DownloadDir + "/" +filename, // this is the path where your download file will be in
            description: "Downloading file."
        }
        };
  
        config(options)
        .fetch("GET", file)
        .then(res => {
            //console.log(res,"Success");
            Platform.select({
            ios: () => {
                Alert.alert("Download complete");
            },
            android: () => {
                ToastAndroid.show("Download complete", ToastAndroid.SHORT);
            }
            })();
        })
        .catch(err => {
            //console.log("error", err);
        }); // To execute when download cancelled and other errors
    }
}



module.exports = {
    functions: DownloadUtils
  };