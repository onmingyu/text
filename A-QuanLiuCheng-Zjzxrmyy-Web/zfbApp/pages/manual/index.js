const queryString = require('query-string');

const authList = ['none', 'auth_base', 'auth_user', 'auth_zhima'];

Page({
  data: {
    auth: 'none',
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
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

  onSubmit(e) {
    const url = `/pages/zw_base_h5/index?auth=${this.data.auth}&${queryString.stringify(e.detail.value)}`;
    console.log(url);
    
    my.navigateTo({ url });
  },

  onPickerTap(e) {
    my.showActionSheet({
      title: '选择授权方式',
      items: authList,
      success: (res) => {
        this.setData({
          auth: authList[res.index],
        });
      },
    });
  }
});
