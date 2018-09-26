// components/popup/popup.js
const app = getApp()
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            is_toast: {
                  type: 'boolean',
                  value: false
            },
            is_delete: {
                  type: 'boolean',
                  value: false
            },
            gender: {
                  type: 'number',
                  value: 1
            },
            title: {
                  type: 'string',
                  value: ''
            },
            content: {
                  type: 'string',
                  value: ''
            },
      },

      /**
       * 组件的初始数据
       */
      data: {
            genderTheme: app.globalData.genderTheme
      },

      /**
       * 组件的方法列表
       */
      methods: {
            cancel: function() {
                  var myEventDetail = {} // detail对象，提供给事件监听函数
                  var myEventOption = {} // 触发事件的选项
                  this.triggerEvent('cancel', myEventDetail, myEventOption)
            },
            confirm: function() {
                  var myEventDetail = {} // detail对象，提供给事件监听函数
                  var myEventOption = {} // 触发事件的选项
                  this.triggerEvent('confirm', myEventDetail, myEventOption)
            }
      }
})