// components/searchForm/searchForm.js
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            bg: {
                  type: 'string',
                  value: ''
            }
      },

      /**
       * 组件的初始数据
       */
      data: {
            searchQuery: ''
      },

      /**
       * 组件的方法列表
       */
      methods: {
            bindKeyInput: function (e) {
                  this.setData({
                        searchQuery: e.detail.value
                  })
            },
            submit: function() {
                  this.triggerEvent('search', this.data.searchQuery, {
                        bubbles: false
                  });
                  if(this.data.searchQuery!=''){
                    wx.navigateTo({
                      url: '/pages/searchResult/index',
                    })
                  }
            },
      }
})