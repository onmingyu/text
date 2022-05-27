<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
            <el-input v-model="Name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="CardNo" placeholder="卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="beginTime"
            type="datetime"
            value="yyyy-MM-dd HH-mm-ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            value="yyyy-MM-dd HH-mm-ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-date-picker
            v-model="st"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-on:click="handleCurrentChange(1)">搜索</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary">打印</el-button>
        </el-form-item> -->
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="items" v-loading="listLoading" highlight-current-row  @selection-change="selsChange" height="700" border style="width: 100%;">
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column prop="PatientName" label="姓名"> </el-table-column>
      <!-- <el-table-column prop="PatientId" label="患者编码"> </el-table-column> -->
      <el-table-column prop="CardNo" label="就诊卡号"> </el-table-column>
      <el-table-column prop="Phone" label="电话"> </el-table-column>
      <el-table-column prop="IdenNo" label="身份证号码"> </el-table-column>
      <el-table-column label="看诊时间">
          <template slot-scope="scope">{{scope.row.VisitTime}}</template>
      </el-table-column>
      <el-table-column label="填表时间">
          <template slot-scope="scope">{{scope.row.CreateTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination :pager-count="11" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="回答详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="container">
        <div class="quesBox" id="printTest">
          <div class="ques-Title">{{detailInfo.Title}}</div>
          <div v-for="(pItem, pIndex) in detailInfo.TopicList" :key="pIndex">
            <div class="oneTitle">{{pItem.Name}}</div>
            <div
              :class="item.Mark == 'Sex' || item.Type == 3 ? 'quesItem' :'moreFont'"
              v-for="(item, index) in pItem.NextList"
              :key="index" style="text-indent: 0.5em; line-height: 25px; margin-bottom: 5px;">
              <!-- 填空 -->
              <template v-if="item.Type == 1 || item.Type == 5 || item.Type == 6">
                <span style="display: inline-block;">{{ item.Name }}</span>
                <span class="itemInput" style="width: auto; min-width: 12em;">{{item.Context}}&nbsp;</span>
              </template>
              <!-- 单选 -->
              <template v-if="item.Type == 2">
                <p v-if="item.Mark == 'Sex'" style="display: inline-block; width: 180px; text-indent: 1em;">{{item.Name}}</p>
                <p v-else>{{item.Name}}</p>
                <div class="check">
                  <template v-for="(cItem, cIndex) in item.OptionList">
                    <p :key="cIndex">
                      <i class="iconfont" :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                      <span v-if="cItem.Other && cItem.OtherSort" class="itemInput itemInput2">{{cItem.Context}}&nbsp;</span>
                      <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                      <span v-if="cItem.Other && !cItem.OtherSort" class="itemInput itemInput2">{{cItem.Context}}&nbsp;</span>
                      <span>{{cItem.OtherDescribe}}</span>
                    </p>
                  </template>
                </div>
              </template>
              <!-- 多选 -->
              <template v-if="item.Type == 3">
                <p>{{ item.Name }}</p>
                <div class="check">
                  <template v-for="(cItem, cIndex) in item.OptionList">
                    <p :key="cIndex">
                      <i class="iconfont" :class="cItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                      <template v-if="cItem.Other && cItem.OtherSort">
                        <span>{{cItem.OtherDescribe}}</span>
                      </template>
                      <span v-if="cItem.Other && cItem.OtherSort" class="itemInput cInput itemInput2">{{cItem.Context}}&nbsp;</span>
                      <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.OptionName }}</span>
                      <span v-if="cItem.Other && !cItem.OtherSort" class="itemInput cInput itemInput2">{{cItem.Context}}&nbsp;</span>
                      <template v-if="cItem.Other && !cItem.OtherSort">
                        <span>{{cItem.OtherDescribe}}</span>
                      </template>
                    </p>
                  </template>
                </div>
              </template>
              <!-- 多层题 -->
              <template v-if="item.Type == 0">
                <p v-if="item.Mark != 'DoctorTips' && item.Mark != 'DoctorSignature' && item.Mark != 'PatientSignature'">{{ item.Name }}</p>
                <div class="autograph" v-if="item.Mark == 'PatientSignature'">
                  <p>患者/填报人签名：</p>
                  <p class="autographImg toSignature">
                    <img v-if="item.Context" :src="item.Context" alt="">
                  </p>
                </div>
                <div class="writeDt" v-if="item.Mark == 'PatientSignature'">填表日期：{{editForm.CreateTime }}</div>
                <div class="moreFont childItem" v-for="(cItem, cIndex) in item.NextList" :key="cIndex">
                  <template v-if="cItem.Type == 1">
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}</span>
                    <span class="itemInput">{{cItem.Context}}</span>
                  </template>
                  <template v-if="cItem.Type == 2">
                    <span :opid="cItem.OptionId" :top="cItem.TopicId">{{ cItem.Name }}：</span>
                    <span v-if="cItem.Name == '其他'" class="itemInput cInput itemInput2">{{cItem.Context}}&nbsp;</span>
                    <div class="check">
                      <p v-for="(cnItem, cnIndex) in cItem.OptionList" :key="cnIndex" >
                        <i class="iconfont" :class="cnItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                        <span :opid="cnItem.OptionId" :top="cnItem.TopicId">{{ cnItem.Name }}</span>
                        <span v-if="cnItem.Other" class="itemInput itemInput2">{{cnItem.Context}}&nbsp;</span>
                      </p>
                    </div>
                  </template>
                  <template>
                    <div
                      class="moreFont cchildItem"
                      v-for="(nItem, nIndex) in cItem.NextList"
                      :key="nIndex"
                    >
                      <template v-if="nItem.Type == 1">
                        <span :opid="nItem.OptionId" :top="nItem.TopicId">{{ nItem.Name }}</span>
                        <span class="itemInput cInput">{{nItem.Context}}</span>
                      </template>
                      <span>{{ nItem.Name }}：</span>
                      <div class="check">
                        <p v-for="(nnItem, nnIndex) in nItem.OptionList" :key="nnIndex" >
                          <i class="iconfont" :class="nnItem.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'"></i>
                          <span :opid="nnItem.OptionId" :top="nnItem.TopicId">{{ nnItem.Name }}</span>
                          <span v-if="nnItem.Other" class="itemInput cInput itemInput2">{{nnItem.Context}}&nbsp;</span>
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </div>
            <div v-if="pItem.Type == 4">
              <p>{{pItem.Context || '无'}}</p>
            </div>
              <!-- 多选 -->
            <div class="moreChoice quesItem" v-for="(item, index) in pItem.OptionList" :key="index" >
              <template>
                <i class="iconfont" :class="item.Seleted ? 'icon-duoxuankuang2' : 'icon-duoxuankuang'" style="text-indent: 1em;"></i>
                <p style="text-indent: 0.3em;">{{ item.Name }}</p>
                <div class="check">
                  <template>
                    <p>
                      <span v-if="item.Other && item.OtherSort" class="itemInput cInput itemInput2">{{item.Context}}&nbsp;</span>
                      <span :opid="item.OptionId" :top="item.TopicId">{{ item.OptionName }}</span>
                      <span v-if="item.Other && !item.OtherSort" class="itemInput cInput itemInput2">{{item.Context}}&nbsp;</span>
                      <span>{{item.OtherDescribe}}</span>
                    </p>
                  </template>
                </div>
              </template>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <div class="moreFont" v-if="sysId == 'dsyy'" style="text-indent: 0.5em; line-height: 25px; margin-bottom: 15px;">
                <span style="display: inline-block;">护士签字：</span>
                <span class="itemInput" style="width: auto; min-width: 12em;">&nbsp;</span>
            </div>
            <div v-if="sysId != 'hxyy' && sysId != 'byey' && sysId != 'hdhzfy'" class="moreFont" style="text-indent: 0.5em; line-height: 25px; margin-bottom: 15px;">
                <span style="display: inline-block;">就诊患者签字：</span>
                <span class="itemInput" style="width: auto; min-width: 12em;">&nbsp;</span>
            </div>
            <p style="font-weight: 600;" v-if="sysId == 'byey'">本人在接诊过程中已详细询问新冠病毒感染相关流行病学史及症状。</p>
            <div class="moreFont" v-if="sysId != 'hxyy'" :style="sysId == 'byey' ? 'text-indent: 0.5em; line-height: 25px;margin-top: 20px' : 'text-indent: 0.5em; line-height: 25px;'">
                <span style="display: inline-block;">接诊医生签字：</span>
                <span class="itemInput" style="width: auto; min-width: 12em;">&nbsp;</span>
            </div>
          </div>
          <div class="dsyyTip" style="margin-top: 20px;" v-if="sysId == 'dsyy'">
            <span>请如实填写此表，未填表不能就诊，就诊结束后，此表由医院回收并存档。</span>
          </div>
          <div class="dsyyTip two" v-if="sysId == 'dsyy'">
            <span>中高风险区详见每日通知的全国中高风险地区名单</span>
          </div>
        </div>
      </div>
      <div class="dialog-footer el-dialog__footer">
       <el-button @click.native="dialogFormVisible=false">取消</el-button>
       <el-button type="primary" v-print="printObj">打印</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import { getHealthQuestionList, getHealthQuestionDetail } from "../../api/api";

