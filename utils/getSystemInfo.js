export default function getSystemInfo(){
      return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                  success: function(res) {
                    console.log(res)
                       resolve(res)
                  },
            })
      })
}