/**
 * Created by Administrator on 2016/9/26.
 */
app.directive("tabTitle", function($parse){
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


      //elem.bind('click',function(){
      //  //'model.assign'也是一个函数，它用来更新表达式的值
      //  model.assign(scope,'New name');
      //  scope.$apply();
      //})
    },
    template: "<div id = 'tab-component'>{{tempLs}}" +
    "<span ng-class='{active: temp == $index}' ng-repeat='val in tempTitle track by $index' " +
    "ng-click = 'setCheck($index, val)'>{{val}}</span>" +
    "</div>",
  }
})
