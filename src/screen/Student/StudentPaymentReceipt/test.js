async function getReceipt( selectedIndex ){

    var $scope = getSubScreenScope();



    var data = {};

    for (let value of $scope.subScreenScope.primaryKeyCols) {

        data[value] = $scope.subScreenScope[$scope.subScreenScope.displayContent].SummaryResult[selectedIndex][value]

    }

    await fullViewCall(data, "noModal");



    if(apiError){

        return false;

    }



    var businessEntity = [];

    var i = 0;

    for (let value of $scope.subScreenScope.primaryKeyCols) {

        businessEntity[i] = {

                entityName: value,

                entityValue: $scope.subScreenScope.dataModel[value]

            };

        i++;

    }

    businessEntity.pop();

    businessEntity.pop();



    bottomTabClick = "Next";

    $scope.subScreenScope.dataModel.Master={};

    if( globalData.userType == "P" || globalData.userType == "S" ){

        $scope.subScreenScope.dataModel.signatureShow="Y";

    }else{

        $scope.subScreenScope.dataModel.signatureShow="N";

    }

    var link = window.location.href.indexOf('test');

    if(link == -1){

        $scope.subScreenScope.dataModel.link = 'web';

    }else{

        $scope.subScreenScope.dataModel.link = 'test';

    }

    $scope.subScreenScope.dataModel.DataModelForReport = JSON.stringify($scope.subScreenScope.dataModel);

    var apiObject = {

        serviceName: "paymentReceipt",

        serviceType: "InstituteReport",

        datamodel: $scope.subScreenScope.dataModel,

        operation: "View",

        businessEntity: businessEntity,

        audit: $scope.subScreenScope.auditDataModel

    };

    await callApi(apiObject, null, parentStateChange).catch(function (e) {

        apiError = true;

    });



    $scope.subScreenScope.dataModel.DataModelForReport = "";

    $scope.subScreenScope.dataModel.ReportPath = "/CohesiveUpload" + $scope.subScreenScope.dataModel.ReportPath;

    //IS3008_1 starts

    $scope.subScreenScope.dataModel.ReportPathWithoutViewer = $scope.subScreenScope.dataModel.ReportPath;

    //IS3008_1 ends

    $scope.subScreenScope.dataModel.ReportPath = getDocumentPath( $scope.subScreenScope.dataModel.ReportPath );//jeron 22-06-2021

    $scope.$apply();

    if (apiError) {

        fn_Show_Exception_With_Param('FE-VAL-086','');

        //reset();

        return false;

    }else{

        //await timedSpinner();

        fn_Show_Exception_With_Param('FE-VAL-087','');

        var receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'), {backdrop:'static',keyboard:true,focus:true});

        receiptModal.handleUpdate();

        receiptModal.show();

        return true;

        //await nextClickHandler();

    }

}