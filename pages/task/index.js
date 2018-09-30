// pages/task/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
const {
  gets,
  ajax,
  util,
  common
} = getApp()

Page(Object.assign({}, common, gets, {
  /**
   * 页面的初始数据
   */
  data: {
    is_sign_unFollow_show: false,
    is_unFollow_show: false,
    is_sign_success: false,
    gender: 1,
    genderTheme: {},
    idolTheme: {},
    idol_index: 0,
    idol_info: [],
    task_list: [{
        task_id: '1',
        task_name: '签到',
        is_ing: 1,
        is_complete: false,
        point: [5],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '浏览视频',
        is_ing: 1,
        is_complete: false,
        point: [10],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '点赞视频',
        is_ing: 1,
        is_complete: false,
        point: [10],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '评论视频',
        is_ing: 1,
        is_complete: false,
        point: [15],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '编辑文字分享视频',
        is_ing: 1,
        is_complete: false,
        point: [15],
        has_step: true
      },
      {
        task_id: '1',
        task_name: '发布二次创作作品',
        is_ing: 1,
        is_complete: false,
        point: [100],
        has_step: false
      },
      {
        task_id: '1',
        task_name: '被官方推荐发布的作品',
        is_ing: 1,
        is_complete: false,
        point: [50, 500],
        has_step: false,
        sign_yet:false
      },
      // {
      //   task_id: '1',
      //   task_name: '购买商品',
      //   is_ing: 1,
      //   is_complete: false,
      //   point: [],
      //   point_content: '1RMB=1.5'
      // }
    ],
    is_rules_show: false,
    is_show: false,
    idol_info: {},
    is_followcancel_show: false,
    poster_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      idolTheme: app.globalData.idolTheme,
      idol_index: parseInt(app.globalData.idol_index),
      idol_info: app.globalData.idol_list,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
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
    this.getIdolInfo()
    this.isSign()
  },
  downloadFile: function() {
    var imgUrl = this.data.poster_info.poster;
    //图片地址
    wx.downloadFile({
      url: imgUrl,
      success: function(res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          //返回的临时文件路径，下载后的文件会存储到一个临时文件
          filePath: res.tempFilePath,
          success: function(res) {
            wx.showToast({
              title: '成功保存图片',
            })
          }
        })
      }
    })
  },
  // 获取歌姬信息
  getIdolInfo: function() {
    const params = {
      idol_id: this.data.idol_index + 1
    }
    gets.getIdolInfo(params).then(res => {
      console.log(res)
      this.setData({
        idol_info: res
      })
      wx.setNavigationBarTitle({
        title: res.fullname
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.idolTheme[this.data.idol_index].main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    })
  },
  sign: function() {
    console.log(this.data.user_info)
    if (this.data.idol_info.is_attention == 2) {
      this.setData({
        is_sign_unFollow_show: true
      })
    } else {
      const params={
        idol_id: this.data.idol_index+1
      }
      gets.sign(params).then(res=>{
        console.log(res)
        this.setData({
          is_sign_success:true,
          sign_yet:true
        })
        setTimeout(()=>{
          this.setData({
            is_sign_success: false
          })
        },1600)
      })
    }
  },
  isSign:function(){
    const params = {
      idol_id: this.data.idol_index + 1
    }
    gets.isSign(params).then(res => {
      console.log(res)
      if(res.code==1){
        this.setData({
          sign_yet: true
        })
      }
    })
  },
  closePopup: function () {
    this.setData({
      is_show: false
    })
  },
  openPopup: function () {
    this.setData({
      is_show: true
    })
  },
  get: function() {
    this.setData({
      is_sign_unFollow_show: false
    })
  },
  turnToMedia: function() {
    wx.navigateTo({
      url: '/pages/idolView/index?tab=1',
    })
  },
  turnToForum: function() {
    wx.navigateTo({
      url: '/pages/idolView/index?tab=2',
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  follow: function(e) {
    const params = {
      idol_id: this.data.idol_index + 1,
    }
    gets.follow(params).then(res => {
      this.setData({
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
            fail: function() {
              wx.openSetting({
                success: (res) => {
                  if (!res.authSetting["scope.writePhotosAlbum"] || !res.authSetting["scope.writePhotosAlbum"]) {}
                }
              })
            }
          })
        }
      })　
      this.getIdolInfo()
    })
  },

  followCancel: function(e) {
    this.setData({
      is_followcancel_show: true
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
    gets.followCancel(params).then(res => {
      this.setData({
        is_followcancel_show: false,
      })
      this.getIdolInfo();
    })
  },

  turnToSupport: function() {
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  getSuppportRules: function() {
    this.setData({
      is_rules_show: true
    })
  },
  closePopup: function() {
    this.setData({
      is_show: false,
      is_rules_show: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))