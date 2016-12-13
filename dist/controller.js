var app = angular.module('myApp', ['ui.router', 'ngAlertify', "ui.select"]);
app.constant('apiUrl','http://test.xpcc.com.cn:8002/');
app.constant('socketUrl','http://test.xpcc.com.cn:4500/')
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
    .state('admin.branch', {
      url: '/branch',
      templateUrl: './module/branch/branch.html',
      controller: 'branchController',
    })
    .state('admin.launch', {
      url: '/launch',
      templateUrl: './module/branch/launch.html',
      controller: 'launchController',
    })

}])

/**
 * Created by Administrator on 2016/9/26.
 */
app.directive("tabTitle", function(){
  return {
    restrict: "EA",
    replace: true,
    require: "?ngModel",
    scope: {
      tempTitle: "=",
      tempLs: "@",
      myClick: "&"
    },
    link: function(scope, element, attrs, ctr){
      scope.temp = 0;
      scope.setCheck = function(index, val){
        scope.temp = index;
        if (ctr) {
          ctr.$setViewValue(val);
        }
        scope.myClick();
      }

    },
    template: "<div id = 'tab-component'>{{tempLs}}" +
    "<span ng-class='{active: temp == $index}' ng-repeat='val in tempTitle track by $index' " +
    "ng-click = 'setCheck($index, val)'>{{val}}</span>" +
    "</div>",
  }
})

/**
 * Created by Administrator on 2016/12/13.
 */
app.filter('trustHtml', ["$sce", function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
}]);
/**
 * Created by Administrator on 2016/12/12.
 */
