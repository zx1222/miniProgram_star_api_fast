// pages/userForum/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate4,

} from '../../utils/formatDate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['主贴', '回帖'],
    tabCurrent: 1,
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],

    list: [{
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我回复的内容',
        forum_title: '这是原贴的标题',
        comment_count: 100,
        like_count: 100,
        is_delete: 2
      },
      {
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我回复的内容',
        forum_title: '这是原贴的标题',
        comment_count: 100,
        like_count: 100,
        is_delete: 2
      }
    ]
    // list:[
    //   {

    //   }
    // ]

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme,
      list: this.formatlist(this.data.list)
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.genderTheme.main,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
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

  },
  tapIndicator(e) {
    this.setData({
      tabCurrent: e.target.dataset.index
    });
    const data = this.data.tabCurrent
    if (this.data.tabCurrent == 0) {

    }
    if (this.data.tabCurrent == 1) {
      const list = [{
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我回复的内容',
        forum_title: '这是原贴的标题',
        comment_count: 100,
        like_count: 100,
        is_delete: 2
      },
      {
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我回复的内容',
        forum_title: '这是原贴的标题',
        comment_count: 100,
        like_count: 100,
        is_delete: 2
      }
      ]
        this.setData({
          list: this.formatlist(list)
        })
    }
  },
  formatlist: function(list) {
    const data = list
    data.forEach((item) => {
      item.create_time = formatDate4(item.create_time)
    })
    return data
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})