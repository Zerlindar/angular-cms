/**
 * Created by Administrator on 2016/12/13.
 */
app.controller("branchController", function ($scope, constant, $parse,clone, alertify, myHttp) {
  $scope.title = constant.tabTitle;
  $scope.data = "";
  $scope.bdhtml = "<div>bdhtml|trustHtml绑定html</div>";
  $scope.getData = function () {
    console.log("data", $scope.data);
  }
});
app.controller("tableController", function ($scope, alertify, myHttp, launchApi) {
  $scope.listTitle = launchApi.$listTitle;
  $scope.listData = launchApi.$listData;
  $scope.operation = function (data, index) {
    console.log(data, index);
  }
});
app.controller("selectController", function($scope, selectApi){
  $scope.labelList = [];
  $scope.listData = [];
  $scope.search = function () {
    $scope.listData = selectApi.$listData;
  }
})
app.controller("paginationController", function ($scope) {
  $scope.page = 1;
  $scope.count = 200;
  $scope.size = 9;
  $scope.update = function(){
    console.log("page: ", $scope.page);
  }
});
