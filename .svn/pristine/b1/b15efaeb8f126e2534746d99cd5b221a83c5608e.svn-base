// pages/user/component/topic-list.js
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            bannerArr: {
                  type: 'Array',
                  value: []
            },
            list: {
                  type: 'Array',
                  value: []
            },
            loading: {
                  type: 'boolean',
                  value: true
            },
            tab_id: {
                  type: 'number',
                  value: 0
            },
            // 区别首页还是歌姬详情页 1 首页 2 详情
            p_swiper:{
                  type:'number',
                  value:1
            },
            idolTheme:{
                  type:'Object',
                  value:{}
            }
      },

      /**
       * 组件的初始数据
       */
      data: {
            // swiper
            banner_path: [
                  '/pages/index/index',
                  '/pages/index/index',
                  '/pages/index/index',
            ],
            indicatorDots: false,
            autoplay: true,
            interval: 2000,
            duration: 1000,
            circular: true,
            imgheights: [],
            //图片宽度 
            imgwidth: 750,
            current: 0,
            id: 1
      },

      /**
       * 组件的方法列表
       */
      methods: {
            formatBannerData: function() {

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
            formatBannerData: function(data, key) {
                  const dataArr = []
                  for (const index in data) {
                        dataArr.push(data[index][key])
                  }
                  return dataArr
            },
            turnToViewVideo: function(e) {
              const from=e.currentTarget.dataset.from
                  wx.navigateTo({
                        url: `/pages/videoView/index?${this.data.id}&&from=${from}`,
                  })
            },
            turnToViewNews: function() {
                  wx.navigateTo({
                        url: `/pages/newsView/index`,
                  })
            }
      }
})