<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="医院名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleCurrentChange(1)">搜索</el-button>
        </el-form-item>
        <el-form-item v-if="sysId==='1'">
          <el-button type="primary"  @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="items" highlight-current-row max-height="600"  @selection-change="selsChange" border style="width: 100%;">
      <el-table-column :show-overflow-tooltip="true"  v-for="(i,index) in columns" :key="index" :prop="i.name" :label="i.label" :width="i.width" :height="i.height"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         <!--  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">配置</el-button> -->
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-show="total> 0">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="tab">
              <el-tab-pane label="信息维护"></el-tab-pane>
              <el-tab-pane label="公众号配置"></el-tab-pane>
              <el-tab-pane label="医保配置"></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <div v-if="tab==='0'">
          <el-form-item label="编码" prop="HospId" v-if="sysId==='1'">
            <el-input v-model="editForm.HospId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="name" v-if="sysId!=='1'">
            {{sysId}}
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="官网">
            <el-input v-model="editForm.hospUrl" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号" prop="UserID">
            <el-input  v-model="editForm.UserID"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码" prop="Password">
            <el-input type="password" v-model="editForm.Password"></el-input>
          </el-form-item>
          <el-form-item label="服务热线">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>

     <!--    <el-form-item label="回调地址">
          <el-input v-model="editForm.TenPayV3NotifyFlow"></el-input>
        </el-form-item> -->
      <!--   <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item> -->
      <!--   <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item> -->
  <!--       <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="头像">
          <img v-show="imgPic !== ''" :src="imgPic" class="avatar">
          <img v-show="editForm.imgPic !== '' && imgPic === ''" :src="editForm.imgPic" class="avatar">
          <i v-show="editForm.imgPic === '' && imgPic === ''" class="el-icon-plus avatar-uploader-icon"></i>
          <br/>
          <input @change="AddfileImage" type="file" accept="image/*" id="addtempImg" value="" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.address" ></el-input>
        </el-form-item>
       
        <el-form-item label="简介">
          <!-- <el-input type="textarea" v-model="editForm.desc"></el-input> -->
          <quill-editor v-model="editForm.desc" ref="myQuillEditor" class="editer" :options="editorOption"></quill-editor>
        </el-form-item>
      </div>
      <div v-if="tab==='1'">
        <el-form-item label="服务商AppId">
          <el-input v-model="editForm.AppId"></el-input>
        </el-form-item>
        <el-form-item label="服务商AppSecret">
          <el-input v-model="editForm.AppSecret"></el-input>
        </el-form-item>
        <el-form-item label="服务商MchId">
          <el-input v-model="editForm.MchId"></el-input>
        </el-form-item>
        <el-form-item label="服务商Key">
          <el-input v-model="editForm.Key"></el-input>
        </el-form-item>
        <el-form-item label="是否独立模式">
          <el-radio-group v-model="editForm.IsV3">
            <el-radio class="radio" label='0'>是</el-radio>
            <el-radio class="radio" label='1'>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="editForm.IsV3==='1'">
        <el-form-item label="子商户AppId">
          <el-input  v-model="editForm.SubAppId"></el-input>
        </el-form-item>
        <el-form-item label="子商户AppSecret">
          <el-input v-model="editForm.SubAppSecret"></el-input>
        </el-form-item>
        <el-form-item label="子商户MchId">
          <el-input v-model="editForm.SubMchId"></el-input>
        </el-form-item>
        </div>
        <el-form-item label="挂号回调">
          <el-input v-model="editForm.TenPayV3Notify_appt"></el-input>
        </el-form-item>
        <el-form-item label="门诊回调">
          <el-input v-model="editForm.TenPayV3Notify_bill"></el-input>
        </el-form-item>
        <el-form-item label="住院回调">
          <el-input v-model="editForm.TenPayV3Notify_in"></el-input>
        </el-form-item>
        <el-form-item label="退费地址">
          <el-input v-model="editForm.RefundUrl"></el-input>
        </el-form-item>
        <el-form-item label="下载账单">
          <el-radio-group v-model="editForm.Permissions">
            <el-radio class="radio" label='0'>是</el-radio>
            <el-radio class="radio" label='1'>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
       <div v-if="tab==='2'">
        <el-form-item label="城市标识">
          <el-input v-model="editForm.CityId"></el-input>
        </el-form-item>
        <el-form-item label="德生账号">
          <el-input v-model="editForm.OrgNo"></el-input>
        </el-form-item>
        <el-form-item label="医保Key">
          <el-input v-model="editForm.YbKey"></el-input>
        </el-form-item>
        <el-form-item label="是否使用医保">
          <el-radio-group v-model="editForm.IsYb">
            <el-radio class="radio" label='0'>是</el-radio>
            <el-radio class="radio" label='1'>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
     
      <div slot="footer" class="dialog-footer">
       <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
        <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getHospList, getHospAdd, getHospUpdate, getHospDelete, getImgFile } from "../../api/api";
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["clean"]
          ]
        }
      },
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      dialogFormVisible: false,
      editFormRules: {
        name: [{ required: true, message: "请输入医院名称", trigger: "blur" }],
        HospId: [{ required: true, message: "请输入医院编码", trigger: "blur" }],
        UserID: [{ required: true, message: "请输入账号", trigger: "blur" }],
        Password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: '',
        name: '',
        imgPic: '',
        address: '',
        hospUrl: '',
        desc: '',
        UserID: '',
        Password: '',
        HospId: '',
        SubAppId: '',
        SubMchId: '',
        AppId: '',
        MchId: '',
        Key: '',
        AppSecret: '',
        SubAppSecret: '',
        TenPayV3Notify_appt: '',
        TenPayV3Notify_bill: '',
        TenPayV3Notify_in: '',
        RefundUrl: '',
        phone: '',
        Permissions: '1',
        OrgNo: '',
        CityId: '',
        YbKey: '',
        IsV3: '0',
        IsYb: '1'
      },
      filters: {
        name: ''
      },
      items:[],
      columns: [],
      total: 0,
      page: 1,
      status: 0,
      pageSize: 20,
      listLoading: false,
      tab: 0,
      sels: [],
      sysId: '',
      imgPic: '',
      hasContent: false
    };
  },
  methods: {
    selsChange: function(sels) {
      this.sels = sels;
    },
    // routerTo: function(sels) {
    //   this.tab = sels
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    AddfileImage: function(e) {
      var that = this;
      var file = e.target.files[0];
      var imgSize = file.size / 1024;
      e.target.value = '';
      if (imgSize > 1024) {
        this.$message("请上传大小不要超过1MB的图片");
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          // that.imgPic = reader.result;
          getImgFile({baseImg: reader.result}).then(res => {
            if (res.data.ResultCode === '0') {
              that.imgPic = res.data.ResultMsg
            }
          })
        };
      }
    },
    //获取用户列表
    getUsers() {
      let para = { 
        page: this.page,
        pageSize: this.pageSize,
        name: this.filters.name,
        HospId: this.sysId
      };
      this.listLoading = true;
      getHospList(para).then(res => {
        // var obj = JSON.parse(res.data); 
        this.items = res.data.list;
        this.columns = res.data.Column;
        this.total = parseInt(res.data.total);
        this.listLoading = false;
        console.log(res.data)
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //this.editFormVisible = true;
      this.imgPic = '';
      this.editForm = Object.assign({}, row);
      this.hasContent = true
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      //this.addFormVisible = true;
      this.dialogFormVisible = true;
      this.imgPic = '';
      this.editForm = {
        id: '',
        name: '',
        imgPic: '',
        address: '',
        hospUrl: '',
        desc: '',
        UserID: '',
        Password: '',
        HospId: '',
        SubAppId: '',
        SubMchId: '',
        AppId: '',
        MchId: '',
        Key: '',
        AppSecret: '',
        SubAppSecret: '',
        TenPayV3Notify_appt: '',
        TenPayV3Notify_bill: '',
        TenPayV3Notify_in: '',
        RefundUrl: '',
        phone: '',
        Permissions: '1',
        OrgNo: '',
        CityId: '',
        YbKey: '',
        IsV3: '0',
        IsYb: '1'
      }
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
          getHospDelete(para).then(res => {
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
    //编辑
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              if (this.imgPic!=='') {
                this.editForm.imgPic = this.imgPic
              }
              //this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              getHospUpdate(para).then(res => {
                //this.editLoading = false;
                //NProgress.done();
                if (res.data.ResultCode === '0') {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }
                // this.$refs["editForm"].resetFields();
                //this.editFormVisible = false;
                 this.dialogFormVisible = false;
                this.getUsers();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //新增
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.editForm.imgPic = this.imgPic
              //this.editLoading = true;
              //NProgress.start();
              // this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
              let para = Object.assign({}, this.editForm);
              console.log(para);
              
              getHospAdd(para).then(res => {
                //this.addLoading = false;
                //NProgress.done();
                if (res.data.ResultCode === '0') {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }
                
                // this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.getUsers();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    getEditorVal (val, hasVal) {
      this.editForm.desc = val
      this.hasContent = hasVal
    }
  },
  // mounted() {
  //   this.getUsers();
  // },
  mounted() {
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      // this.sysUserName = user.username || '';
      // this.sysUserAvatar = user.avatar || '';
      // this.sysName = user.name || '';
      this.sysId = user.id || '';
    }
    this.getUsers();
  },
  created(){
    // this.getUsers();
  }
};
</script>

<style>
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