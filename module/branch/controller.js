/**
 * Created by Administrator on 2016/12/13.
 */
app.controller("branchController", ["$scope", "alertify", "myHttp", function($scope, alertify, myHttp){
  $scope.title = ["全部", "大胖", "二胖", "三胖", "四胖"];
  $scope.data = "";
  $scope.bdhtml = "<div>bdhtml|trustHtml绑定html</div>";
  $scope.labelList = [],
    $scope.listData = [];
  $scope.page = 1;
  $scope.count = 200;
  $scope.size = 9;
  $scope.search = function(){
    console.log("click");
    $scope.listData = [
      {
        'id': '1', // 操作id
        'tag_id': '1', // 0和非0，0为本地标签，非0为已同步至微信侧
        'name': '星标组', // 标签名称
        'count': '0', // 成员数量
      },
      {
        'id': '1', // 操作id
        'tag_id': '2', // 0和非0，0为本地标签，非0为已同步至微信侧
        'name': '90hou ', // 标签名称
        'count': '52', // 成员数量
      },
      {
        'id': '1', // 操作id
        'tag_id': '3', // 0和非0，0为本地标签，非0为已同步至微信侧
        'name': '小区111', // 标签名称
        'count': '10', // 成员数量
      }
    ]
  }
  $scope.say = function(){
    console.log($scope.data);
  }

}]);
app.controller("launchController", ["$scope", "alertify", "myHttp", function($scope, alertify, myHttp){
  $scope.listData = "launchController";

}]);