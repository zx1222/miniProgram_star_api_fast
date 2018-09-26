// pages/myCollection/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate1,
  formatDate2
} from '../../utils/formatDate.js'
const { ajax, util, common, apiUrl, gets} = getApp()

Page(Object.assign({}, common, apiUrl, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['视频', '文章'],
    tabCurrent: 0,
    gender: 2,
    genderTheme: {},
    mediaType: ['直播', '动画', 'PV', 'MV', '短视频', '事件'],
    idol_index: 2,
    idolTheme: [],
    current_page:1,
    count_page:1,
    isLoading: false
    
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
    this.getData(1)
  },

  getData:function(types){
    var param = {
      page: 1,
      type: types
    }

    gets.myFavorite(param).then(res => {
      this.setData({
        list: res.items
      })

      if (parseInt(this.data.current_page) >= parseInt(this.data.count_page)) {
        this.setData({
          isLoading: true,
        })
      }

    })
  },
  tapIndicator(e) {
    this.setData({
      tabCurrent: e.target.dataset.index,
      page:1,
      list:[]
    });
    const data = parseInt(this.data.tabCurrent)  
    this.getData(data+1)
  },
  
  turnToViewVideo: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/videoVIew/index?id=${id}&from=${1}`,
    })
  },
  turnToViewNews: function (e) {

    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/newsView/index?id=${id}`,
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

  onReachBottom: function () {
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
      type: parseInt(this.data.tabCurrent)+1  ,
      page: ++this.data.current_page

    }
    var that = this
    gets.myFavorite(params).then(res => {
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