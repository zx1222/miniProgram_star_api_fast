//const apiUrl = 'http://192.168.1.103/palace/api/';
// const apiUrl = 'http://192.168.0.189/repos/net_miinno_t_star/web/v1/';
const apiUrl ='https://star.t.miinno.net/v1/'
// const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
// const appId = extConfig.appId || 'd6mBDb2J9fvT43XiKRhUu8toageH7cwS';
// const wxappId = extConfig.wxappId || 'wx4b259b7d0479afea';

export default {
  apiUrl: apiUrl,
  // appId: appId,

  //首页 
  getIndex: apiUrl + 'media/media',
  // 轮播图
  banner: apiUrl + 'media/banner',
  //歌姬列表
  getIdolList: apiUrl + 'idol/idollist',

  //关注歌姬
  follow: apiUrl + 'idol/attentionadd',
  //取关歌姬
  followCancel: apiUrl + 'idol/attentioncancel',
  // 首页详情
  mediaDetail: apiUrl + 'media/media-detail',
  // 我的主贴
  getIdolForums: apiUrl + 'idol/idolforums',
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
  mediaDetail: apiUrl + 'media/media-detail',
  // 评论
  comment: apiUrl + 'comment/comment-list',
  // 回复评论
  replyComment: apiUrl +'reply/reply',
  // 发帖
  createForum: apiUrl + 'forum/post-forum',



  // 我的收藏
  myFavorite: apiUrl + 'person/favorite-list',
  // 收藏
  favorite: apiUrl + 'media/favorite',
  // 评论列表
  ment: apiUrl + 'comment/comment-list',

  // 用户中心
  // 获取性别皮肤
  getGenderSkin: apiUrl + 'person/skin',
  // 选择皮肤
  selectSkin: apiUrl + 'person/select-skin',
  // 我的关注
  getFollowList: apiUrl + 'person/idol-list',
  // 我的贡献
  getContributionList: apiUrl + 'person/contribution-list',
  // 我的回帖
  replyList: apiUrl + 'person/my-reply',
  // 点赞
  praise: apiUrl + 'praise/praise',
  // 举报
  report: apiUrl + 'report/report',
  // 发表评论
  writeComment: apiUrl + 'comment/comment',
  // 我的主贴
  userforums: apiUrl + 'forum/userforums',
  // 删除回帖
  deleteReply: apiUrl +'person/del-reply',
  //歌姬介绍信息
  getIdolInfo: apiUrl + 'idol/idol-introduction',
  // 主贴详情
  forumdetail: apiUrl + 'idol/forumdetail',
  // 编辑个人信息
  saveUser: apiUrl + 'person/save-user',
  // 个人信息
  userInfo: apiUrl + 'person/user-info',
  //  我的评论列表
  replyCommentList: apiUrl + 'reply/reply-comment',
  // 通知消息
  getNotice: apiUrl + 'person/noticeuser',
  // 系统通知
  getMsg: apiUrl + 'person/msg',
  // 系统消息详情
  getMsgDetail: apiUrl +'person/msg-detail',

  // 签到
  sign: apiUrl + 'assist/sign-in',

  // 签到状态
  isSign: apiUrl + 'assist/is-sign'

}