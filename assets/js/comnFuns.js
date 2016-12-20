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