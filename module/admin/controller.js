/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", ["$scope", "alertify", "myHttp", "myCookie", "$state", function($scope, alertify, myHttp, myCookie, $state){
  var role = {
    menuInfo: [
      {
        moduleName: "指令名称",
        icon: "glyphicon-home",
        menu: [
          {
            menuName: "tab状态切换",
            route: "admin.tab",
            icon: "glyphicon-plus"
          },
          {
            menuName: "table指令",
            route: "admin.table",
            icon: "glyphicon-cloud"
          },
          {
            menuName: "下拉选中",
            route: "admin.select",
            icon: "glyphicon-star"

          },
          {
            menuName: "分页",
            route: "admin.pagination",
            icon: "glyphicon-time"
          },
        ]
      }
    ]
  };
  if(role){
    $scope.manageName=localStorage.getItem('name');
    $scope.menuData=role.menuInfo;
  }else{
    $state.go('login');
  }
  $scope.logout = function(){
    myCookie.clearCookie("auth_token");
    $state.go('login');
    alertify.success("登出成功")
  }
}]);