export default {
  data() {
    return {
      userInfo: '',
      dialogStatus: "",
      dialogFormVisible: false,
      //编辑界面数据
      editForm: {
        id: '',
        deptId: '',
        deptName: '',
        sort: 0,
        parentId: '-1',
        address: '',
        desc: '',
        HospId: this.sysId
      },
      items:[],
      columns: [],
      total: 0,
      page: 1,
      status: 0,
      pageSize: 20,
      listLoading: false,
      sels: [],
      Name: "",
      CardNo: "",
      sysId: '',
      detailInfo: {},
      printObj: {
        id: "printTest",
        popTitle: '答题详情',
        extraCss: '', // 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      beginTime: '',
      endTime: '',
      st: [new Date(),new Date()],
    };
  },
  filters: {
    dateSlite (date) {
      return date.slice(0,10)
    }
  },
  methods: {
    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取列表
    getUsers() {
      let self = this
      let para = {
        hospId: self.sysId,
        BranchNo: '',
        name: self.Name || '',
        cardNo: self.CardNo || '',
        pageIndex: self.page,
        pageSize: self.pageSize,
        beginTime: self.formateDate(self.beginTime),
        endTime: self.formateDate(self.endTime)
      };
      if (this.userInfo.id == 'dsyy') {
        para.editionType = 2
      }
      self.listLoading = true;
      getHealthQuestionList(para).then(res => {
        // var obj = JSON.parse(res.data); 
        self.items = res.data.PatientRegList;
        self.columns = res.data.Column;
        self.total = parseInt(res.data.Total);
        self.listLoading = false;
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
        console.log(index)
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.getDetail(row)
    },
    // 获取记录详情
    getDetail (row) {
      let para = {
        hospId: this.sysId,
        PatientRegId: row.PatientRegId
      };
      if (this.userInfo.id == 'dsyy') {
        para.editionType = 2
      }
      this.listLoading = true;
      getHealthQuestionDetail(para).then(res => {
        let tempArr = []
        for (let i = 0; i < res.data.TopicList.length; i++) {
          for (let k in res.data.TopicList[i].OptionList) {
            let item = res.data.TopicList[i].OptionList[k]
            // item.is = false
            // item.input = ''
            // if (!item.OptionName) {
            //   item.OptionName = res.data.TopicList[i].Name
            //   item.input = ''
            //   res.data.TopicList[i].Name = ''
            // }
          }
        }
        this.detailInfo = res.data
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
      .then(() => {
          //this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          getDeptDelete(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            if (res.data.ResultCode === '0') {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
            this.getUsers();
          });
        })
      .catch(() => {});
    },
    formateDate (data) {
      var nowDate = data ? new Date(data) : new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var hour = nowDate.getHours() > 9 ? nowDate.getHours() : '0' + nowDate.getHours()
      var minit = nowDate.getMinutes() > 9 ? nowDate.getMinutes() : '0' + nowDate.getMinutes()
      var se = nowDate.getSeconds() > 9 ? nowDate.getSeconds() : '0' + nowDate.getSeconds()
      var dateStr = data ? year + "-" + month + "-" + day + ' ' + hour + ':' + minit + ':' + se : year + "-" + month + "-" + day;
      return dateStr
    },
  },
  // mounted() {
  //   this.getUsers();
  // },
  mounted() {
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysId = user.id || '';
    } else if (this.$route.query.hospitalId) {
      this.sysId = this.$route.query.hospitalId || '';
    } else {
      this.$router.replace({ path: '/login' })
    }
    this.PatientId = this.$route.query.patientId
    this.userInfo = user
    this.beginTime = this.formateDate() + ' ' + '00:00:00';
    this.endTime = this.formateDate() + ' ' + '23:59:59';
    this.getUsers();
  },
  created(){
    // this.getUsers();
  }
};
</script>
<style media="printContent">
@page {
  size: auto A4 landscape;;  /* auto is the initial value */
  margin: 12mm 0 2mm; /* this affects the margin in the printer settings */
}
</style>
<style>
@import url("../../assets/css/alifont.css");
.el-dialog__body {
  padding: 30px 20px 100px\9;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .el-dialog__body {
    padding: 30px 20px 100px;
  }
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  color: #000000;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.baseInfoBox {
  margin-bottom: 4px;
  /* display: flex;
  justify-content: space-between;
  align-content: center; */
}
.baseInfoBox .infoItem {
  width: 60%;
  display: inline-block;
  margin: 3px 0;
}
/* .baseInfoBox .infoItem:nth-child(2n) {
  width: 50%;
} */
.baseInfoBox .infoItem .topicName {
  display: inline-block;
  width: 34%;
  text-align: right;
}
.baseInfoBox .infoItem .topicAns {
  display: inline-block;
}
.paperContainer {
  padding: 20px;
  font-size: 15px;
}
.oneTitle {
  font-weight: 600;
  text-align: left;
  margin: 2px 0;
  line-height: 25px;
  font-size: 16px;
}
.iconfont {
  font-size: 20px;
}
.moreFont {
  line-height: 22px;
  text-align: left;
  text-indent: 2em;
}
.moreFont .itemInput {
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
  display: inline-block;
  width: 12em;
  line-height: 14px;
  /* display: inline-flex;
  align-items: center; */
}
.moreFont .itemInput2 {
  width: 8em;
}
.moreFont .check p {
  margin: 0 10px;
  line-height: 18px;
}
.moreChoice .check {
  text-indent: initial;
}
.moreFont p {
  margin: 0;
  line-height: 18px;
}
.checkFlex {
  display: flex;
  margin-left: 2em;
}
.childItem {
  text-indent: 2em;
}
.cchildItem {
  text-indent: 4em;
}
.cInput {
  width: 100px !important;
}
.quesItem {
  display: flex;
  justify-items: flex-start;
  line-height: 19px;
  text-align: left;
  align-items: center;
}
.quesItem > p {
  text-indent: 2em;
  display: inline-block;
}
p {
  margin:0;
}
.quesItem .itemInput {
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
  display: inline-block;
  width: 100px;
  /* display: inline-flex;
  align-items: center; */
}
.quesItem .check {
  display: inline-block;
}
.quesItem .check p {
  display: inline-block;
  margin: 0 10px;
}
.yourself p {
  display: inline-block;
}
.yourself p i {
  padding: 0 4px;
}
.quesBox {
  padding: 0 35px;
}
.ques-Title {
  font-size: 18px; 
  text-align: center; 
  margin-bottom: 10px;
}
.dsyyTip {
  font-style: italic;
}
.dsyyTip span {
  border-bottom: 1px solid #000;
}
.dsyyTip.two span {
  border-bottom: 1px solid red;
  color: red;
}

.autograph {
  display: flex;
  align-items: baseline;
  /* margin-top: 20px; */
}
.autograph p:first-child{
  width: 9em;
}
.autograph .autographImg {
  flex: 0.4;
  border-bottom: 1px solid #ccc;
  min-height: 20px;
}
.autograph .autographImg img {
  width: 40%;
}
.writeDt {
  text-align: left;
  padding: 10px 0;
}
</style>