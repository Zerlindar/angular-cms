var app = angular.module('myApp', ['ui.router', 'ngAlertify']);
app.run(function(alertify){
  alertify.maxLogItems(1).delay(3000).okBtn('确认').cancelBtn('取消');
});
app.config(function ($stateProvider, $urlRouterProvider) {
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
})
