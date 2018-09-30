// pages/userForum/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate4,

} from '../../utils/formatDate.js'
const {
  ajax,
  util,
  common,
  gets
} = getApp()

Page(Object.assign({}, common, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['主帖', '回帖'],
    tabCurrent: 0,
    gender: 2,
    genderTheme: {},
    idol_index: 2,
    idolTheme: [],
    isLoading: false,
    current_page: 1,
    count_page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idolTheme: app.globalData.idolTheme,
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
    gets.userforums().then(res => {
      this.setData({
        list: res
      })
    })
  },

  // 主贴详情
  todetail: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/forumView/index?id=${id}`,
    })
  },

  // 点赞
  praise: function(e) {
    var status = e.currentTarget.dataset.status
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    var param = {
      type: type,
      id: id,
      status: status
    }
    ajax.praise(param).then(res => {
      console.log(res)
      this.onShow()
    })
  },

  // 删除
  delete: function(e) {
    const params = {
      id: e.currentTarget.dataset.id
    }
    wx.showModal({
      title: '提示',
      content: '确认删除回贴子',
      success: res=> {
        if (res.confirm) {
          ajax.deleteReply(params).then(res => {
            wx.showToast({
              title: '删除成功',
            })
            this.getReply();
          })
        } else if (res.cancel) {}
      }
    })

  },

  tapIndicator(e) {
    this.setData({
      tabCurrent: e.target.dataset.index
    });
    const data = this.data.tabCurrent
    if (this.data.tabCurrent == 0) {
      gets.userforums().then(res => {
        this.setData({
          list: res
        })
      })
    }
    if (this.data.tabCurrent == 1) {
      this.getReply();
    }
  },
  getReply: function() {
    var param = {
      page: 1
    }
    ajax.replyList(param).then(res => {
      this.setData({
        list: res.items
      })

      if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
        this.setData({
          isLoading: true,
        })
      }
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
    console.log(this.data.isLoading)
    if (this.data.isLoading) {
      return;
    }
    this.data.isLoading = true;
    if (this.data.count_page < this.data.current_page) return;
    this.setData({
      isLoading: true
    })

    var params = {
      page: ++this.data.current_page

    }
    var that = this
    ajax.replyList(params).then(res => {
      console.log(res)
      that.setData({
        list: that.data.list.concat(res.items),
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
      })

      console.log(parseInt(that.data.current_page))
      console.log(parseInt(that.data.count_page))
      if (parseInt(that.data.current_page) >= parseInt(that.data.count_page)) {
        that.setData({
          isLoading: true,
        })
      }

      console.log(this.data.isLoading)
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))