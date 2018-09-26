//const apiUrl = 'http://192.168.1.103/palace/api/';
const apiUrl = 'http://192.168.0.189/repos/net_miinno_t_star/web/v1/';

// const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
// const appId = extConfig.appId || 'd6mBDb2J9fvT43XiKRhUu8toageH7cwS';
// const wxappId = extConfig.wxappId || 'wx4b259b7d0479afea';

export default {
  // appId: appId,

  //首页 
  getIndex: apiUrl + 'media/media',
  // 轮播图
  banner: apiUrl + 'media/banner',
  //歌姬列表
  getIdolList: apiUrl + 'idol/idollist',
  //关注歌姬
  follow: apiUrl + 'idol/attentionadd',
  //关注歌姬
  followCancel: apiUrl + 'idol/attentioncancel',
  // 首页详情
  mediaDetail: apiUrl + 'media/media-detail',
  // 评论
  comment: apiUrl + 'comment/comment-list',


// 排行榜********
// 周榜
  getWeekRankList: apiUrl + 'rank/week',
// 月榜
  getMonthRankList: apiUrl + 'rank/month',
// 年榜
  getYearRankList: apiUrl + 'rank/year',
  // 获取周榜期数
  getWeekDateRange: apiUrl + 'rank/weekcount',
  // 获取月榜期数
  getMonthDateRange: apiUrl + 'rank/monthcount',
  // 获取年榜期数
  getYearDateRange: apiUrl + 'rank/yearcount',

  // 用户中心********
  // 我的关注
  // 歌姬人气周榜
  getWeekRankList: apiUrl + 'rank/week',
  // 歌姬人气月榜
  getMonthRankList: apiUrl + 'rank/month',
  // 歌姬人气年榜
  getYearRankList: apiUrl + 'rank/year',
  // 粉丝贡献榜
  getContributionRankList: apiUrl + 'person/contribution-rank',
  // 首页详情
  mediaDetail:apiUrl + 'media/media-detail',
  // 评论
  comment: apiUrl + 'comment/comment-list',
  // 我的收藏
  myFavorite: apiUrl + 'person/favorite-list',
  // 收藏
  favorite: apiUrl + 'media/favorite',
  ment: apiUrl + 'comment/comment-list',
  // 
  // 用户中心
  // 我的关注
  getFollowList: apiUrl + 'person/idol-list',

}