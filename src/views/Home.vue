<template>
  <div class="mainpage">
    <div class="header flex">
      <div style="width: 5vw;">
        <img src="../../static/nalcoImg.png" style="width: 3vw;height: 3vw;margin: 1vh 1vw"/>
      </div>
      <div style="width: 90vw;height: 8vh;line-height: 8vh;font-size: 3vh;margin-left: 0.5vw">
        纳尔科后台管理
      </div>
      <div style="width: 5vw;">
        <el-popover
                placement="bottom"
                width="250">
          <div class="flex" style="align-items: center;height: 10vh">
            <div style="width: 70%">
              <div class="txt flex"><div style="width: 60px">用户名:</div>{{userName}}</div>
              <div class="txt flex"><div style="width: 60px">{{at}}</div>{{account}}</div>
            </div>
            <div style="width: 30%"><img src="../../static/userImg.png" style="width: 60%"></div>
          </div>
          <div style="text-align: center;float: left;height: 10vh;">
            <el-button size="small" @click="logout" style="margin: 20px;width: 210px">退出登陆</el-button>
          </div>
          <el-button slot="reference" style="background:none;border: none;line-height: 8vh"><img src="../../static/userImg.png" style="width: 105%"></el-button>
        </el-popover>

<!--        <img @click="testDate" src="../../static/userImg.png" style="width: 3vw;height: 3vw;margin: 1vh 1vw"/>-->
      </div>
    </div>
    <div class="flex a-c mar_center" style="height: 10%;margin-top: 10px;justify-content: space-around">
      <el-button class="btn_co" @click="btnReset">重置</el-button>
      <div class="flex a-c">
        <div >类型:</div>
        <el-select v-model="valueType" placeholder="请选择" @change="handleChangeType">
          <el-option
                  v-for="item in optionsType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex a-c">
        <div >创建人:</div>
        <el-input
                v-model="valueUser"
                placeholder="请输入姓名"
                @change="getresult"
                class="mar"
                style="width: 100px"
        ></el-input>
      </div>
      <div class="flex a-c">
        <div >部门:</div>
        <el-select v-model="valueDepart" clearable placeholder="请选择" @change="handleChangeDepart">
          <el-option
                  v-for="item in optionsDepart"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex a-c">
        <div >审核状态:</div>
        <el-select v-model="valueState" :disabled="isBOS" clearable placeholder="请选择" @change="handleChangeState">
          <el-option
                  v-for="item in optionsState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex a-c">
        <div >结束时间:</div>
        <el-date-picker
                v-model="dateValue"
                type="date"
                placeholder="选择日期"
                @change="handleChangeDate"
        >
        </el-date-picker>
      </div>
      <div @click="handleExport"><img src="../../static/export.png" style="width: 2vw;height: 2vw;margin: 1vh 1vw"></div>
    </div>
    <div class="flex a-c f-d">
      <div class="flex j-c" style="width: 80%">
        <el-table
                id="export-table"
                :data="tableData"
                style="width: 80%"
                @selection-change="handleSelectionChange"
        >
          <el-table-column
                  type="index"
                  width="50px"
          ></el-table-column>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="expand" align="center">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="提案主题:">
                  <span>{{ props.row.unsafe_type_ }}</span>
                </el-form-item>
                <el-form-item label="类型:">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
                <el-form-item label="创建人:">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="部门:">
                  <span>{{ props.row.department }}</span>
                </el-form-item>
                <el-form-item label="提案状态:">
                  <span>{{ props.row.state }}</span>
                </el-form-item>
                <el-form-item label="结束时间:">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item label="描述:">
                  <span class="white_sp">{{ props.row.describe_ }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
                  prop="unsafe_type_"
                  label="提案主题"
                  align="center"
                  :show-overflow-tooltip="true"
          ></el-table-column><el-table-column
                prop="describe_"
                label="描述"
                align="center"
                :show-overflow-tooltip="true"
        ></el-table-column>
          <el-table-column
                  prop="type"
                  label="类型"
                  align="center"
                  :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
                  prop="name"
                  label="创建人"
                  align="center"
                  :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
                  prop="department"
                  label="部门"
                  align="center"
                  :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
                  prop="state"
                  label="提案状态"
                  align="center"
                  :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
                  prop="date"
                  label="结束时间"
                  align="center"
                  :show-overflow-tooltip="true"
          >
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { getList } from "../api/api";
import Blob from "../plugin/Blob";
import Export2Excel from "../plugin/Export2Excel";
export default {
  data() {
    return {
      at:'账\u2002\u2002号:',
      userName:'行政',
      account:'行政',
      isBOS:false,
      valueType:'rational-suggestion',
      titletxt:'员工提案',
      valueUser:'',
      valueDepart:'',
      valueState:'',
      optionsType:[
        {
          value: 'rational-suggestion',
          label: '员工提案'
        },
        {
          value: 'red-tag',
          label: '红标签'
        },
        {
          value: 'bos',
          label: 'BOS'
        }
      ],
      optionsDepart:[
        {
          value: '生产部门',
          label: '生产部门'
        },
        {
          value: '质量部门',
          label: '质量部门'
        },
        {
          value: '物流部门',
          label: '物流部门'
        },
        {
          value: '维修部门',
          label: '维修部门'
        },
        {
          value: '人事部门',
          label: '人事部门'
        },
        {
          value: 'SHE部门',
          label: 'SHE部门'
        },
        {
          value: '其他部门',
          label: '其他部门'
        }
      ],
      optionsState:[
        {
          value: 'PASS',
          label: '通过'
        },
        {
          value: 'DENY',
          label: '驳回'
        }
      ],
      depart:'',
      state:'',
      dataV:'',
      tableData: [],
      selectList: [],
      dateValue: "",
      nameList: [],
      nameValue: "",
      nameList1: [],
      nameDisabled:true,
      url:'http://119.45.2.113:8888/nalco-rest-dev/v1/staff_history'
    };
  },
  created() {
    if (!window.localStorage.data) {
      this.$router.push("/login");
    }
    let url='http://119.45.2.113:8888/nalco-rest-dev/v1/staff_history'
    this.getColumns(url);
  },
  methods: {
    testDate(){
      let d = new Date().toLocaleDateString()
      window.console.log(d)
    },
    handleChangeType(){
      let type = this.valueType
      switch (type) {
        case 'rational-suggestion':
              this.url='http://119.45.2.113:8888/nalco-rest-dev/v1/staff_history'
              this.titletxt='员工提案'
              break;
        case 'red-tag':
              this.url='http://119.45.2.113:8888/nalco-rb-rt-dev/his/label_history'
              this.titletxt='红标签'
          break;
        case 'bos':
              this.url='http://119.45.2.113:8888/nalco-bos-dev/list_history'
              this.titletxt='BOS'
              this.valueState=""
              this.state=""
              break;
        default:
              this.url='http://119.45.2.113:8888/nalco-rb-rs-dev/his/staff_history'
              break;
      }
      this.getColumns(this.url)
    },
    getresult(){
      this.getColumns(this.url)
    },
    handleChangeDepart(){
      let d= this.valueDepart
      if(d){
        this.depart=this.valueDepart
      }else {
        this.depart=''
      }
      this.getColumns(this.url)
    },
    handleChangeState(){

      let S = this.valueState
      if(S){
        this.state=this.valueState
      }else{
        this.state=''
      }
      this.getColumns(this.url)
    },
    handleChangeDate(){
      var date = this.dateValue
      if(date){
        var y = date.getFullYear();
        var m =
                date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1;
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        console.log(y + "-" + m + "-" + d);
        this.dateV = y + "-" + m + "-" + d;
      }else {
        this.dateV = ''
      }

      this.getColumns(this.url)
    },
    btnReset(){
      this.valueType = "rational-suggestion"
      this.url='http://119.45.2.113:8888/nalco-rb-rs-dev/his/staff_history'
      this.dateV = ""
      this.dateValue=""
      this.depart = ""
      this.valueDepart=""
      this.valueUser = ""
      this.state = ""
      this.valueState=""
      this.getColumns(this.url)
    },
    getColumns(url) {
      var name_bos=this.valueUser? "姓名:"+this.valueUser:""
      if(this.depart=='SHE部门'){
        let d1=this.depart.substring(0,3)
        let d2=this.depart.substring(3,5)
        var depart_bos=this.depart?d2+":"+d1:""
      }else {
        let d1=this.depart.substring(0,2)
        let d2=this.depart.substring(2,4)
        var depart_bos=this.depart?d2+":"+d1:""
      }
      let params = {
        wxid: 'sunke',
        page: '1',
        quantity: '1000',
        time: this.dateV ? this.dateV:'',
        screen: this.valueType!='bos'?this.depart:depart_bos,
        name: this.valueType!='bos'?this.valueUser:name_bos,
        state: this.valueType!='bos'?this.state:''
      };
      axios
        .get(url, {params})
        .then(res => {
          this.tableData = res.data.staff_info;
          var that = this
          if(that.valueType=='bos'){
            that.tableData.forEach(item => {
              var n= item.name
              item.name=n.split(':')[1]
              var d = item.department
              var dp = d.split(':')
              item.department = dp[1]+dp[0]

            })
          }
        })
        .catch(error => {
          window.console.log(error);
          this.errored = true
        })
        .finally(() => {
          this.isBOS = this.valueType=='bos'? true:false
        });

    },
    //选中某条数据时
    handleSelectionChange(row) {
      this.selectList = row; // 将选中的数据给selectList
      //   console.log(this.selectList)
    },
    handleExport() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "请至少选择一条需要导出的数据",
          type: "warning",
        });
        return;
      }
      this.$confirm("该操作将导出选中的数据，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //导出
          require.ensure([], () => {
            const { export_json_to_excel } = require("../plugin/Export2Excel"); //注意这个Export2Excel路径
            const tableHeader = [
              "提案主题",
              "描述",
              "类型",
              "创建人",
              "部门",
              "提案状态",
              "结束时间"
            ]; // 设置Excel表格的表头
            const filterVal = [
              "unsafe_type_",
              "describe",
              "type",
              "name",
              "department",
              "state",
              "date"
            ]; // 跟表格表头对应的绑定的prop
            let list = this.filterTableData(
              JSON.parse(JSON.stringify(this.selectList))
            ); // this.selectList为选中的要导出的数据，用filterTableData方法先处理一下数据格式(要进行深度拷贝，以免过滤的时候，影响页面上展示的数据)，再存到list
            let data = this.formatJson(filterVal, list);
            let dt = new Date().toLocaleDateString()
            let excel_title="纳尔科"+this.titletxt+"历史记录表格_"+dt
            export_json_to_excel(tableHeader, data, excel_title); //最后一个是导出表格的名字
          });
        })
        .catch(() => {});
    },
    formatJson(filterVal, Data) {
      return Data.map((v) => filterVal.map((j) => v[j]));
    },
    filterTableData(data) {
      data.forEach((item) => {
      });
      return data;
    },
    logout(){
      localStorage.clear();//清除页面所有localStorage，退出登录
      this.$router.push("/login");
    }
  },
};
</script>
<style>
  .header{
    height: 8vh;
    background-color: rgb(228, 246, 253);
    border-bottom: solid rgb(181, 186, 187) 1px
  }
  .txt{
    font-size: 14px;
    /*text-align: center;*/
    width: 150px;
    margin-left: 30px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .white_sp{
    white-space:pre-line;
  }
</style>
