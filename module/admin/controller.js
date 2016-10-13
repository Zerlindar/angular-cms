/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", function($scope, alertify, myHttp, myCookie, $state){
  var role = {
    menuInfo: [
      {
        moduleName: "门店管理",
        menu: [
          {
            menuName: "门店信息",
            route: "admin.branch"
          },
          {
            menuName: "区域管理",
            route: "admin.launch"
          }
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
});
