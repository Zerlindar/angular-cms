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

/**
 * Created by Administrator on 2016/12/19.
 */
var funs = angular.module('ui.commonFuns', []);
funs.service("commonFuns", function(){
  this.getCheckedArray = function(origon, data){
    var arr = []
    angular.forEach(origon, function(v, i){
      if(origon[i]){
        arr.push(data[i]);
      }
    })
    return arr;
  }
  this.getTrueArrayLength = function(data, l){
    var length = 0;
    for(var i = 0; i < l; i ++){
      if(data[i]){
        length ++;
      }
    }
    return length;
  }
  this.setCheckedArray = function(array, length, judge){
    switch(judge){
      case "true":
        for(var i = 0; i < length; i ++){
          array[i] = true;
        }
        break;
      case "false":
        for(var i = 0; i < length; i ++){
          array[i] = false;
        }
        break;
      case "!":
        for(var i = 0; i < length; i ++){
          array[i] = !array[i];
        }
        break;
    }

  }
})
/**
 * Created by Administrator on 2016/12/16.
 */
app.constant("constant", {
  tabTitle: ["全部", "大胖", "二胖", "三胖", "四胖"]
})
/**
 * Created by Administrator on 2016/9/26.
 */
app.directive("tabTitle", ["$parse", function($parse){
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
}])

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
    this.removeListener = function (element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type,
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
      eventUtil.addHandler(ele, "click", function (e) {
        var event = eventUtil.getEvent(e),
          target = eventUtil.getTarget(event);
        if (target.id != "ser-input" && target.id != "search") {
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
tab.directive("myPagination", ["alertify", function (alertify) {
  function creatPage(current, count, length) {
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
    for (var i = min; i <= max; i++) {
      page.push(i);
    }
    return page;
  }

  return {
    restrict: "EA",
    replace: true,
    require: "?ngModel",
    scope: {
      pageNum: "=",
      pageCount: "=",
      ngModel: "=",
      myClick: "&"
    },
    link: function (scope, element, attrs, ctr) {
      if (!attrs.ngModel)
        throw '\"ng-model\" is undefined \n 中文:\"ng-model\"为必传参数。';
      if (!attrs.pageNum)
        throw '\"pageNum\" is undefined \n 中文:\"pageNum\"为必传参数。';
      if (!attrs.pageCount)
        throw '\"pageCount\" is undefined \n 中文:\"pageCount\"为必传参数。';
      scope.page = creatPage(scope.ngModel, scope.pageCount, scope.pageNum);  //页面数据
      scope.currentPage = scope.ngModel;                                      //当前页面
      scope.updatePage = function (page, flag) {
        if ((flag && ((flag == "pre" && page > 0) || (flag == "next" && page < scope.pageCount + 1))) || !flag) {
          scope.currentPage = page;
          scope.page = creatPage(scope.currentPage, scope.pageCount, scope.pageNum);
          if (ctr) {
            ctr.$setViewValue(page);
            scope.myClick();
          }
        }
      }
      scope.jump = function (data) {
        var currentPage = parseInt(document.getElementById("jumpPage").value);
        if (isNaN(currentPage)) {
          alertify.alert("输入不合法");
        } else if (currentPage > scope.pageCount) {
          alertify.alert("超过最大页数")
        } else if (currentPage < 1) {
          alertify.alert("超过最小页数")
        } else {
          scope.currentPage = currentPage;
          scope.page = creatPage(currentPage, scope.pageCount, scope.pageNum);
          if (ctr) {
            ctr.$setViewValue(currentPage);
            scope.myClick();
          }
        }
      }
    },
    template: '<div id ="pagination" >' +
    '<ul class="pagination inline-block">' +
    '<li ng-click = "updatePage(1)" ng-class = "{disabled: currentPage == 1}"><a class = "firstPage" title = "首页"  href="javascript:;">&laquo;</a></li>' +
    '<li ng-click = "updatePage(currentPage-1, \'pre\')" ng-class = "{disabled: currentPage == 1}"><a class = "previous" title = "前一页"  href="javascript:;">&lt;</a></li>' +
    '<li ng-click = "updatePage(val)" ng-repeat="val in page track by $index" class = "page" ng-class = "{active: val == currentPage}"><a href="javascript:">{{val}}</a></li>' +
    '<li ng-click = "updatePage(currentPage+1, \'next\')" ng-class = "{disabled: currentPage == pageCount}"><a class = "next" title = "尾页" href="javascript:">&gt;</a></li>' +
    '<li ng-click = "updatePage(pageCount)" ng-class = "{disabled: currentPage == pageCount}"><a class = "lastPage" title = "后一页" href="javascript:">&raquo;</a></li></ul>' +
    '<div class="page-footer inline-block page-footer">{{currentPage}}/{{pageCount}}&nbsp;&nbsp;转至 ' +
    '<input id = "jumpPage" class = "input-sm" type="text"/>页&nbsp;&nbsp; ' +
    '<div ng-click = "jump(ngModal)" class="btn-inline btn btn-sm btn-primary border-radius confirm">确定</div> </div>' +
    '</div>'
  }
}])
tab.directive("myTable", ["commonFuns", function (commonFuns) {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      tableTitle: "=",
      tableData: "=",
      checkModel: "=",
      myClick: "&"
    },
    link: function (scope, element, attrs) {
      var length = scope.tableData.length;
      scope.checkArray = [];
      scope.isAll;
      scope.getClick = function (value, index) {
        if (attrs.myClick) {
          scope.myClick()(value, index);
        }
      }
      scope.getAll = function (data) {
        scope.isAll = !scope.isAll;
        scope.checkModel = [];
        var num = commonFuns.getTrueArrayLength(scope.checkArray, length);
        if (num == length || num == 0) {
          commonFuns.setCheckedArray(scope.checkArray, length, "!")
        } else {
          commonFuns.setCheckedArray(scope.checkArray, length, "true")
        }
        scope.checkModel = commonFuns.getCheckedArray(scope.checkArray, data)
      }
      scope.getCheck = function (value, data) {
        scope.checkArray[value] = !scope.checkArray[value];
        scope.checkModel = [];
        var num = commonFuns.getTrueArrayLength(scope.checkArray, length);
        if (num != length) {
          scope.isAll = false;
        } else {
          scope.isAll = true;
        }
        scope.checkModel = commonFuns.getCheckedArray(scope.checkArray, data);
      }
    },
    template: '<div class="table table-responsive text-center">' +
    '<table class="table table-bordered table-hover"> ' +
    '<thead> ' +
    '<tr> ' +
    '<th ng-repeat = "val in tableTitle track by $index" class="text-center"> ' +
    '<div ng-if = "val.name === \'checkbox\'" ><label> <input ng-checked = "isAll" type="checkbox" ng-click = "getAll(tableData)"></label> </div>' +
    '<div ng-if = "val.name !== \'checkbox\'">{{val.name}}</div>' +
    '</th> ' +
    '</tr> ' +
    '</thead> ' +
    '<tbody> ' +
    '<tr ng-repeat = "(key, data) in tableData track by $index"> ' +
    '<td ng-repeat = "(d,val) in tableTitle track by $index"> ' +
    '<div ng-if = "val.name === \'checkbox\'" ><label> <input type="checkbox" ng-checked = "checkArray[key]" ng-click = "getCheck(key, tableData)"/></label></div> ' +
    '<div ng-if = "val.name !== \'checkbox\'" ng-click = "getClick(data, key)">{{val.field|tableParse: data}}</div>' +
    '</td>' +
    '</tr> ' +
    '</tbody> ' +
    '</table></div>'
  }
}]).filter('tableParse', ["$parse", function ($parse) {
  return function (field, value) {
    return $parse(field)(value)
  }
}])

var service = angular.module('ui.service',[]);
service.service('clone', function () {
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
service.service("myCookie", function () {
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
service.service('myHttp', ["$q", "$http", "apiUrl", "$state", "alertify", "myCookie", function ($q, $http, apiUrl, $state, alertify, myCookie) {
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
service.service("commonFuns", function(){
  this.getUrlKey = function(){
    console.log("click");
  }
  this.getUrlHash = function(){
    var str = window.location.hash;
    console.log(str);
    return str;
  }
})
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
/**
 * Created by Administrator on 2016/12/13.
 */
app.controller("branchController", ["$scope", "constant", "$parse", "clone", "alertify", "myHttp", function ($scope, constant, $parse,clone, alertify, myHttp) {
  $scope.title = constant.tabTitle;
  $scope.data = "";
  $scope.bdhtml = "<div>bdhtml|trustHtml绑定html</div>";
  $scope.getData = function () {
    console.log("data", $scope.data);
  }
}]);
app.controller("tableController", ["$scope", "alertify", "myHttp", "launchApi", function ($scope, alertify, myHttp, launchApi) {
  $scope.listTitle = launchApi.$listTitle;
  $scope.listData = launchApi.$listData;
  $scope.checkModel = [];
  $scope.operation = function (data, index) {
    console.log(data, index);
    console.log("ngModel: ", $scope.checkModel)
  }
}]);
app.controller("selectController", ["$scope", "selectApi", function($scope, selectApi){
  $scope.labelList = [];
  $scope.listData = [];
  $scope.search = function () {
    $scope.listData = selectApi.$listData;
  }
}])
app.controller("paginationController", ["$scope", function ($scope) {
  $scope.page = 1;
  $scope.count = 200;
  $scope.size = 9;
  $scope.update = function(){
    console.log("page: ", $scope.page);
  }
}]);

/**
 * Created by Administrator on 2016/12/15.
 */
app.factory("selectApi", function(){
  var obj = {};
  obj.$listData = [
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
  return obj;
})
app.factory("launchApi", function () {
  var obj = {};
  obj.$listTitle = [
    {name: "checkbox"},
    {name: "昵称", field: "nickname"},
    {name: "性别", field: "sex"},
    {name: "提交时间", field: "subscribe_time"},
    {name: "语言", field: "language"},
    {name: "国家", field: "country"}
  ];
  obj.$listData = [{
    "id": "1",
    "openid": "65534f32265f71d49fd734c9fc603c0f194859c0501c96533a4b409318e3d97e",
    "nickname": "Darren",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e39\u9ea6",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcntic7l2QKicD54F2ZjXOiaNro1ndAyVic0NKf5oTzJLQrrWP8uybicVHdEcicIVL8tpQBKB5Me15O4yk6Ne\/0",
    "subscribe_time": "2014-01-05 21:24:54",
    "bind_card": "0",
    "tag_list": ["1"]
  }, {
    "id": "2",
    "openid": "fde93f329e7d6896665efe13b61223b9623e61d76c03626102e0626c529ad279",
    "nickname": "\u6768\u5f66\u4e2d \u5317\u4eac\u671d\u9633\u4ee3\u7406\u554613501274176",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcnt3M2RbRtUV6BIMwWBwdNQN32SCoyQxicGm6NvSSOc1WPkxDnStGOPfjGkm3lJnicMUibzMa9nRF3Nfn\/0",
    "subscribe_time": "2014-11-23 14:41:52",
    "bind_card": "0",
    "tag_list": ["1"]
  }, {
    "id": "3",
    "openid": "26d17bf75436717f821a41879449c04a297e15e7112fde73b2a637e10630feba",
    "nickname": "\u5b87\u5b99\u98de\u8239",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcntwShPG8mcTDeMvD9x9hiaiar9d5aolswVn4EVoK9DP1HPwXiaUtPWicwqPtedmqIWX64DlZJS5R6gL4h\/0",
    "subscribe_time": "2014-01-05 21:43:29",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "4",
    "openid": "68221c0902ed5ec1b4652e3125d65d16e0b720ff80695d42d431d74bb3959025",
    "nickname": "\u59da\u8fdc",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/oFoibaRjCMKdDWiaicYgsE80GYL03kL0ribZgd76G6ibE1pWa5MMmpYhUgdoUQltl4ysCChibsdEY1zl2fXdOoRh8cXH6WovzBQDNg\/0",
    "subscribe_time": "2014-01-07 15:17:30",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "5",
    "openid": "fafa31c7c23e890c54adc385e915b70892174f06e4b7403cfea1a66e5b81430c",
    "nickname": "\u5434\u5ce5",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u4e1c\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBqj83ibcKibmSdDK4UMz8Vrdx9D2jiaMz2HqtIJ9VTAf6F1chria2SIYZ1mdTF6mbfwfzuoEPIcibeFLic\/0",
    "subscribe_time": "2014-01-07 10:10:13",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "6",
    "openid": "35087456fff6648befedc1a15b348cb9545c06fe415eca82f67ce5d19a2bbd2b",
    "nickname": "\u8d75\u9e4f\u7a0b",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u4e30\u53f0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/PiajxSqBRaEJyh30RbLxia6SqZicp0Y45Uf1oXPluSwkGxqsnyWyjUrtSbtEEcK8qiaL8ia1U1oBqibV3rtpSw059ysg\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "7",
    "openid": "5ae3d478261349af4b09206f6b58885cf8252832e9b9fe9add581ddb9fa1f5a8",
    "nickname": "\u51b0",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBk5Vybic7ufXx2Vx1TdeZBRRbkP8aPddgGVzicaXKIxg9Tj54jZj0m7wlv32VPyoIEcLrz9te60K8o\/0",
    "subscribe_time": "2014-01-09 10:52:34",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "8",
    "openid": "4d019f089322480bd3d6a989443b868c681adec71aad9996e7a94b60fe8c3139",
    "nickname": "\u5929\u771f\u7eff\u554a \u6811\u771f\u84dd",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u4e30\u53f0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLDcAnukZ6CCvNabuEmiaWW62zJCicC76CSTm7utr6PqrP3Gb1A1uljYdbLC9HHMbQAFibf86KKBzXOog\/0",
    "subscribe_time": "2014-01-10 02:40:41",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "9",
    "openid": "340573cebdd74cc4b65499656226e97a52167c65786b71cb1bcf19ca607e649f",
    "nickname": "\u767d\u7389",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u6d77\u6dc0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645u3pnYNBEtOZI7xibsdUS4LXAkOo5WxN6K38yaEtkLTqoAiajibwMReNW2ia7tYf7Zv3KZSwSpcMtGd5rQFMl4wqrWf\/0",
    "subscribe_time": "2014-05-01 06:12:16",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "10",
    "openid": "ec661a5ee8249db0ec6d60847055486a9f6e58fbbf0b44c54efbe417d419f162",
    "nickname": "\u5317\u4eac\u9ec4\u6c0f\u65d7\u4e0b\u4e94\u91d1\u9500\u552e\u90e8",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u6cc9\u5dde",
    "province": "\u798f\u5efa",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/Q3auHgzwzM5sPAewCb4Gr4yC3LqTiaKm1OOCHjXXsic1nCbY85ico6eLorI7OhXEGhiapEXRsXmxwDC0J2jy6b8Kiag\/0",
    "subscribe_time": "2014-01-15 15:54:26",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "11",
    "openid": "3ba1d1b0678bbb156c8f2ec0d29d11a636a8c07d328092b6af40da2a29846abc",
    "nickname": "\u7a7a\u8c37\u5e7d\u5170",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u6d77\u6dc0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcnt433dPJamtfAuSpbvfibEbmW1hKL3u7huuhvBA9O6XfQloHv78gGgbianjWTVdiciaGsA1wHSyYtMcEH\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "12",
    "openid": "ccb537c45e9c27e34c3f99d05f6b70f5f9a8d32f1eac45145015972ea3d02d8c",
    "nickname": "\u859b\u9e4f",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/PiajxSqBRaELD1M14oUiaxU23zT4Lic3z3LnpM3rU02SgV8l3ULHlxwgWXbo9u0B3bnKUSXK4E8AlBUP00gsuPzLQ\/0",
    "subscribe_time": "2015-10-16 23:25:33",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "13",
    "openid": "288c318e2d054f85b47e0375186ffb1bb1a760fdcd4dd2de4d6b716abe9058ac",
    "nickname": "\u82cf",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u77f3\u666f\u5c71",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCibsicpLEWtsuoEvdXppP5W7p6Ifzs1QhYxo7iaLsxZ7DySDLlfMquxaQ8duibnVYBFlFNhZppeibbIlQ\/0",
    "subscribe_time": "2014-01-06 08:26:53",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "14",
    "openid": "447aed42ff61127f0b0f501a76ba1acbffc55aed57ad7780cf5bd648f68cafab",
    "nickname": "\u60e0\u4eba",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u65af\u6d1b\u6587\u5c3c\u4e9a",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ECCBojzbwGtKELJ6bz17xaCsTu6T5gAgtmJmnsgEBdNhL2yo8oXgicoH2vaATxp2eqjvPJSibY2Vqs6AyyCdlfU3jg41CMOQpe\/0",
    "subscribe_time": "2014-01-06 16:17:34",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "15",
    "openid": "12eca33833e712e303463b0b03b39e56bd6ac8638b39de2085320bac686eb149",
    "nickname": "????WAN????",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCcnxiaO9XRibNYQ6H9dpdqlcHZx4HnZVodH9oan0kTfTr7l2cEvv5icu7rB09JPtUD8MW94P7KQZQicA\/0",
    "subscribe_time": "2014-01-07 19:12:12",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "16",
    "openid": "ccb4aa5b10ba1e859ec85d9da1daa2da288d3c0554cd3c345850a05b3777455f",
    "nickname": "\u9a6c\u541b",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBlgGsItPNAaDve63pPkAcD77mbgjaS511ibl8Ku2OZxLhicBMQDRm5HZbV26Zsn6Pke682bicNXnKkq\/0",
    "subscribe_time": "2015-06-10 10:26:13",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "17",
    "openid": "4071e37256361364a9016c8ee2462e037d7431667d156ccbda237fb4fba92ae1",
    "nickname": "Robin",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u901a\u5dde",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBpkLQ9kmdaC7tRWtcAP5MhoC8XKAwVPL69Ipfncic9kVvQSswAurj772rQYmgbcNTPOhAby6IZYon\/0",
    "subscribe_time": "2014-01-08 11:47:31",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "18",
    "openid": "4da5a444eb940b36b6e2cac35d50cf08384d0424069282800685eb84be9f47c4",
    "nickname": "\u7530\u534e\u575a",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u5bc6\u4e91",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645slYj4icRiavKlz402ypShflFWx02micphu5VqMR4lYZiaarZibAkIDlZszotyIibsEIFHaibCgePWOxg60A\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "19",
    "openid": "45204fc2a7d46b0cedc867f99fadcd7f171421452b81522b4b2f87bbd96f481e",
    "nickname": "\u6c5f\u519b\u9752",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCzE6fdPnxZ0cQZiafp15KoNa8qV8IGbZAn1rjTbUTNZZ4esnncFSMLYrWT6HOlIs5a2JDw2GOAs6A\/0",
    "subscribe_time": "2014-04-28 12:54:08",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "20",
    "openid": "36cf890c61b89a742b17879fb3db51194d66246a1b4a678b1cd8c15770b54d81",
    "nickname": "\u771f\u5fc3\u771f\u610f",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645u3pnYNBEtOZJDkKTKEFFibFfpahKj1l2PNibvWVhLxK3ucOp7jlnzD68s0AjdH2JJW8WQnznUia6dxW6nNYE0Lddc\/0",
    "subscribe_time": "2014-01-22 23:34:48",
    "bind_card": "0",
    "tag_list": []
  }];
  return obj;
});
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
      $state.go("admin.tab");
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
