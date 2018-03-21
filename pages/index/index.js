const util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    count: 0,
    empty:true,
    movies:{}
  },
  onLoad: function () {
    var hotUrl = '/movie/list.json?type=hot&offset=0&limit=14';
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
  onscroll: function (event) {
    //上拉加载
    var requestUrl = '/movie/list.json?type=hot&offset=' + this.data.count + '&limit=14';
    //发起一个网络请求
    this.Ajax(requestUrl);
    //显示加载动画
    wx.showNavigationBarLoading();
  },
  process: function (Resdata) {
    var moviesArr = [];
    for (var i in Resdata.data.movies) {
      var movie = Resdata.data.movies[i];
      var name = movie.nm;
      //判断标题的长度
      if (name.length >= 6) {
        name = name.substring(0, 5) + "...";
      }
      // console.log(movie);
      //创建一个数据对象
      var temp = {
        nm: name,
        sc: movie.sc,
        img: movie.img,
        id: movie.id,
        cat: movie.cat,
        stars: util.convertToStarsArray(movie.sc),
        name:movie.nm
      }
      //将数据对象push到数组
      moviesArr.push(temp);
      //抛出数据
    }
    //下拉加载数据
    var totalMovies = {};
    if (!this.data.empty) {
      //将旧数组和新的数组合并在一起
      totalMovies = this.data.movies.concat(moviesArr);
    } else {
      //如果是首次加载那么直接赋值
      totalMovies = moviesArr;
      this.data.empty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.data.count += 20;    
    //隐藏加载动画
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '猫眼电影'
    })
  },
  /**
   * 获取电影详情
  */
  godetail:function(event){
    var id = event.currentTarget.dataset.id;
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../detail/detail?id='+id+'&title='+name,
    })
  },
  onPullDownRefresh: function () {
    //下拉刷新
    var requestUrl = '/movie/list.json?type=hot&offset=0&limit=14';
    //发起一个网络请求
    this.Ajax(requestUrl);
    //置空数据 否则会出现重复数据
    this.data.movies ={};
    //改变状态
    this.data.empty = true;
    //复位偏移量
    this.data.count = 0;
    //显示加载动画
    wx.showNavigationBarLoading();
  }
})