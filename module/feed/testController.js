/**
 * Created by Administrator on 2016/9/8.
 */
app.controller("testController", function($scope, alertify){
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
})
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
