// components/searchResult/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate1,
  formatDate2
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
    gender: 2,
    genderTheme: {},
    mediaType: ['直播', '动画', 'PV', 'MV', '短视频', '事件'],
    // list 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,
    isLoading: false,
    current_page: 1,
    count_page: 1,
    search: true,
    fail: false,
    text: '',
    history: [],
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      userinfo:app.globalData.userinfo
      // list: this.formatlist(this.data.list)
      // text: options.text,
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

  // 去详情
  turnToViewVideo: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/videoView/index?id=${id}&&from=1`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onShow: function() {
    // this.search();
    var history = wx.getStorageSync('history')
    if (history) {
      this.setData({
        history: history
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */

  search: function() {
    var params = {
      keywords: this.data.text,
      page: 1
    }
    if(this.data.text!=''){
      gets.getIndex(params).then(res => {
        var history = this.data.history
        console.log(params.keywords)
        console.log(history.indexOf(params.keywords))
        if (history.indexOf(params.keywords) == -1) {
          history.unshift(this.data.text)
          console.log('aa')
        }
        else{
         const index= history.indexOf(params.keywords)
          history.splice(index, 1); 
          history.unshift(this.data.text)
        }
        if (history.length > 10) {
          history.shift()
        }
        this.setData({
          list: res.items,
          current_page: res._meta.currentPage,
          count_page: res._meta.pageCount,
          history: history
        })
        wx.setStorageSync('history', this.data.history)
        if (res.items.length == 0) {
          this.setData({
            fail: true,
            search: false
          })
        } else {
          this.setData({
            search: false,
            fail: false
          })
        }
        if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
          this.setData({
            isLoading: true,
          })
        }
        console.log(this.data.history)
      })
    }
  },
  searchHistory:function(e){
    this.setData({
      text: e.currentTarget.dataset.query,
    })
    var params = {
      keywords: e.currentTarget.dataset.query,
      page: 1
    }

    gets.getIndex(params).then(res => {
      var history = this.data.history
      if (history.indexOf(params.keywords)==-1){
        history.unshift(this.data.text)
      }
      else {
        const index = history.indexOf(params.keywords)
        history.splice(index, 1);
        history.unshift(params.keywords)
      }
      if (history.length > 10) {
        history.shift()
      }
      console.log(res)
      this.setData({
        list: res.items,
        current_page: res._meta.currentPage,
        count_page: res._meta.pageCount,
        history: history
      })

      wx.setStorageSync('history', this.data.history)

      if (res.items.length == 0) {
        this.setData({
          fail: true,
          search: false
        })
      } else {
        this.setData({
          search: false,
          fail: false
        })
      }

      if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
        this.setData({
          isLoading: true,
        })
      }
      console.log(this.data.history)


    })
  },

  submit: function() {
    this.search()
  },

  clear: function() {
    wx.clearStorageSync('history')
    this.setData({
      search: false
    })
  },

  bindKeyInput: function(e) {
    console.log(e)
    if (e.detail.value!=''){
      this.setData({
        text: e.detail.value
      })
    }
    else{
      this.setData({
        search:true
      })
    }
  
    console.log(this.data.text)
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
      text: this.data.text,
      page: ++this.data.current_page

    }
    var that = this
    ajax.getIndex(params).then(res => {
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
  onPullDownRefresh: function() {
    // this.myRecordingA(1, answerUrl);
    wx.stopPullDownRefresh();

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))