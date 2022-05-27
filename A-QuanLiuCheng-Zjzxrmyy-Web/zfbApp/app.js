const monitor = require('/utils/alipayLogger.js');

App(monitor.hookApp({
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
    monitor.init({
      pid: "dwnoxok9gtvkghhfio3j6w==",
      options: options,
      sample: 1,
      autoReportApi: true,
      autoReportPage: true,
      // Http请求返回数据中状态码字段名称
      code: ["code"],
      // Http返回数据中的error message字段名称
      msg: ["msg"]
    });
    // 第一次打开
    // options.query == {number:1}
    console.info('onLaunch:' + JSON.stringify(options.query));
    if(options.query != undefined && (options.query.pagename != undefined || options.query.pagename != ''))
      myGlobalData.page.name = options.query.pagename
    if(options.query != undefined && (options.query.orderid != undefined || options.query.orderid != ''))
      myGlobalData.page.orderid = options.query.orderid
    //////////////////////
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
}));
