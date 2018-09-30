// pages/editUserInfo/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
const { ajax, util, common, apiUrl, gets } = getApp()

Page(Object.assign({}, common, apiUrl, gets, {

  /**
   * 页面的初始数据
   */
  data: {
    is_first_edit: 1,
    
    genderTheme: {},
    genderArr: [{
        name: '1',
        value: '男'
      },
      {
        name: '2',
        value: '女'
      },
    ],
    
    birthday: {
      value: '请选择出生日期',
      selected: false,
      valid: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      is_first_edit:parseInt(options.is_first_edit),
      // gender: app.globalData.gender,
      genderTheme: app.globalData.genderTheme[app.globalData.gender - 1]
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
    var genderArr = this.data.genderArr
    
    
      gets.userInfo().then(res => {
        if (this.data.img) {
          var avatar = this.data.img
        } else {
          var avatar = res.headimg
        }
        console.log(genderArr)
        var index = parseInt(res.sex) - 1
        genderArr[index]['checked'] = true
        this.setData({
          avatar: avatar,
          nickname: res.nickname,
          genderArr: genderArr,
          birthday: {
            value: res.birth,
          },
          tel: res.tel,
          gender: res.sex,
          date: res.birth,
          address: res.address,
            genderTheme: app.globalData.genderTheme[res.sex - 1]
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.data.genderTheme.main,
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
        console.log(this.data.birthday.value)
      })
  },

  // 昵称
  name:function(e){
    this.setData({
      nickname: e.detail.value
    })
  },

  // 性别
  radioChange:function(e){
    console.log(e.detail.value)
    this.setData({
      genderTheme: app.globalData.genderTheme[e.detail.value-1]
    })
    app.globalData.gender = e.detail.value
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.genderTheme.main,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      gender: e.detail.value
    })
  },

  // 出生日期
  bindBirthdayChange: function(e) {
    this.setData({
      date: e.detail.value,
      birthday: {
        value: e.detail.value,
        selected: true,
        valid: true
      }
    })
  },

  // 手机号码
  phone:function(e){
    console.log(e.detail.value)
    this.setData({
      tel: e.detail.value,
    })
  },

  // 邮寄地址
  address:function(e){
    console.log(e.detail.value)
    this.setData({
      address: e.detail.value,

    })
  },
  saveChange:function(){
    // if(this.data.is_first_edit==1){
    //   wx.navigateTo({
    //     url: '/pages/user/index',
    //   })
    // }
    // else{
    //   wx.navigateBack({
    //     delta:1
    //   })
    // }

    var nickname = this.data.nickname

    var sex = this.data.gender

    var birth = this.data.date

    var tel = this.data.tel

    var address = this.data.address

    if(!nickname){
      wx.showModal({
        title: '提示',
        content: '请输入昵称',
        showCancel:false
      })

      return false
    }



    if(!sex){

      wx.showModal({
        title: '提示',
        content: '请输入性别',
        showCancel: false
      })

      return false

    }


    if (!birth) {

      wx.showModal({
        title: '提示',
        content: '请输入出生日期',
        showCancel: false
      })

      return false

    }

    if (!tel) {

      wx.showModal({
        title: '提示',
        content: '请输入联系方式',
        showCancel: false
      })

      return false

    }
    if (tel.length>11) {

      wx.showModal({
        title: '提示',
        content: '请输入正确联系方式',
        showCancel: false
      })

      return false

    }


    if (!address) {

      wx.showModal({
        title: '提示',
        content: '请输入邮寄地址',
        showCancel: false
      })

      return false

    }


    var param = {
      nickname: nickname,
      sex:sex,
      birth:birth,
      tel:tel,
      address:address,
      headimg: this.data.avatar
    }

    console.log(this.data.avatar)

    ajax.saveUser(param).then(res=>{
      if(res.id){
        wx.switchTab({
          url: '/pages/user/index',
        })
      }
      
    })
  },
  dropChange:function(){
    if (this.data.is_first_edit==1) {
      wx.navigateTo({
        url: '/pages/user/index',
      })
    }
    else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  // 上传图片
  upload: function () {
    wx.setStorageSync('img', '1')
    
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
         
            wx.uploadFile({
              url: `${app.apiUrl.apiUrl}forum/upload`,
              filePath: res.tempFilePaths[0],
              // header: {
              //   'X-Token-With': token,
              //   'Authorization': `Miinno ${wx.getStorageSync('access_token')}`
              // },
              name: 'file',
              formData: {
                type: 2,
              },
              success: (res) => {
                // console.log();
                
                this.setData({
                  avatar: JSON.parse(res.data),
                  img: JSON.parse(res.data),
                })

                
              },
              fail: function (res) {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 1200
                })
              }
            })
         
        }
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))