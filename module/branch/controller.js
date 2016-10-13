/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("branchController", function($scope, alertify, myHttp){
  var list = {
    currentPage: 1,
    limit: 10
  }
  myHttp("GET", "stock/goods", list).then(function(data){
    $scope.listData = data.data;
    console.log("goods", data);
  })
})
