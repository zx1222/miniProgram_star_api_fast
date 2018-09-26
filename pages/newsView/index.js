// pages/newsView/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate2,
  formatDate3
} from '../../utils/formatDate.js'
const { ajax, util, common, apiUrl,gets } = getApp()

Page(Object.assign({}, common, apiUrl, gets,{


  /**
   * 页面的初始数据
   */
  data: {
    gender: 2,
    genderTheme: {},
    // 是否获得焦点
    is_focus: false,
    // 分页
    loading: true,
    noData: false,
    currentPage: 1,
    pageSize: 10,

    banners: ['../../images/banner.jpg'],
    imgheights: [],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    //图片宽度 
    imgwidth: 750,
    
    is_report: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    
    // let comment_list = this.data.comment_list;

    this.setData({
      gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1],
      // comment_list: this.formatCommentData(this.data.comment_list),
      id: options.id
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
  // formatCommentData: function(data) {
  //   let list = data;
  //   list.forEach((item) => {
  //     item.create_time = formatDate3(item.create_time)
  //     // item.child_comment_list.forEach((item)=>{
  //     //       item.create_time = formatDate3(item.create_time)
  //     // })
  //   })
  //   return list
  // },
  focusChange: function() {
    this.setData({
      is_focus: true
    })
  },
  blurChange: function() {
    this.setData({
      is_focus: false
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var that = this
    // wx.request({
    //   url: apiUrl.mediaDetail, //仅为示例，并非真实的接口地址
    //   data: {
    //     id: this.data.id,
    //   },
    //   method: 'GET',
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

    var param = {
      id: 10,
    }

    gets.mediaDetail(param).then(res => {
      console.log(res)
      this.setData({
        detail: res
      })

    })

    gets.comment(param).then(result => {
      console.log(result)
      this.setData({
        comment: result.items,
        current_page: result._meta.currentPage,
        count_page: result._meta.pageCount,
      })

      if (parseInt(this.data.current_page) > parseInt(this.data.count_page)) {
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
  imageLoad: function(e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
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
      page: ++this.data.current_page,
      id:this.data.id

    }
    var that = this
    gets.comment(params).then(res => {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))