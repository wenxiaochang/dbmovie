// pages/detail/detail.js
const app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const id = options.id;
    const title = options.title;
    var _this = this;
    wx.request({
      url: app.glob.Baseurl+'/movie/'+id+'.json',
      method:"GET",
      success:function(res){
        _this.setData({
          datail: res.data.data.MovieDetailModel,
          stars: util.convertToStarsArray(res.data.data.MovieDetailModel.sc),
          sc: res.data.data.MovieDetailModel.sc,
          dra: util.delHtmlTag(res.data.data.MovieDetailModel.dra)
        })
      }
    })
    this.setData({
      title: title,
      id:id
    });
    wx.showLoading({
      title: '加载中',
    });
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.title,
    });
    wx.hideLoading();
  },
  /**
   * 查看大图海报
   * 暂时取消，因为图片不够清晰
   * 
  */
  // viewMoviePostImg: function (e) {
  //   var src = e.currentTarget.dataset.src;
  //   wx.previewImage({
  //     current: src, // 当前显示图片的http链接
  //     urls: [src] // 需要预览的图片http链接列表
  //   })
  // },
})