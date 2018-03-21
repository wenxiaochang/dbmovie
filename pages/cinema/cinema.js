// pages/cinema/cinema.js
const app = getApp();
const bmap = require("../../utils/bmap-wx.js");
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas: {},
    rgcData: {},
    latitude: '',
    longitude: '', 
    markers:[],
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 
     * 获取影院 API
     * 猫眼的服务器会根据你的ip段加载出你本地的影院
    */
    var _this = this;
    /**
     * 百度地图定位
    */
    var BMap = new bmap.BMapWX({
      ak: 'tpMSBGFIQegvCIAGoGHul6TimPIdOg6m'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      // console.log(wxMarkerData);
      _this.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
    wx.request({
      url: app.glob.Baseurl + '/cinemas.json',
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            cinemas: res.data.data
          })
        } else {
          // console.log('数据接口异常')
          wx.showModal({
            title: '错误',
            content: '数据接口异常',
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '周边影院',
    })
  }
})