var tab = angular.module('ui.select', []);
tab.service("eventUtil", function () {
  this.getEvent = function (event) {
    return event ? event : window.event;
  },
    this.getTarget = function (event) {
      return event.target || event.srcElement;
    },
    this.getRelatedTarget = function (event) {
      if (event.relatedTarget) {
        return event.relatedTarget;
      } else if (event.toElement) {
        return event.toElement;
      } else if (event.fromElement) {
        return event.fromElement;
      } else {
        return null;
      }
    },
    this.addHandler = function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type,
          function () {
            return handler.call(element, window.event);
          });
      } else {
        element["on" + type] = handler;
      }
    },
    this.removeListener = function (element, type, hander) {
      if (element.removeEventListener) {
        element.removeEventListener(type, hander, false);
      } else if (element.deattachEvent) {
        element.deattachEvent("on" + type,
          function () {
            return handler.call(element, window.event);
          });
      } else {
        element['on' + type] = null;
      }
    },
    this.preventDefault = function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    this.stopPropagation = function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }

})
tab.directive("selectVox", ["eventUtil", function (eventUtil) {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      labelTitle: "@",
      originLabel: "@",
      labelContent: "=",
      listData: "=",
      myClick: "&"
    },
    link: function (scope, element, attrs) {
      scope.labelFlag = {};
      var ele = document.body;
      eventUtil.addHandler(ele, "click", function(e){
        var event = eventUtil.getEvent(e),
          target = eventUtil.getTarget(event);
        if(target.id != "ser-input" && target.id != "search"){
          scope.listData = [];
          scope.$apply();
        }
      });
      scope.setLabel = function (val) {
        if (!scope.labelFlag[val.name]) {
          scope.labelFlag[val.name] = 1;
          scope.labelContent.push(val);
        }
        scope.listData = [];
      }
      scope.deleteLabel = function (index, val) {
        scope.labelContent.splice(index, 1);
        scope.labelFlag[val.name] = 0;
      }
    },
    template: '<div id = "selectVox"> ' +
    '<div class="form-group"> ' +
    '<label for="ser-input" class="control-label col-sm-2">{{labelTitle}}：</label> ' +
    '<div class="col-sm-9 has-feedback"> ' +
    '<input id="ser-input" class="form-control" type="text"> <span ng-click = myClick() style = "right: 20px; cursor: pointer; pointer-events: auto" title="搜索" id = "search"class="glyphicon glyphicon-search form-control-feedback pos-relative"></span> ' +
    '<div class="select-content border border-t-none col-sm-12 pd-horizontal-none">' +
    '<ul ng-show = "listData && listData.length > 0"  id = "fansList-content"> ' +
    '<li class="list-detail" ng-repeat = "val in listData track by $index" ng-click = setLabel(val)>{{val.name}}</li> ' +
    '<li ng-if = "listData && listData.length == 0" class="title">没有找到该粉丝...</li>' +
    '</ul></div>' +
    '</div>' +
    '<div class="fans-content border border-t-none col-sm-12 pd-horizontal-none"> ' +
    '<ul ng-show = "labelContent.length > 0" class  = "col-sm-offset-2 col-sm-9 pd-horizontal-none group-label-list">' +
    '<li ng-repeat="val in labelContent track by $index"  class="col-sm-4 pd-horizontal-none label-detail pd-horizontal-sm has-feedback">' +
    '<a title = "{{val.name}}"  class = "pd-horizontal-sm" href="javascript:;">{{val.name}}</a> ' +
    '<div title = "删除标签" ng-click = "deleteLabel($index, val)" class = "glyphicon glyphicon-remove delete"></div> ' +
    '</li>' + ' </ul>' +
    ' </div>' +
    '</div>'
  }
}]);
tab.directive("myPagination", function(){
  function creatPage(current, count, length){
    var page = [], min, max;
    var center = (length + 1) / 2,
      diff = (length - 1) / 2,
      mdm = length - 1;
    if (count <= length) {
      min = 1;
      max = count;
    } else {
      if (current > center && current < count - diff) {      //3,2
        min = current - diff;
        max = min + mdm;
      } else if (current <= center) {
        min = 1;
        max = min + mdm;
      } else {
        min = count - mdm;
        max = count;
      }
    }
    for(var i = min; i <= max; i ++){
      page.push(i);
    }
    return page;
  }
  return {
    restrict: "EA",
    replace: true,
    scope: {
      pageNum: "=",
      pageCount: "=",
      ngModel: "="
    },
    link: function (scope, element, attrs) {
      if(!attrs.ngModel)
        throw '\"ng-model\" is undefined \n 中文:\"ng-model\"为必传参数。';
      if(!attrs.pageNum)
        throw '\"pageNum\" is undefined \n 中文:\"items-per-page\"为必传参数。';
      if(!attrs.pageCount)
        throw '\"pageCount\" is undefined \n 中文:\"total-items\"为必传参数。';
      scope.page = creatPage(scope.ngModel, scope.pageCount, scope.pageNum);  //页面数据
      scope.currentPage = scope.ngModel;                                      //当前页面
      scope.total = scope.pageCount;                                          //总页数
      scope.updatePage = function(page){
        scope.currentPage = page;
        scope.page = creatPage(scope.currentPage, scope.pageCount, scope.pageNum);
      }
      scope.jump = function(data){
        scope.currentPage = document.getElementById("jumpPage").value;
        scope.page = creatPage(scope.currentPage, scope.pageCount, scope.pageNum);
      }
    },
    template: '<div id ="pagination" >' +
    '<ul class="pagination inline-block">' +
    '<li ng-click = "updatePage(1)" ng-class = "{disabled: currentPage == 1}"><a class = "firstPage" title = "首页"  href="javascript:;">&laquo;</a></li>' +
    '<li ng-click = "updatePage(currentPage-1)" ng-class = "{disabled: currentPage == 1}"><a class = "previous" title = "前一页"  href="javascript:;">&lt;</a></li>'+
    '<li ng-click = "updatePage(val)" ng-repeat="val in page track by $index" class = "page" ng-class = "{active: val == currentPage}"><a href="javascript:">{{val}}</a></li>' +
    '<li ng-click = "updatePage(currentPage+1)" ng-class = "{disabled: currentPage == total}"><a class = "next" title = "尾页" href="javascript:">&gt;</a></li>' +
    '<li ng-click = "updatePage(total)" ng-class = "{disabled: currentPage == total}"><a class = "lastPage" title = "后一页" href="javascript:">&raquo;</a></li></ul>' +
    '<div class="page-footer inline-block page-footer">转至 ' +
    '<input id = "jumpPage" class = "input-sm" type="text"/>页&nbsp;&nbsp; ' +
    '<div ng-click = "jump(ngModal)" class="btn-inline btn btn-sm btn-info border-radius confirm">确定</div> </div>' +
    '</div>'
  }
})
app.service('clone', function () {
  this.cloneObj = function (obj) {
    var o;
    if (obj.constructor == Object) {
      o = new obj.constructor();
    } else {
      o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
      if (o[key] != obj[key]) {
        if (typeof(obj[key]) == 'object') {
          o[key] = this.obj(obj[key]);
        } else {
          o[key] = obj[key];
        }
      }
    }
    //o.toString = obj.toString;
    //o.valueOf = obj.valueOf;
    return o;
  }
});
app.service("myCookie", function () {
  this.getCookie = function (name) {
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
app.service('myHttp', ["$q", "$http", "apiUrl", "$state", "alertify", "myCookie", function ($q, $http, apiUrl, $state, alertify, myCookie) {
  function objInit(data) {
    var obj = {};
    angular.forEach(data, function (result, key) {
      if (angular.isObject(result)) {
        obj[key] = objInit(result);
      } else {
        if (result !== '' && result !== null && result !== undefined) {
          obj[key] = result;
        }
      }
    });
    return obj;
  }

  function http(type, url, data, message) {
    var defer = $q.defer();
    var options = {
      method: type,
      url: apiUrl + url,
      headers: {
        token: myCookie.getCookie("auth_token")
      },
      cache: false,
      data: type == 'POST' || type == 'PUT' || type == 'DELETE' ? data : null,
      params: type == 'GET' ? data : null
    };
    $http(options).success(function (data) {
      if (data.res == 'SUCCESS' || data.res == true) {
        defer.resolve(data);
        if (message) {
          alertify.success(message)
        }
      } else if (data.res == 'FAILED') {
        defer.reject(data);
        if (!data.error.code) {
          alertify.error('返回信息不符合规则，超出预料范围，请联系程序员！');
          console.log(data);
          return;
        }
        $state.go('login')
        myCookie.clearCookie("auth_token")
        //switch(data.error.code){
        //  case '20304':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '20305':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '10010':
        //    $state.go('login')
        //    myCookie.clearCookie("auth_token")
        //    break;
        //  case '10008':
        //    break;
        //  default :
        //    break;
        //}
        alertify.error(data.error.message);
      } else {
        alertify.error('返回数据异常，请联系程序员！');
        console.log(data);
      }
    }).error(function (data, code) {
      alertify.error('HTTP请求错误，请F5刷新或联系开发人员');
      console.log('HTTP错误：', code);
      console.log(data);
    });
    return defer.promise;
  }

  return http;
}]);
/**
 * Created by Administrator on 2016/8/30.
 */
app.controller("adminController", ["$scope", "alertify", "myHttp", "myCookie", "$state", function($scope, alertify, myHttp, myCookie, $state){
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
}]);
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
