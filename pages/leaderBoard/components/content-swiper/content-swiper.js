// pages/user/component/topic-swiper/topic-swiper.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    indicatorArr: {
      type: 'Array',
      value: [],
    },
    color: {
      type: 'string',
      value: '',
    },
    idol_id: {
      type: 'number',
      value: '',
    },
    swiperCurrent:{
      type: 'number',
      value: '',
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tapIndicator(e) {
      this.setData({
        'swiperCurrent': e.target.dataset.index
      });
      const data = this.data.swiperCurrent
      this.triggerEvent('childEvent', data, {
        bubbles: false
      });
    },
    _swipreChange(e) {
      if (e.detail.source === "touch") {
        this.setData({
          'swiperCurrent': e.detail.current
        });
        // 传值给父组件
        const data = this.data.swiperCurrent
        this.triggerEvent('childEvent', data, {
          bubbles: false
        });
      }
    },
  }
})