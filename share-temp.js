var shareData = {
	title: '',
	desc: '',
	link: '',
	imgUrl: ''
};
$.JSBridge.registerHandler('wxShareInfo',function(){
  return shareData;
});
  
  // 微信分享
wx.ready(function() {
  wx.showOptionMenu();
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareAppMessage(shareData);
});