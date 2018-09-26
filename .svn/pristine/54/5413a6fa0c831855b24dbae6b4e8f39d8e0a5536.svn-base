// components/report/report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    genderTheme:{
      type:'Object',
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    reportReasonArr: [{
        name: '1',
        value: '广告'
      },
      {
        name: '2',
        value: '人身攻击'
      },
      {
        name: '3',
        value: '违法违规'
      },
      {
        name: '4',
        value: '其他'
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    report:function(){
    const is_report=false
      console.log(is_report)
      this.triggerEvent('reportSubmit', is_report, {
        bubbles: false
      });
    },
    cancel:function(){
      const is_report = false
      this.triggerEvent('reportCancel', is_report, {
        bubbles: false
      });
    }
  }
})