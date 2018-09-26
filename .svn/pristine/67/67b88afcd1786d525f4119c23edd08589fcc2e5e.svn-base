// pages/idolView/index.js
const app = getApp()
import {
  wxRequest
} from '../../utils/promise.js'
import {
  formatDate1,
  formatDate2
} from '../../utils/formatDate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ['自我介绍', '动态', '后援会'],
    tabCurrent: 0,
    // 动态tab
    indicatorArr: ['直播', '动画', 'PV', 'MV', '短视频', '事件'],
    swiperCurrent: 0,
    // 判断是首页还是歌姬详情
    p_swiper: 2,

    // 关注成功popup显示
    is_show: false,
    idolTheme: [],
    idol_index: 0,
    idolInfo: [{
        hd_desc: '除了祖国的命令，只有游戏才能让她动起来的萝莉',
        fans: 100,
        hot: 400,
        rank: 1,
        is_follow: 2,
        image: '../../images/idol1.png',
        bg: 'https://star.t.miinno.net/star_img/idol-brief-inro_bg1.png',
        country: '../../images/idol-country1.png',
        name: '卡缇娅·乌拉诺娃',
        short_name: '卡缇娅',
        birthdaty: '6月6日',
        age: '14',
        flower: '晚香玉',
        sub_desc: '外表激萌小女孩，内心痴汉偶像宅；平时三无没干劲，肝起游戏来不要命。'
      },
      {
        hd_desc: '认真努力的摇滚少女',
        fans: 100,
        hot: 400,
        rank: 1,
        is_follow: 1,
        image: '../../images/idol2.png',
        bg: 'https://star.t.miinno.net/star_img/idol-brief-inro_bg2.png',
        country: '../../images/idol-country2.png',
        name: '罗兹·巴蕾特',
        short_name: '罗兹',
        birthdaty: '4月16日',
        age: '16',
        flower: '玫瑰',
        sub_desc: '敢想敢做的摇滚女孩，正直的她总承担着吐槽团队中其他人奇怪行为的责任。'
      },
      {
        hd_desc: '神秘优雅的大家闺秀',
        fans: 100,
        hot: 400,
        rank: 1,
        is_follow: 2,
        image: '../../images/idol3.png',
        bg: 'https://star.t.miinno.net/star_img/idol-brief-inro_bg3.png',
        country: '../../images/idol-country3.png',
        name: '李清歌',
        short_name: '清歌',
        birthdaty: '12月22日',
        age: '15',
        flower: '茉莉',
        sub_desc: '端庄优雅的大家闺秀，平时总给人一种雾里看花的感觉，但到关键时刻却能以坚定的信念带领着大家前进。'
      },
      {
        hd_desc: '青春活泼的超级乐天派',
        fans: 100,
        hot: 400,
        rank: 1,
        is_follow: 2,
        image: '../../images/idol4.png',
        bg: 'https://star.t.miinno.net/star_img/idol-brief-inro_bg4.png',
        country: '../../images/idol-country4.png',
        name: '伊莎贝拉·霍利',
        short_name: '伊莎贝拉',
        birthdaty: '7月17',
        age: '16',
        flower: '向日葵',
        sub_desc: '活泼可爱的美国女孩，平时虽然大大咧咧，但却非常会照顾人，跟她在一起总有种安心的感觉。'
      },
      {
        hd_desc: '自称妖狐转世的中二少女',
        fans: 100,
        hot: 400,
        rank: 1,
        is_follow: 2,
        image: '../../images/idol5.png',
        bg: 'https://star.t.miinno.net/star_img/idol-brief-inro_bg5.png',
        country: '../../images/idol-country5.png',
        name: '神宫司玉藻',
        short_name: '玉藻',
        birthdaty: '11月11日',
        age: '15',
        flower: '樱花',
        sub_desc: '自称是狐神转世的妹子，外表看起来端庄乖巧，但不知道为啥一开口就让人有一种“这是中二病吧？”的感觉。'
      }
    ],

    // 动态变量
    resultData: {},
    loading: false,
    tab_top_id: 0,
    list: [{
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      },
      {
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        tag: '直播',
        date: 1537088018
      }
    ],

    // 后援会
    // 规则 显示与否
    is_rules_show: false,
    forum_list: [{
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        content: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦!!!',
        like_count: 100,
        comment_count: 20,
        create_time: '25天前',
        cover: '../../images/video-poster-default.png'
      },
      {
        id: 1,
        user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537173935576&di=1a4d9cfa47850ba062b0e622f9bd5d75&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201607%2F13%2F20160713114847_KcAJz.jpeg',
        user_name: '小丸子',
        content: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦!!!',
        like_count: 100,
        comment_count: 20,
        create_time: '25天前',
        cover: '../../images/video-poster-default.png'
      },
    ],
    // 发布类型与否
    is_post_show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      idol_index: options.index,
      idolTheme: app.globalData.idolTheme,
      list: this.formatlist1(this.data.list)
    })
    console.log()
    wx.setNavigationBarTitle({
      title: this.data.idolInfo[this.data.idol_index].name,
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
  //       onPullDownRefresh: function() {
  //             console.log(this.data.tabCurrent)
  // if(this.data.tabCurrent!=1){
  //       wx.stopPullDownRefresh()
  // }
  //       },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  getDataList: function() {
    if (this.data.tab_top_id == 0) {
      this.setData({
        resultData: {
          banners: [
            '../../images/banner.jpg',
            '../../images/banner.jpg',
            '../../images/banner.jpg',
          ]
        }
      })
    }
  },
  tapIndicator(e) {
    this.setData({
      'tabCurrent': e.target.dataset.index
    });
    const data = this.data.tabCurrent
    this.triggerEvent('childEvent', data, {
      bubbles: false
    });
    this.getDataList();
  },
  catchChildSwiper: function(e) {
    this.setData({
      tab_top_id: e.detail
    })
    console.log(this.data.tab_top_id)
    if (this.data.tab_top_id == 0) {
      this.setData({
        resultData: {
          banners: ['../../images/banner.jpg',
            '../../images/banner.jpg',
            '../../images/banner.jpg',
          ]
        }
      })
    }
    if (this.data.tab_top_id == 1) {
      this.setData({
        resultData: {
          banners: ['../../images/banner.jpg',
            '../../images/banner.jpg',
            '../../images/banner.jpg',
          ]
        }
      })
    }

    if (this.data.tab_top_id == 6) {
      const data = [{
        poster: '../../images/video-poster-default.png',
        title: '卡缇娅视频',
        comment_count: 77,
        date: 1537088018
      }]
      this.setData({
        list: this.formatlist2(data)
      })
      console.log(this.data.list)
    }
  },
  formatlist1: function(list) {
    const data = list
    data.forEach((item) => {
      item.date = formatDate1(item.date)
    })
    return data
  },
  formatlist2: function(list) {
    const data = list
    data.forEach((item) => {
      item.date = formatDate2(item.date)
    })
    return data
  },
  follow: function() {
    let idolInfo = this.data.idolInfo
    idolInfo[this.data.idol_index].is_follow = 1
    console.log(idolInfo)
    this.setData({
      is_show: true,
    })
    setTimeout(() => {
      this.setData({
        idolInfo: idolInfo
      })
    }, 300)
  },
  closePopup: function() {
    this.setData({
      is_show: false,
      is_rules_show: false,
      is_post_show: false
    })
  },
  turnToSupport: function() {
    wx.navigateTo({
      url: '/pages/task/index',
    })
  },
  // 选择发布类型
  choosePostType: function() {
    this.setData({
      is_post_show: true
    })
  },
  catchForumSubmit: function(e) {
    console.log(e.detail)
    this.setData({
      is_post_show: e.detail
    })
  },
  catchForumClose: function(e) {
    console.log(e.detail)
    this.setData({
      is_post_show: e.detail
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})