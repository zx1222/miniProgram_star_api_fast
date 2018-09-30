// pages/editForum/index.js
const app = getApp()
const {
  ajax,
  util,
  common,
  apiUrl,
  gets
} = getApp()

Page(Object.assign({}, common, {

  /**
   * 页面的初始数据
   */
  data: {
    idolTheme: [],
    idol_index: 0,
    pic_path_arr: [],
    pictures: [],
    title: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      idol_index: app.globalData.idol_index,
      idolTheme: app.globalData.idolTheme,
    })
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
  bindTitleInput: function(e) {
    console.log(e)
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },
  bindContentInput: function(e) {
    this.setData({
      content: e.detail.value
    })
    console.log(this.data.title)
  },

  upload: function() {
    if (this.data.pic_path_arr.length >= 9) {
      wx.showModal({
        title: '提示',
        content: '最多上传九张图片',
        success: function(res) {
          if (res.confirm) {

          } else if (res.cancel) {}
        }
      })
    } else {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const resData = res.tempFilePaths;
          resData.forEach((item) => {
            const src = item
            let data = this.data.pic_path_arr
            data.push(src)
            this.setData({
              pic_path_arr: data
            })
            wx.uploadFile({
              url: `${app.apiUrl.apiUrl}forum/upload`,
              filePath: src,
              // header: {
              //   'X-Token-With': token,
              //   'Authorization': `Miinno ${wx.getStorageSync('access_token')}`
              // },
              name: 'file',
              formData: {
                type: 1,
              },
              success: (res) => {
                console.log(JSON.parse(res.data));
                const data = this.data.pictures
                data.push(JSON.parse(res.data))
                this.setData({
                  pictures: data
                })
              },
              fail: function(res) {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 1200
                })
              }
            })
          })
        }
      })
    }
  },
  delete: function(e) {
    const index = e.currentTarget.dataset.index;
    const pic_path_arr = this.data.pic_path_arr
    pic_path_arr.splice(index, 1);
    this.setData({
      pic_path_arr: pic_path_arr
    })
  },

  submit: function() {
    let type
    if (this.data.pic_path_arr.length == 0) {
      type = 1
    } else {
      type = 2
    }
    const params = {
      type: type,
      idol_id: '1',
      title: this.data.title,
      content: this.data.content,
      picture: this.data.pictures
    }
    if (params.type == 1 && params.content == '') {
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        success: function(res) {
          if (res.confirm) {

          } else if (res.cancel) {}
        }
      })
    }

    ajax.createForum(params).then(res => {
      wx.showToast({
        title: '发布成功',
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1300)
    })
  },
  cancel: function() {
    wx.navigateBack({
      delta: 1
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))