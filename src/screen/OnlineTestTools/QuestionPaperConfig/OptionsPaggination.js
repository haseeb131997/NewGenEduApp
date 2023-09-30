// import NewOperation from "./NewOperation"
// import apiCall from "./../ApiCall/ActionApi";
import cloneDeep from 'lodash/cloneDeep';



class OptionsPaggination { }



OptionsPaggination.selectedIndex = null

// click on Add new button


OptionsPaggination.onClickNew = function (stateObject, emptyRecordName, emptyRecord) {
  stateObject.parentStateChange({
    twoLevelModalVisible: true,
    [emptyRecordName]: emptyRecord,
    errorField:[]
  })

}


OptionsPaggination.addAndedit = function (stateObject,parentTableName ,StateTableName, emptyRecord) {
  if (OptionsPaggination.selectedIndex == null) {
    stateObject.state[parentTableName][StateTableName].push(emptyRecord)
    stateObject.parentStateChange({
      [parentTableName]: stateObject.state[parentTableName],
      twoLevelModalVisible: false
    })
  }
  else {
    stateObject.state[parentTableName][StateTableName][OptionsPaggination.selectedIndex] = emptyRecord
    stateObject.parentStateChange({
      [parentTableName]: stateObject.state[parentTableName],
      twoLevelModalVisible: false
    })
  }
  OptionsPaggination.selectedIndex = null
}


OptionsPaggination.delete = function (stateObject,parentTableName,StateTableName, selectedIndex) {
  stateObject.state[parentTableName][StateTableName].splice(selectedIndex, 1);
  stateObject.parentStateChange({
    [parentTableName]: stateObject.state[parentTableName],
  })
}


OptionsPaggination.edit = function (stateObject, emptyRecordName, selectedObject, selectedIndex) {
  OptionsPaggination.selectedIndex = selectedIndex
  var dummyObject = cloneDeep(selectedObject)
  stateObject.parentStateChange({
    [emptyRecordName]: dummyObject,
    twoLevelModalVisible: true
  })
}

// same for discard and cross 
OptionsPaggination.discardRecord = function (stateObject) {
  stateObject.parentStateChange({
    twoLevelModalVisible: false
  })
  OptionsPaggination.selectedIndex = null
}









module.exports = {
  functions: OptionsPaggination
};