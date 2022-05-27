<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.cardNo" placeholder="卡号" @keyup.13.native="handleCurrentChange(1)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名" @keyup.13.native="handleCurrentChange(1)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.idenNo" placeholder="身份证号" @keyup.13.native="handleCurrentChange(1)"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input v-model="filters.orderNo" placeholder="订单号" @keyup.enter.native="handleCurrentChange(1)"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-input class="weui_input" v-model="startDate" placeholder="请选择开始时间" type="date"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="weui_input" v-model="endDate" placeholder="请选择结束时间" type="date"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleCurrentChange(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getExcel()">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="items" highlight-current-row max-height="600"  @selection-change="selsChange" border style="width: 100%;">
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleGetSub(scope.$index, scope.row)">打印</el-button>
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"  v-for="(i,index) in columns" :key="index" :prop="i.name" :label="i.label" :width="i.width" :height="i.height"> </el-table-column>     
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-show="total> 0">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { GetApptOrderList, ChannelApptListExcel, PrintApptOrder } from "../../api/api";
import { commonUtil } from '../../plugins/common';
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      filters: {
        cardNo: '',
        name: '',
        orderNo: '',
        idenNo: ''
      },
      items:[],
      columns: [],
      total: 0,
      page: 1,
      status: 0,
      pageSize: 20,
      listLoading: false,
      sels: [],
      sysId: '',
      row: [],
      sysUserName: '',
      status: '',
      startDate: '2021-01-01',
      endDate: '',
      exportlist: []
    };
  },
  methods: {
    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers(0);
    },
    //获取主菜单列表
    getUsers(type) {
      let para = { 
        page: this.page,
        pageSize: this.pageSize,
        cardNo: this.filters.cardNo,
        name: this.filters.name,
        idenNo: this.filters.idenNo,
        orderNo: this.filters.orderNo,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.listLoading = true;
      GetApptOrderList(para).then(res => {
        this.items = res.data.list;
        this.columns = res.data.Column;
        this.total = parseInt(res.data.total);
        this.listLoading = false;
        if (type == 0) {
          let para = { 
            orderId: parseInt(this.items[this.items.length - 1].Id),
            status: this.sysUserName
          };
          this.listLoading = true;
          PrintApptOrder(para).then(res => {
            this.listLoading = false;
            if (res.data.ResultCode === '0') {
              this.$message({
                message: "打印成功",
                type: "success"
              });
              this.filters.cardNo = '';
              this.filters.name = '';
              this.filters.orderNo = '';
              this.filters.idenNo = '';
            } else {
              this.$message({
                message: "打印失败",
                type: "error"
              });
            }
          });
        }
      });
    },
    handleGetSub: function(index, row) {
      this.$confirm("确认打印吗？", "提示", {})
        .then(() => {
          let para = { 
            orderId: parseInt(row.Id),
            status: this.sysUserName
          };
          this.listLoading = true;
          PrintApptOrder(para).then(res => {
            this.listLoading = false;
            if (res.data.ResultCode === '0') {
              this.$message({
                message: "打印成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "打印失败",
                type: "error"
              });
            }
            this.getUsers(1);
          });
        })
        .catch(e => {
          // 打印一下错误
          console.log(e);
        });
      this.filters.cardNo = '';
      this.filters.name = '';
      this.filters.orderNo = '';
      this.filters.idenNo = '';
    },
    getExcel(){
			// window.open(base + '/DnaOrder/ChannelApptListExcel?startTime=' + this.startDate + '&endTime=' + this.endDate)
      var that = this
      that.exportlist = []
      let para = {
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.listLoading = true;
      ChannelApptListExcel(para).then(res => {
         var result = res.data.list;
        result.forEach(function (item, index) {
          that.exportlist.push({
            '姓名': item.patientName,
            '卡号': item.patientNo,
            '科室Id': item.DeptId,
            '科室名称': item.DeptName,
            '医生Id': item.DoctorId,
            '医生名称': item.DoctorName,
            '订单号': item.OrderNo,  
            '金额': item.SumFee,    
            '身份证号': item.IdenNo,
            '创建时间': item.CreateTime,
            '预约日期': item.RegDate,
            '工号': item.JobName
          })
        })
        that.listLoading = false;
        that.exportExcelData('网上预约信息表明细', that.exportlist)
      });
    },
    exportExcelData: function(execlName, exportData) {
      var that = this
      var wopts = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
      };
      var workBook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
      };
      workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(exportData);
      FileSaver.saveAs(new Blob([that.changeData(XLSX.write(workBook, wopts))], {type: 'application/octet-stream'}), execlName + ".xlsx")
    },
    changeData(s) {
      //如果存在ArrayBuffer对象(es6) 最好采用该对象
      if (typeof ArrayBuffer !== 'undefined') {
        
        //1、创建一个字节长度为s.length的内存区域
        var buf = new ArrayBuffer(s.length);
        
        //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
        var view = new Uint8Array(buf);
        
        //3、返回指定位置的字符的Unicode编码
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
    }
  },
  mounted() {
    this.startDate = commonUtil.getDateStr(-7)
    this.endDate = commonUtil.getDateStr()

    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysId = user.id || '';
      this.sysUserName = user.username || '';
    }
    this.$watch('startDate', function (val) {
      this.getUsers(1)
    })
    this.$watch('endDate', function (val) {
      this.getUsers(1)
    })

    this.getUsers(1);
  },
  created(){
  }
};
</script>

<style>
.el-dialog--small{
  width:70%;
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  color: #000000;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  height: 160px;
  width: 90px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  height: 160px;
  width: 120px;
  display: block;
}
.uploadArea {
  margin-top: 0.2rem;
  .addUpload {
    text-align: center;
    line-height: 0.36rem;
    button {
      width: 80%;
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #fff;
      background: #03bf72;
      border: none;
      border-radius: 0.32rem;
    }
  }
}
</style>