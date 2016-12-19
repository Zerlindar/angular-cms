/**
 * Created by Administrator on 2016/9/29.
 */
"use strict";


function a(value, index){
  console.log(value, index);
}
function b(value, index){
  a(value, index);
}
b(3, 2);