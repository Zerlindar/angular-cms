var app = angular.module('myApp', ['ui.router', 'ngAlertify', "ui.select", "ui.service", "ui.commonFuns"]);
app.constant('apiUrl','http://test.xpcc.com.cn:8002/');
app.constant('socketUrl','http://test.xpcc.com.cn:4500/');
app.run(["alertify", function(alertify){
  alertify.maxLogItems(1).delay(3000).okBtn('确认').cancelBtn('取消');
}]);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  //路由重定向 $urlRouterProvider
  // 没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至/admin
  $urlRouterProvider.when('', '/login');
  $urlRouterProvider.when('/', '/login');
  $urlRouterProvider.when('/feed', '/feed/shotCut');
  $urlRouterProvider.when('/feed/', '/feed/shotCut');
  $urlRouterProvider.otherwise('/404');

  //$http.defaults.headers.common['token']=myCookie.getCookie('auth_token');
  //$httpProvider.defaults.headers.post['token'] = '123';   adminController
  $stateProvider
    .state('error', {
      url: '/404',
      template: '<div class="text-center"><h1>页面不存在404！</h1>'
    })
    .state('login', {
      url: '/login',
      templateUrl: './module/login/login.html',
      controller: 'loginController',
    })
    .state('admin', {
      url: '/admin',
      templateUrl: './module/admin/admin.html',
      controller: 'adminController',
    })
    .state('admin.tab', {
      url: '/tab',
      templateUrl: './module/branch/tab.html',
      controller: 'branchController',
    })
    .state('admin.table', {
      url: '/table',
      templateUrl: './module/branch/table.html',
      controller: 'tableController',
    })
    .state('admin.select', {
      url: '/select',
      templateUrl: './module/branch/select.html',
      controller: 'selectController',
    })
    .state('admin.pagination', {
      url: '/pagination',
      templateUrl: './module/branch/pagination.html',
      controller: 'paginationController',
    })
}])
