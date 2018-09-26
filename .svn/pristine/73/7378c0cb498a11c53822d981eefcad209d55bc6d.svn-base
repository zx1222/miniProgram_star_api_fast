// pages/idolList/index.js
const app = getApp()
import {
      wxRequest
} from '../../utils/promise.js'
Page({

      /**
       * 页面的初始数据
       */
      data: {
            gender: 1,
            genderTheme: {},
            tab_id: 1,
            idol_index: 2,
            idolTheme: [],
            list: [{
                        index: 0,
                        avatar: '../../images/idol-avatar1.png',
                        fans: 100,
                        name: '卡缇娅',
                        desc: '除了祖国的命令，\n只有游戏才能让她动起来的萝莉',
                        is_follow: 2,
                        name: '卡缇娅·乌拉诺娃',
                  },
                  {
                        index: 1,
                        avatar: '../../images/idol-avatar2.png',
                        fans: 100,
                        name: '罗兹',
                        desc: '认真努力的摇滚少女',
                        is_follow: 2
                  },
                  {
                        index: 2,
                        avatar: '../../images/idol-avatar3.png',
                        fans: 100,
                        name: '清歌',
                        desc: '神秘优雅的大家闺秀',
                        is_follow: 2
                  },
                  {
                        index: 3,
                        avatar: '../../images/idol-avatar4.png',
                        fans: 100,
                        name: '伊莎贝拉',
                        desc: '青春活泼的超级乐天派',
                        is_follow: 1
                  },
                  {
                        index: 4,
                        avatar: '../../images/idol-avatar5.png',
                        fans: 100,
                        name: '玉藻',
                        desc: '自称妖狐转世的中二少女',
                        is_follow: 1
                  }
            ],
            is_show: false,
        is_unfollow_show:false,
            toast_title: '浏览视频成功',
            toast_content: '你为清歌增加了10点人气值',
            is_toast_show: true
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            this.setData({
                  gender: app.globalData.gender,
                  genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
                  idolTheme: app.globalData.idolTheme
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
            console.log(e.currentTarget.dataset.id)
            this.setData({
                  idol_index: e.currentTarget.dataset.id,
                  is_show: true
            })
      },
      unfollow:function(e){
        this.setData({
          idol_index: e.currentTarget.dataset.id,
          is_unfollow_show: true
        })
      },
      turnToSupport: function() {

      },
      turnToView: function(e) {
            const index = e.currentTarget.dataset.index
            wx.navigateTo({
                  url: `/pages/idolView/index?index=${index}`,
            })
            app.globalData.idol_index = index
      },
      closePopup: function() {
            this.setData({
                  is_show: false
            })
      },
      catchCancel: function(e) {
            console.log(e)
            this.setData({
                  is_toast_show: false
            })
      },
      catchConfirm: function(e) {
            console.log(e)
      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      }
})