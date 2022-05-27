const { requestSubscribeMessage } = requirePlugin('subscribeMsg');

Page({
  data: {
    templateId1: '54ec4a3415d14ae6a7f75898bb7a0d86', //'02dda3280a394f86b2fb5931e8307e72',
    templateId2: '',
    templateId3: '',
    templateList: []
  },
  onLoad(options) {

  },
  onReady(){
    var self = this
    self.onSendMessage()
    
    // getApp().myGlobalData.isSubscribeMessage = true
    // setTimeout(() => {
    //   //返回小程序上一层
    //   my.navigateBack()
    // }, 1000);
  },
  onSendMessage(e) {
    const {
      templateId1 = '',
      templateId2 = '',
      templateId3 = '',
    } = this.data;
    // 模板id列表
    const templateList = [];
    templateId1 && templateList.push(templateId1);
    // templateId2 && templateList.push(templateId2);
    // templateId3 && templateList.push(templateId3);
    if (templateList.length === 0) {
      my.showToast({
        type: 'fail',
        content: '请填写模板id',
        duration: 3000,
      });
      return;
    }
    // 调用方法，唤起订阅组件
    requestSubscribeMessage({
      // 模板id列表，最多3个
      entityIds: templateList,
      // 接收结果的回调方法
      callback(res) {
        console.log('订阅回调', res);
        if (res.success) {
          const successIds = templateList
            .filter(i => res[i.entityId] === 'accept')
            .map(i => i.entityId);
          // 订阅成功
          my.call('toast', {
            content: `模板${successIds.join(',')}订阅成功`,
            type: 'success',
          });
          getApp().myGlobalData.isSubscribeMessage = true
          setTimeout(() => {
            //返回小程序上一层
            my.navigateBack()
          }, 500);
        } else {
          switch (res.errorCode) {
            case 11: {
              my.call('toast', {
                content: '用户未订阅关闭弹窗',
              });
              break;
            }
            default: {
              my.call('toast', {
                content: `ErrorCode: ${res.errorCode}, ErrorMsg: ${res.errorMessage}`,
              });
              break;
            }
          }
          getApp().myGlobalData.isSubscribeMessage = true
          setTimeout(() => {
            //返回小程序上一层
            my.navigateBack()
          }, 500);
        }
      },
    });
  }
});
