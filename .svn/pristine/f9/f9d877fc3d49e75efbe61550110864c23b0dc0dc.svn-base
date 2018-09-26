export function formatDate1 (time) {
      const date = new Date(time * 1000);
      let year = date.getFullYear(),
            month = date.getMonth() + 1, //月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
      const newTime = month + '.' +
            day;
      return newTime;
}
export function formatDate2(time) {
      const date = new Date(time * 1000);
      let year = date.getFullYear(),
            month = date.getMonth() + 1, //月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
      const newTime =year+'-'+ month + '-' +
            day;
      return newTime;
}
export function formatDate3(time) {
      const date = new Date(time * 1000);
      let year = date.getFullYear(),
            month = date.getMonth() + 1, //月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
            if(min<10){
                  min='0'+min
            }
      if (sec < 10) {
            min = '0' + sec
      }
      const newTime =  month + '-' +
            day+' '+min+':'+sec;
      return newTime;
}