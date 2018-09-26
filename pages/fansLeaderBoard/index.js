// pages/fansLeaderBoard/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    idolTheme: [],
    idol_index: 0,
    idol_list:[],
    list: [{
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895',

      },
      {
        gender: 2,
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279652966,1587444762&fm=26&gp=0.jpg',
        name: 'miss',
        point: '64895'
      },
      {
        gender: 2,
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279652966,1587444762&fm=26&gp=0.jpg',
        name: 'miss',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      }, {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      }, {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
      {
        gender: 1,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
        name: 'mr',
        point: '64895'
      },
     ],
    myRankings: {
      gender: 1,
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537787707649&di=89c23d2228ed35ccda59d23ceedf0a2e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F30%2F20140730012845_tiG3J.thumb.700_0.png',
      name: 'xin',
      point: '64895',
      level: 100
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme,
      idol_index: app.globalData.idol_index,
      idolTheme:app.globalData.idolTheme,
      idol_list:app.globalData.idol_list
    })
      wx.setNavigationBarTitle({
        title: `${this.data.idol_list[this.data.idol_index].short_name}粉丝贡献榜`//页面标题为路由参数
    })
    console.log(this.data.idolTheme)
    console.log(app.globalData.idol_index)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.idolTheme[this.data.idol_index].main,
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