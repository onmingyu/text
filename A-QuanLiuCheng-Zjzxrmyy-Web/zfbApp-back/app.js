App({
  myGlobalData:{
    isSubscribeMessage : false,
    page:{
      name:'',
      orderid:''
    }
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('onLaunch:' + JSON.stringify(options.query));
    if(options.query != undefined && (options.query.pagename != undefined || options.query.pagename != ''))
      myGlobalData.page.name = options.query.pagename
    if(options.query != undefined && (options.query.orderid != undefined || options.query.orderid != ''))
      myGlobalData.page.orderid = options.query.orderid
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.info('onShow' + JSON.stringify(options.query));
    if(options.query != undefined && (options.query.pagename != undefined || options.query.pagename != '' || options.query.pagename != myGlobalData.page.name || myGlobalData.page.name === ''))
      myGlobalData.page.name = options.query.pagename
    if(options.query != undefined && (options.query.orderid != undefined || options.query.orderid != '' || options.query.pagename != myGlobalData.page.name || myGlobalData.page.name === ''))
      myGlobalData.page.orderid = options.query.orderid
  },
});
