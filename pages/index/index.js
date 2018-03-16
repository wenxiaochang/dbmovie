const util = require('../../utils/util.js');
const app = getApp();
Page({
  onLoad: function () {
    var hotUrl = '/movie/list.json?type=hot&offset=0&limit=12';
    //发起一个网络请求
    this.Ajax(hotUrl);
  },
  Ajax: function (url) {
    var _this = this;
    wx.request({
      url: app.glob.Baseurl + url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.process(res.data);
      },
      fail: function (res) {
        console.log("网络可能有问题")
      }
    })
  },
  process:function(Resdata){
    var moviesArr = [];
    for (var i in Resdata.data.movies){
      var movie = Resdata.data.movies[i];
      var name = movie.nm;
      //判断标题的长度
      if(name.length >= 6){
        name = name.substring(0,4)+"...";
      }
      console.log(movie);
      //创建一个数据对象
      var temp = {
        nm:name,
        sc: movie.sc,
        img: movie.img,
        id: movie.id,
        cat: movie.cat,
        stars: util.convertToStarsArray(movie.sc)
      }
      //将数据对象push到数组
      moviesArr.push(temp);
      //抛出数据
      this.setData({
        movies: moviesArr
      })
    }
  }
})