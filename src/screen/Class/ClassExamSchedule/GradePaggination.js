// import NewOperation from "./NewOperation"
// import apiCall from "./../ApiCall/ActionApi";
import cloneDeep from 'lodash/cloneDeep';



class GradePaggination { }



GradePaggination.selectedIndex = null

// click on Add new button


GradePaggination.onClickNew = function (stateObject, emptyRecordName, emptyRecord) {
  stateObject.parentStateChange({
    twoLevelModalVisible: true,
    [emptyRecordName]: emptyRecord,
    errorField:[]
  })

}


GradePaggination.addAndedit = function (stateObject,parentTableName ,StateTableName, emptyRecord) {
  if (GradePaggination.selectedIndex == null) {
    stateObject.state[parentTableName][StateTableName].push(emptyRecord)
    stateObject.parentStateChange({
      [parentTableName]: stateObject.state[parentTableName],
      twoLevelModalVisible: false
    })
  }
  else {
    stateObject.state[parentTableName][StateTableName][GradePaggination.selectedIndex] = emptyRecord
    stateObject.parentStateChange({
      [parentTableName]: stateObject.state[parentTableName],
      twoLevelModalVisible: false
    })
  }
  GradePaggination.selectedIndex = null
}


GradePaggination.delete = function (stateObject,parentTableName,StateTableName, selectedIndex) {
  stateObject.state[parentTableName][StateTableName].splice(selectedIndex, 1);
  stateObject.parentStateChange({
    [parentTableName]: stateObject.state[parentTableName],
  })
}


GradePaggination.edit = function (stateObject, emptyRecordName, selectedObject, selectedIndex) {
  GradePaggination.selectedIndex = selectedIndex
  var dummyObject = cloneDeep(selectedObject)
  stateObject.parentStateChange({
    [emptyRecordName]: dummyObject,
    twoLevelModalVisible: true
  })
}

// same for discard and cross 
GradePaggination.discardRecord = function (stateObject) {
  stateObject.parentStateChange({
    twoLevelModalVisible: false
  })
  GradePaggination.selectedIndex = null
}









module.exports = {
  functions: GradePaggination
};