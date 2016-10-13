/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("branchController", function($scope, alertify, myHttp){
  $scope.title = ["全部", "大胖", "二胖", "三胖", "四胖"];
  $scope.temp = 0;
  $scope.say = function(index){
    console.dir(index);
  }
});
app.controller("launchController", function($scope, alertify, myHttp){
  $scope.listData = "launchController";
});

