import createStore from 'runtime-memcache';
import AsyncStorage from "@react-native-async-storage/async-storage";




class CustomCacheMemory { }



// const customCache = new RMStore({
//     policy: 'lru',
//     lruSize: 50, // cache a maximum of 300 users at a given time
// });

const customCache =  createStore({
    policy: 'lru',
    lruSize: 50, // cache a maximum of 300 users at a given time
});

CustomCacheMemory.putSummaryDataModelToCache = function (serviceName, dataModel) {
    // if (dataModel != undefined && dataModel != null && dataModel.length != 0){
        
        if (dataModel != undefined && dataModel != null && dataModel.hasOwnProperty('SummaryResult') && dataModel.SummaryResult.length>0 ){
        //return customCache.set(serviceName, dataModel); //Rajfix001
        return customCache.set(getCacheServiceName(serviceName,dataModel), dataModel);//Rajfix001
    }
    else{
        return false
    }   
}

CustomCacheMemory.getSummaryDataModelFromCache = function (serviceName,dataModel) {

    //return customCache.get(serviceName);
    return customCache.get(getCacheServiceName(serviceName,dataModel));

    // if(customCache.get(serviceName) != null && customCache.get(serviceName).SummaryResult.length == 0){
    //     return null;
    // }
    // else{
    //     return customCache.get(serviceName);
    // }
    
}

CustomCacheMemory.checkSummaryDataModelExistenceInCache = function (serviceName,dataModel) {
    //return customCache.has(serviceName);
    try{
    return customCache.has(getCacheServiceName(serviceName,dataModel));
    }
    catch(err)
    {
        console.log('checkSummaryDataModelExistenceInCache error',err)
        return false;
    }
    
    
}

CustomCacheMemory.removeSummaryDataModelInCache = function (serviceName,dataModel) {
    //return customCache.remove(serviceName);
    return customCache.remove(getCacheServiceName(serviceName,dataModel));
}

CustomCacheMemory.storeCacheToLocalStorage = async function () {

    try{

        // var globalData = JSON.parse(sessionStorage.getItem("GLOBAL"));
        var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

        var keyset = customCache.keys()

        var res = "";

        for(let i=0; i<keyset.length; i++){

            res += keyset[i] + "~~" + JSON.stringify( customCache.get(keyset[i]) );

           

            if(i+1 != keyset.length) res+="##";

        }

        //console.log(res);

        // localStorage.setItem("customCache~"+globalData.instituteID+"~"+globalData.userID, res);

        

        await AsyncStorage.setItem("customCache~"+globalData.instituteID+"~"+globalData.userID, res)
        for( item of customCache.keys() ){
            customCache.remove(item);
            }
    }

    catch(e){


    }

}

CustomCacheMemory.loadCacheFromLocalStorage = async function () {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    try{

        // var globalData = JSON.parse(sessionStorage.getItem("GLOBAL"));

       

        // var cacheString = localStorage.getItem("customCache~"+globalData.instituteID+"~"+globalData.userID);


        const cacheString = await AsyncStorage.getItem("customCache~"+globalData.instituteID+"~"+globalData.userID);

    

        if( cacheString != null ){

            var cacheArray = cacheString.split("##");

            for(let i=0; i<cacheArray.length; i++){

                var cacheItem = cacheArray[i].split("~~");

                if( cacheItem.length == 2 ){

                        customCache.set(cacheItem[0], JSON.parse(cacheItem[1]));

                    }

                }

            }
            
            const removeCache=await AsyncStorage.removeItem("customCache~"+globalData.instituteID+"~"+globalData.userID);//Rajfix001


        }
        
    catch(e){
        const removeCache=await AsyncStorage.removeItem("customCache~"+globalData.instituteID+"~"+globalData.userID);////Rajfix001
    }

}


CustomCacheMemory.checkStudentExistInCache = function (studentID,serviceName) {
// function checkStudentExistInCache(studentID, serviceName){

    return customCache.has(studentID+"~"+serviceName);

}


CustomCacheMemory.getStudentSearchResultInCache = function (studentID,serviceName) {
// function getStudentSearchResultInCache(studentID, serviceName){

    return customCache.get(studentID+"~"+serviceName);

}


CustomCacheMemory.putStudentSearchResultInCache = function (studentID,serviceName,dataModel) {
// function putStudentSearchResultInCache(studentID, serviceName, dataModel){

    if( customCache.has(studentID+"~"+serviceName) ){

        customCache.remove(studentID+"~"+serviceName);

    }

    customCache.set(studentID+"~"+serviceName, dataModel);

}


CustomCacheMemory.removeStudentSearchResultInCache = function (studentID,serviceName) {
// function removeStudentSearchResultInCache(studentID, serviceName){
    return customCache.remove(studentID+"~"+serviceName);
}

getCacheServiceName= function(serviceName,dataModel)
{
    console.log('inside getcacheServicename',dataModel)
  var cacheServiceName;
  
  if(serviceName =='OnlineClassroomService')
        {
             if(dataModel.filter.meetingScreenType=='S')
              cacheServiceName='OnlineStaffMeetings'
             else if(dataModel.filter.meetingScreenType=='P')
              cacheServiceName='OnlineParentMeetings'
             else if(dataModel.filter.meetingScreenType=='O')
              cacheServiceName='OnlineVideoClassRoom'
        }
 else
 cacheServiceName=serviceName     
 console.log('cacheServiceName',cacheServiceName);
return cacheServiceName;
}

module.exports = {
    functions: CustomCacheMemory
  };