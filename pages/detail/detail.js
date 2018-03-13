// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    wx.request({
      url: app.glob.Baseurl+'/movie/'+id+'.json',
      method:"GET",
      success:function(res){
        console.log(res);
      }
    })
    this.setData({
      id: id
    })
  },
})