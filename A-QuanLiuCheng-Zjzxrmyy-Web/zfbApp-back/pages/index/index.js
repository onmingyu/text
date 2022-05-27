const { requestSubscribeMessage } = requirePlugin('subscribeMsg');

Page({
  data: {
    webViewContext: undefined,
    //'http://weixin.gdbkyz.com/NewQzsfyTest/h5/dist/#!/index/portal' 
    // webhomeurl: 'https://zjzx.wedoublecare.com/zjzxrmAliApp/h5/#!/index/portal',              // 首面   
    webappturl: 'https://zjzx.wedoublecare.com/zjzxrmAliApp/h5/#!/index/reg-order-detail/',    // 挂号单详情页面   
    webbillurl: 'https://zjzx.wedoublecare.com/zjzxrmAliApp/h5/#!/index/bill-order-detail/',   // 缴费单详情页面
    webhomeurl: 'http://192.168.4.62:8081/#!/index/portal',       // + '?myUserId=oxKlnuJnTV6TgnZ7hqzG_0-spINI'
    ispay: false, //是否支付

    URL: '',
    isAuth: false,
    tradeNO: '', // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
    msgType: ''
  },
  onLoad() {
    this.webViewContext = my.createWebViewContext('web-view-1');
  },
  onReady() {
    var self = this
    console.info(getApp().myGlobalData.isSubscribeMessage)
    if (getApp().myGlobalData.page.name != '' && getApp().myGlobalData.page.orderid != '') {
      switch (getApp().myGlobalData.page.name) {
        case 'appt':
          self.authBtn(self.data.webappturl + getApp().myGlobalData.page.orderid)
          break;
        case 'bill':
          self.authBtn(self.data.webbillurl + getApp().myGlobalData.page.orderid)
          break;
        default:
          self.authBtn(self.data.webhomeurl)
          break;
      }
    } else {
      self.authBtn(self.data.webhomeurl)
    }
  },
  // 接收来自H5的消息
  onWebMessage(e) {
    var self = this
    // console.info(e);  ////{'msgType': 'reg','tradeNO':'201711152100110410533667792'}
    var detail = e.detail
    switch (detail.msgType.toLocaleLowerCase()) {
      case 'doreg':
      case 'doregpay':
      case 'billpay':
        self.setData({
          msgType: detail.msgType,
          tradeNO: detail.tradeNO === undefined ? '' : detail.tradeNO
        })
        if (self.data.tradeNO === '') {
          my.alert({
            content: '支付失败交易号为空',
          });
        }
        else {
          this.toNotifiAuth()
        }
        break
      case 'onregsendmessage':
      case 'onbillsendmessage':
        self.setData({
          msgType: detail.msgType
        })
        this.toNotifiAuth()
        break
      case 'reauthorization':
        setTimeout(() => {
          self.setData({
            URL: '',
            isAuth: true
          })
          // self.authBtn()
        }, 500);
        break
      default:
        console.info('default')
        break;
    }
  },
  toNotifiAuth() {
    my.navigateTo({
      url: '../notifiauth/notifiauth'
    })
  },
  doPay: function () {
    // .js
    my.tradePay({
      // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
      tradeNO: self.data.tradeNO,
      success: (res) => {
        // 支付成功向H5发送消息
        if (res.resultCode === '9000' || res.resultCode === '8000' || res.resultCode === '6004') {
          self.webViewContext.postMessage({ msgType: this.data.msgType, code: '0', msg: JSON.stringify(res) });
        }
        else {
          self.webViewContext.postMessage({ msgType: this.data.msgType, code: '1', msg: JSON.stringify(res) });
        }
        console.info(JSON.stringify(res))
        // my.alert({
        //   content: JSON.stringify(res),
        // });
      },
      fail: (res) => {
        // 支付成功向H5发送消息
        self.webViewContext.postMessage({ msgType: this.data.msgType, code: '1', msg: JSON.stringify(res) });
        console.info(JSON.stringify(res))
        // my.alert({
        //   content: JSON.stringify(res),
        // });
      }
    });
  },
  authBtnHome(){
    self = this
    self.authBtn(self.data.webhomeurl)
  },
  authBtn(webhomeurl) {
    self = this
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        console.info(res.authCode)
        self.setData({
          URL: webhomeurl + '?authCode=' + res.authCode, //'http://weixin.gdbkyz.com/NewQzsfyTest/h5/dist/#!/index/portal',
          isAuth: false
        })
        // my.request({
        //   url: 'http://www.dr0759.cn/AliApp/api/AlipayAuth/AlipayLogin?code=' + res.authCode,
        //   method: 'GET',
        //   dataType: 'utf-8',
        //   success: (resp) => {
        //     // console.log('resp data' + cookie + '----', resp.data);
        //     self.webViewContext.postMessage({ msgType: 'myUserId', myUserId: res.data });
        //     self.setData({
        //       URL: 'http://192.168.4.142:8081/#!/index/portal', //'http://weixin.gdbkyz.com/NewQzsfyTest/h5/dist/#!/index/portal',
        //       isAuth: false
        //     })
        //   },
        //   fail: (err) => {
        //     console.log('error', err);
        //   },
        // });

      },
      fail: (res) => {
        self.setData({
          isAuth: true
        })
      }
    });
  },
  onShow() {
    // 页面显示
    switch (this.data.msgType.toLocaleLowerCase()) {
      case 'doreg':
      case 'doregpay':
      case 'billpay':
        if (getApp().myGlobalData.isSubscribeMessage) {
          this.doPay()
          getApp().myGlobalData.isSubscribeMessage = false
        }
        break
      case 'onregsendmessage':
      case 'onbillsendmessage':
        if (getApp().myGlobalData.isSubscribeMessage) {
          this.webViewContext.postMessage({ msgType: this.data.msgType });
          getApp().myGlobalData.isSubscribeMessage = false
        }
        break
      default:
        console.info('default')
        break;
    }

  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '湛江中心人民医院',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
