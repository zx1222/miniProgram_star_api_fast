// components/commentPList/commentPList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        comment_list: {
              type: 'Array',
              value: []
        },
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_report:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    report:function(){
      this.setData({
        is_report:true
      })
      const data=this.data.is_report
      console.log(data)
      this.triggerEvent('report', data, {
        bubbles: false
      });
    },
    turnToView: function () {
      wx.navigateTo({
        url: '/pages/commentView/index',
      })
    }
  }
  
})
