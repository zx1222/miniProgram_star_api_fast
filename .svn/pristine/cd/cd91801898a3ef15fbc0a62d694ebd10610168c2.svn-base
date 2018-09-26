// components/forum/forum.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    idolTheme: {
      type: 'Object',
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgArr: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=876354855,381830917&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279652966,1587444762&fm=26&gp=0.jpg']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    post: function() {
      const data = false
      console.log(data)
      this.triggerEvent('submitForum', data, {
        bubbles: false
      });
    },
    close:function(){
      const data = false
      console.log(data)
      this.triggerEvent('closeForum', data, {
        bubbles: false
      });
    }
  }
})