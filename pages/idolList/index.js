// pages/idolList/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'

const {
  ajax,
  util,
  common,
  apiUrl,
  gets
} = getApp()

Page(Object.assign({}, common, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    gender: 1,
    genderTheme: {},
    tab_id: 1,
    idol_index: 2,
    idolTheme: [],
    list: [],
    is_show: false,
    is_followcancel_show: false,
    toast_title: '浏览视频成功',
    toast_content: '你为清歌增加了10点人气值',
    is_toast_show: true,
    isLoading: true,
    iphone_type: '',
    poster_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      iphone_type: app.globalData.iphone_type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme
    })
    console.log(this.data.genderTheme)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.genderTheme.main,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  getData: function() {
    gets.getIdolList('').then(res => {
      this.setData({
        list: res
      })
      this.setData({
        isLoading: false
      })
      app.globalData.idol_list = res
    })
  },
  follow: function(e) {
    const params = {
      idol_id: parseInt(e.currentTarget.dataset.id),
    }
    const idol_index = parseInt(e.currentTarget.dataset.id) - 1;
    const idol_list = this.data.list;
    idol_list[idol_index].isattention = 1
    gets.follow(params).then(res => {
      this.getData();
      app.globalData.idol_index = idol_index
      this.setData({
        idol_index: idol_index,
        list: idol_list,
        is_show: true,
        poster_info: res
      })
      wx.getSetting({
        success: (res) => {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              this.downloadFile()
            },
            fail: function () {
              wx.openSetting({
                success: (res) => {
                  if (!res.authSetting["scope.writePhotosAlbum"] || !res.authSetting["scope.writePhotosAlbum"]) { }
                }
              })
            }
          })
        }
      })　　
    })
  },
  followCancel: function(e) {
    this.setData({
      idol_index: parseInt(e.currentTarget.dataset.id) - 1,
      is_followcancel_show: true
    })
  },
  downloadFile: function () {
    var imgUrl = this.data.poster_info.poster;
    //图片地址
    wx.downloadFile({
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          //返回的临时文件路径，下载后的文件会存储到一个临时文件
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '成功保存图片',
            })
          }
        })
      }
    })
  },
  turnToSupport: function() {
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  turnToView: function(e) {
    const index = parseInt(e.currentTarget.dataset.id) - 1
    console.log()
    app.globalData.idol_index = index
    wx.navigateTo({
      url: `/pages/idolView/index?index=${index}`,
    })
  },
  closePopup: function() {
    this.setData({
      is_show: false
    })
  },
  openPopup: function() {
    this.setData({
      is_show: true
    })
  },
  catchCancel: function(e) {
    this.setData({
      is_followcancel_show: false
    })
  },
  catchConfirm: function(e) {
    const params = {
      idol_id: this.data.idol_index + 1
    }
    const idol_index = this.data.idol_index;
    const idol_list = this.data.list;
    console.log(idol_list)
    idol_list[idol_index].isattention = 2
    gets.followCancel(params).then(res => {
      this.setData({
        is_followcancel_show: false,
        list: idol_list
      })
      this.getData();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))