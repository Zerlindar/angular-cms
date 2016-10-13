/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", function($scope, alertify, myHttp, myCookie, $state){
  var role=JSON.parse(localStorage.getItem('roleInfo'));
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
