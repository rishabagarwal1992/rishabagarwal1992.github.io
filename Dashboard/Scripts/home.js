var myApp=angular.module("iotApp",[]);

myApp.factory("getData",["$http",function($http){
var apiURL="https://api.myjson.com/bins/1ekyqb";
var factory={};
factory.fetchJSON=function(){
	return $http.get(apiURL);
};
return factory;
}]);

myApp.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
myApp.controller("ViewController",["getData","$scope",function(getData,$scope){
	$scope.solarGroup='';
	$scope.showPopup=false;
	$scope.connStatus='';
	$scope.currentInverter={};
	$scope.connectionStatus=[];
getData.fetchJSON().then(function(result){
	$scope.rawData=result.data;
	$scope.processedData=angular.copy($scope.rawData.inverters);
	$scope.solarGrps=$scope.rawData.solar_groups;
	$scope.fetchConnectionStatus();
}).catch(function(err){
console.log(err);
});


$scope.fetchConnectionStatus=function(){
for(var inverterItem in $scope.rawData.inverters){
if($scope.connectionStatus.indexOf($scope.rawData.inverters[inverterItem].connected)===-1){
	$scope.connectionStatus.push($scope.rawData.inverters[inverterItem].connected);
}
}
}

$scope.updateView=function(){
$scope.processedData=$scope.rawData.inverters.filter(function(item){
	if($scope.solarGroup.length>0 && $scope.connStatus.length>0){
	return item.solar_group===$scope.solarGroup && item.connected===$scope.connStatus.toLowerCase();
}
else if ($scope.solarGroup.length>0){
	return item.solar_group===$scope.solarGroup;
}
else if($scope.connStatus.length>0){
	return item.connected===$scope.connStatus.toLowerCase();
}
else{
	return item;
}
})
};

$scope.showSecondaryView=function(dataObj){
	$scope.currentInverter=dataObj;
	$scope.showPopup=true;
};

}]);