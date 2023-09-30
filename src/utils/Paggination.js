import NewOperation from "./NewOperation"
import apiCall from "./../ApiCall/ActionApi";
import cloneDeep from 'lodash/cloneDeep';



class Paggination { }



Paggination.selectedIndex = null
Paggination.parentIndex = null
//  
Paggination.editModalone = false
Paggination.editModaltwo = false
Paggination.editModalThree = false
Paggination.editModalFour = false

// click on Add new button

// Paggination.functions.onClickNew(stateObject,'periodTimingsEmptyrecord',periodTimingsEmpty)

Paggination.onClickNew = function (stateObject, emptyRecordName, emptyRecord) {
  // for(let prop in emptyRecord){
  //     emptyRecord[prop] = "";
  // }
  // let newEmptyRecord = cloneDeep(emptyRecord);
  stateObject.parentStateChange({
    secondModalVisible: true,
    [emptyRecordName]: emptyRecord,
    errorField:[]
  })
  Paggination.selectedIndex = null
}


// for submit 
// Paggination.functions.addAndedit(stateObject,'periodTimings',periodTimingsEmptyrecord)
Paggination.addAndedit = function (stateObject, StateTableName, emptyRecord) {
  if (Paggination.selectedIndex == null) {
    stateObject.state.dataModel[StateTableName].push(emptyRecord)
    stateObject.parentStateChange({
      dataModel: stateObject.state.dataModel,
      secondModalVisible: false
    })
  }
  else {
    stateObject.state.dataModel[StateTableName][Paggination.selectedIndex] = emptyRecord
    stateObject.parentStateChange({
      dataModel: stateObject.state.dataModel,
      secondModalVisible: false
    })
  }
  Paggination.selectedIndex = null
}


Paggination.delete = function (stateObject, StateTableName, selectedIndex) {
  stateObject.state.dataModel[StateTableName].splice(selectedIndex, 1);
  stateObject.parentStateChange({
    dataModel: stateObject.state.dataModel,
  })
}

// starts pagination level 1
Paggination.addAndeditLevel1 = function (stateObject,StateTableName1 ,StateTableName, emptyRecord) {


  if (Paggination.selectedIndex == null) {
    stateObject.state.dataModel[StateTableName1][StateTableName].push(emptyRecord)
    stateObject.parentStateChange({
      dataModel: stateObject.state.dataModel,
      secondModalVisible: false
    })
  }
  else {

    stateObject.state.dataModel[StateTableName1][StateTableName][Paggination.selectedIndex] = emptyRecord
    stateObject.parentStateChange({
      dataModel: stateObject.state.dataModel,
      secondModalVisible: false
    })
  }
  Paggination.selectedIndex = null
}


Paggination.addAndeditLevel2 = function (stateObject,StateTableName1 ,StateTableName, emptyRecord) {
    if (Paggination.selectedIndex == null) {
      stateObject.state.dataModel[StateTableName1][Paggination.parentIndex][StateTableName].push(emptyRecord)
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel,
        secondModalVisible: false
      })
    }
    else {
      stateObject.state.dataModel[StateTableName1][Paggination.parentIndex][StateTableName][Paggination.selectedIndex] = emptyRecord
      stateObject.parentStateChange({
        dataModel: stateObject.state.dataModel,
        secondModalVisible: false
      })
    }
    Paggination.selectedIndex = null
  }




Paggination.deleteLevel1 = function (stateObject,StateTableName1 ,StateTableName, selectedIndex) {
  stateObject.state.dataModel[StateTableName1][StateTableName].splice(selectedIndex, 1);
  stateObject.parentStateChange({
    dataModel: stateObject.state.dataModel,
  })
}

Paggination.deleteLevel2 = function (stateObject,StateTableName1 ,StateTableName,parentIndex ,selectedIndex) {
  stateObject.state.dataModel[StateTableName1][parentIndex][StateTableName].splice(selectedIndex, 1);
  stateObject.parentStateChange({
    dataModel: stateObject.state.dataModel,
  })
}


// ends pagination level 1

// Paggination.functions.edit(stateObject, 'planDetailEmptyrecord', item, index)

Paggination.edit = function (stateObject, emptyRecordName, selectedObject, selectedIndex) {

  Paggination.selectedIndex = selectedIndex
  
  var dummyObject = cloneDeep(selectedObject)
  stateObject.parentStateChange({
    [emptyRecordName]: dummyObject,
    secondModalVisible: true
  })
}

// same for discard and cross 
Paggination.discardRecord = function (stateObject) {
  stateObject.parentStateChange({
    secondModalVisible: false
  })
  Paggination.selectedIndex = null
  Paggination.editModalone = false
  Paggination.editModaltwo = false
  Paggination.editModalThree = false
  Paggination.editModalFour = false
}









module.exports = {
  functions: Paggination
};