// pages/videoVIew/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate2,
  formatDate3
} from '../../utils/formatDate.js'

const { ajax, util, common, apiUrl, gets} = getApp()

Page(Object.assign({}, common, apiUrl, gets,{

  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    idol_index: 0,
    idolTheme: [],
    // 是否获得焦点
    is_focus: false,

    // 分页
    loading: false,
    noData: false,
    currentPage: 1,
    pageSize: 10,

    is_report: false,
    // 首页1 歌姬2
    from: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const item = this.data.item;

    console.log(options)
    if (options)
      // item.date = formatDate2(item.date)
    this.setData({
      from: options.from,
      // item: item,
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
      id: options.id
    })
    if (this.data.from == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.genderTheme.main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.idolTheme[this.data.idol_index].main,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }

  },
  catchReport: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
  },
  catchReportCancel: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
  },
  catchReportSubmit: function(e) {
    this.setData({
      is_report: e.detail
    })
    console.log(e.detail)
  },

// 发布评论
  comment:function(e){
    console.log(e)
    const data=e.detail.value

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
    var param = {
      id:this.data.id,
    }
    
    
    gets.mediaDetail(param).then(res => {
      console.log()
      this.setData({
          detail: res,
          
        })

    })

    var params = {
      id: 10,
      page:1
    }

    gets.comment(params).then(result => {
      console.log(result)
      this.setData({
        comment: result.items,
        current_page: result._meta.currentPage,
        count_page: result._meta.pageCount,
      })
      if (parseInt(this.data.current_page) + 1 > this.data.count_page) {
        this.setData({
          isLoading: true,
        })
      }
    })
    // var that = this
    // wx.request({
    //   url: apiUrl.mediaDetail, //仅为示例，并非真实的接口地址
    //   data: {
    //     id: this.data.id,
    //   },
    //   method:'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       detail: res.data
    //     })
    //     console.log(res)
    //   }
    // })

    // console.log(ajax)
  },

  // 取消收藏
  clear:function(){
    var param = {
      id:this.data.id,
      status:2,
      type:3,
    }


    
    ajax.favorite(param).then(res =>{
      console.log('取消收藏')
      this.onShow()
    })
  },
  like: function () {
    var param = {
      id: this.data.id,
      status: 1,
      type: 3,
    }



    ajax.favorite(param).then(res => {
      console.log('收藏成功')
      this.onShow()
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
      type: this.data.type,
      page: ++this.data.current_page

    }
    var that = this
    ajax.comment(params).then(res => {
      console.log(res)
      that.setData({
        list: that.data.comment.concat(res.items),
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
  focusChange: function() {
    this.setData({
      is_focus: true
    })
    console.log(this.data.is_focus)
  },
  blurChange: function() {
    this.setData({
      is_focus: false
    })
  },
  // 获取播放进度
  catchTimeUpdate: function(e) {
    console.log(e)
  },
  // 获取播放状态改变
  catchStatusChange: function(e) {
    console.log(e)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))