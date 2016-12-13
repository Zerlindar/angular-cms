/**
 * Created by Administrator on 2016/12/13.
 */
app.controller("loginController", ["$scope", "alertify", "myHttp", "myCookie", "$state", function($scope, alertify, myHttp, myCookie, $state){
  $scope.data = {};
  $scope.login = function(){
    //$scope.data.source = "MANAGE_WEB"

    if(!$scope.data.userName){
      alertify.alert("输入用户名");
    }else{
      localStorage.setItem('name', $scope.data.userName);
      $state.go("admin.branch");
      alertify.success("登录成功");
    }

    //myHttp("POST", "login", data).then(function(data){
    //  console.log("login_data", data)
    //  myCookie.setCookie('auth_token',data.token);
    //  if(data.data.roleInfo && data.data.roleInfo.menuInfo && data.data.roleInfo.menuInfo[0]){
    //    localStorage.setItem('roleInfo', JSON.stringify(data.data.roleInfo));
    //    localStorage.setItem('name', data.data.name);
    //    $state.go("admin.branch")
    //    alertify.success('登陆成功');
    //  }else{
    //    alertify.error('本账户还未分配权限！')
    //  }
    //});

  };

}]);
