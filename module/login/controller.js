/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("loginController", function($scope, alertify, myHttp, myCookie){
  $scope.login = function(){
    //$scope.data.source = "MANAGE_WEB"
    var data = {
      password: "123456",
      source: "MANAGE_WEB",
      userName: "cjj"
    }
    myHttp("POST", "http://test.xpcc.com.cn:8002/login", data).then(function(data){
      console.log("data: " + data);
      myCookie.setCookie('auth_token',data.token)
    });
  };
});
