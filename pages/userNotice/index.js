// pages/userNotice/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate3,
} from '../../utils/formatDate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['回复', '消息'],
    tabCurrent: 0,
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
        reply_content: '这是我收到的评论内容'
      },
      {
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我收到的评论内容'
      },
      {
        user: {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
          name: 'zx'
        },
        create_time: '1537088018',
        reply_content: '这是我收到的评论内容'
      }
    ]
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
    if (this.data.tabCurrent == 0) {
      const data = [{
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '这是我收到的评论内容'
        },
        {
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '这是我收到的评论内容'
        },
        {
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '这是我收到的评论内容'
        }
      ]
      this.setData({
        list: this.formatlist(data)
      })

    }
    if (this.data.tabCurrent == 1) {
      const data = [{
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '恭喜你获得了参与抽奖的机会，请填写完整个人信息，以便给你邮寄礼品哦！'
        },
        {
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '恭喜你获得了参与抽奖的机会，请填写完整个人信息，以便给你邮寄礼品哦！'
        },
        {
          user: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
            name: 'zx'
          },
          create_time: '1537088018',
          reply_content: '恭喜你获得了参与抽奖的机会，请填写完整个人信息，以便给你邮寄礼品哦！'
        }
      ]
      this.setData({
        list: this.formatlist(data)
      })
    }
  },
  formatlist: function(list) {
    const data = list
    data.forEach((item) => {
      item.create_time = formatDate3(item.create_time)
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