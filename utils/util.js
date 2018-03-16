/**
 * 将评分数转换成[1,1,1,1,1]这样的数组类型
 * stars (3.0,5.0,,,,,类似这样的数据)
 * return array
*/
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}
//抛出方法
module.exports = {
  convertToStarsArray: convertToStarsArray
}
