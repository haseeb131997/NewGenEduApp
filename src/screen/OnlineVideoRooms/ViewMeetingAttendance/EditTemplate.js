

import React from "react";
import { View, } from "react-native";










class EditTemplate { }

EditTemplate.InstructionList = []
  

EditTemplate.ModificationMandatory = function (stateObject) {
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  
    </View>)
 

}



module.exports = {
  functions: EditTemplate
}