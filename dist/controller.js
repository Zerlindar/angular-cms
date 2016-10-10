var app = angular.module('myApp', ['ui.router', 'ngAlertify']);
app.run(["alertify", function(alertify){
  alertify.maxLogItems(1).delay(3000).okBtn('确认').cancelBtn('取消');
}]);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  //路由重定向 $urlRouterProvider
  // 没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至/admin
  $urlRouterProvider.when('', '/introduce');
  $urlRouterProvider.when('/', '/introduce');
  $urlRouterProvider.when('/feed', '/feed/shotCut');
  $urlRouterProvider.when('/feed/', '/feed/shotCut');
  $urlRouterProvider.otherwise('/404');
  $stateProvider
    .state('error', {
      url: '/404',
      template: '<div class="text-center"><h1>页面不存在404！</h1>'
    })
    .state('introduce', {
      url: '/introduce',
      templateUrl: './module/introduce/introduce.html',
      controller: 'introduceController',
    })
    .state('feed', {
      url: '/feed',
      templateUrl: './module/feed/feed.html',
      controller: 'feedController',
    })
    .state('login', {
      url: '/login',
      templateUrl: './module/login/login.html',
      controller: 'loginController',
    })
    .state('feed.page1', {
      url: '/shotCut',
      templateUrl: './module/feed/shot.html',
    })
    .state('feed.page2', {
      url: '/test',
      templateUrl: './module/feed/test.html',
      controller: 'testController'
    })
}])

/**
 * Created by Administrator on 2016/9/26.
 */
app.directive("hello", function(){
  return {
    restrict: "EA",
    replace: true,
    scope: {
      tempTitle: "=",
      tempLs: "@",
      ngJudge: "=",
      myClick: "&"
    },
    link: function(scope, element, attrs){
      scope.sayHello = function(index){
        scope.ngJudge = index;
        scope.myClick();
      }
    },
    template: "<div>{{tempLs}}<span ng-class='{active: ngJudge == $index}' ng-repeat='val in tempTitle track by $index' ng-click = 'sayHello($index)'>{{val}}</span></div>",
  }
})

/**
 * Created by Administrator on 2016/8/31.
 */
app.service('clone',function(){
  this.cloneObj = function(obj){
    var o;
    if (obj.constructor == Object){
      o = new obj.constructor();
    }else{
      o = new obj.constructor(obj.valueOf());
    }
    for(var key in obj){
      if ( o[key] != obj[key] ){
        if ( typeof(obj[key]) == 'object' ){
          o[key] = this.obj(obj[key]);
        }else{
          o[key] = obj[key];
        }
      }
    }
    //o.toString = obj.toString;
    //o.valueOf = obj.valueOf;
    return o;
  }
});
app.service("myCookie", function(){
  this.getCookie =  function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  //设置cookie
    this.setCookie = function (name, value, path, domain, exdays) {
    var d = new Date();
    exdays = exdays ? exdays : 1;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = ";expires=" + d.toUTCString();
    document.cookie = name + "=" + value +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      expires;
  },
  //清除cookie
    this.clearCookie = function (name, path, domain) {
    if (this.getCookie(name)) {
      document.cookie = name + "=" +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  },
  this.checkCookie = function () {
    var user = this.getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
});
app.service("myHttp", ["$q", "$http", "$state", "alertify", "myCookie", function($q, $http, $state, alertify, myCookie){
  var defer = $q.defer();
  var http = function(type, url, data, message){
    var options = {
      method: type,
      url: url,
      cache: false,
      data: type == 'POST' || type == 'PUT' || type == 'DELETE'? data: null,
      params: type == 'GET'? data: null
    }
    $http(options).success(function(data,code){
      if(data.res=='SUCCESS' || data.res==true){
        defer.resolve(data);
        if(message){
          alertify.success(message);
        }
      }else if(data.res=='FAILED'){
        defer.reject(data);
        if(!data.error.code){
          alertify.error('返回信息不符合规则，超出预料范围，请联系程序员！');
          console.log(data);
          return;
        }else{
            $state.go('login')
            myCookie.clearCookie("auth_token")
            alertify.error(data.error.message)
        }
      }else{
        alertify.error('返回数据异常，请联系程序员！')
        console.log(data)
      }
    }).error(function(data,code){
      alertify.error('HTTP请求错误，请F5刷新或联系开发人员')
      console.log('HTTP错误：',code)
      console.log(data)
    });
    return defer.promise;
  }
  return http;
}])

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("introduceController", ["$scope", "alertify", function($scope, alertify){
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
}])

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("feedController", ["$scope", "alertify", function($scope, alertify){

}])

/**
 * Created by Administrator on 2016/9/8.
 */
app.controller("testController", ["$scope", "alertify", function($scope, alertify){
  $scope.feedText = []
  for(var i = 0; i < localStorage.length; i ++){
    if(localStorage[i]){
      $scope.feedText.push(localStorage[i])
    }
  }
  $scope.delete = function(index){
    alertify.confirm("确认删除该条留言吗？", function(){
      $scope.feedText.splice(index, 1);
      localStorage.clear()
      for(var i = 0; i < $scope.feedText.length; i ++){
        localStorage.setItem(i, $scope.feedText[i]);
      }
      $scope.$apply();
    })
  }
  $scope.submit = function(){
    if($scope.talks !=""){
      localStorage.setItem($scope.feedText.length, $scope.talks);
      $scope.feedText.push($scope.talks);
      $scope.talks = "";
    }
  }
}])
app.factory("testApi", function(){
  var obj = {};
  obj.myLocal = {
    savethestuffLocal: function(value, key) {
      var i = key.length;
      localStorage.setItem(key, value);
    },
    getthestuffLocal: function(key) {
      var data = localStorage[key];
      return data;
    }
  }
  return obj;
})

/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("loginController", ["$scope", "alertify", "myHttp", "myCookie", function($scope, alertify, myHttp, myCookie){
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
}]);