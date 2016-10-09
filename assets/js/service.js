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
app.service("myHttp", function($q, $http, $state, alertify, myCookie){
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
})
