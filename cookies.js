var Cookie = {
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  //设置cookie
  setCookie: function (name, value, exdays, path, domain) {
    var d = new Date();
    exdays = exdays ? exdays : 1;
    d.setTime(d.getTime() + (exdays * 1000));
    var expires = ";expires=" + d.toUTCString();
    document.cookie = name + "=" + value +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      expires;
  },
  //清除cookie
  clearCookie: function (name, path, domain) {
    if (this.getCookie(name)) {
      document.cookie = name + "=" +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  },
  checkCookie: function () {
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
}
Cookie.setCookie("name", 1, 6);
console.log("cookie name: ", Cookie.getCookie("name"));
setTimeout(function(){
  console.log("cookie name: ", Cookie.getCookie("name"));
}, 7000)