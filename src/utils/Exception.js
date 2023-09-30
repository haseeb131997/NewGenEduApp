

class Exception {}
import AsyncStorage from "@react-native-async-storage/async-storage";


Exception.showFrontendError = function(parentStateChange,error){
    
    parentStateChange({
        error:error,
        errorType:'FE',
        showAlert:true
    })
}


Exception.showBackendError = async function(stateObject,error){

    if(error[0].errorCode == 'BS_VAL_101' || error[0].errorCode == 'BS_VAL_103'){
        AsyncStorage.removeItem('Rst')
        error[0].errorMessage = "Session is expired , Please open the screen again from Menu and retry"
    }
    else if(error[0].errorCode == 'BS_VAL_100'){
        AsyncStorage.removeItem('Rst')
        error[0].errorMessage = "Session is expired , Please Login again and retry"

    }
    stateObject.parentStateChange({
        isLoading:false,
        error:error,
        errorType:'BE',
        showAlert:true
      })

}


module.exports = {  
    functions:Exception
  };