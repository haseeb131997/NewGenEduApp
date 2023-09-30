
import AsyncStorage from "@react-native-async-storage/async-storage";



//  ---on laod

class ScreenLoad{}

ScreenLoad.onLoad = async function(screenName,serviceName,defaultOperation){
    await AsyncStorage.setItem('CurrentOperation', defaultOperation);
    await AsyncStorage.setItem('screenName', screenName);
}

ScreenLoad.unLoad = async function(){
    await AsyncStorage.setItem('CurrentOperation', '');
    await AsyncStorage.setItem('screenName', '');
}


module.exports = {
    functions: ScreenLoad
  };