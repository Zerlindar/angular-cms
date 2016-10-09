/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("introduceController", function($scope, alertify){
  $scope.title = ["全部", "大胖", "二胖", "三胖", "四胖"];
  $scope.temp = 0;
  $scope.date = moment().format("YYYY年MM月DD日 hh:mm")
  $scope.judge = [];
  $scope.judge[0] = true;
  $scope.tabNum = 0;
  $scope.tabTitle = [
    "gulp的使用",
    "使用bower安装插件",
    "使用less编译css",
    "angular-ui-router简介",
    "让一切运行起来吧"
  ];
  $scope.say = function(index){
    console.dir($scope.tabTitle);
  }
  $scope.tab = function(index){
    $scope.judge = [];
    $scope.tabNum = index;
    $scope.judge[index] = !$scope.judge[index];
    console.log($scope.tabNum);
  }
  $scope.ale = function(){
    alert("dddd");
  }
})
