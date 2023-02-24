<template>
  <div class="table">
    <!-- <el-table
      v-show="tableData.length > 0"
      ref="singleTable"
      :data="tableData"
      height="300"
      highlight-current-row
      style="width: 100%"
      
    > -->
    <el-table
      v-show="tableData.length > 0"
      ref="singleTable"
      :data="tableData"
      height="300"
      highlight-current-row
      style="width: 100%"
      :stripe="true"
      :border="true"
      align="center"
      
    > 
    <!-- @selection-change="onSelectedLocation" -->
      <!-- <el-table-column  width="50"> </el-table-column> -->
      <el-table-column align="center" property="name" label="名称"> </el-table-column>
      <el-table-column align="center" property="threatenEvaluate" label="威胁评分"> </el-table-column>
      <el-table-column align="center" property="longitude" label="经度"> </el-table-column>
      <el-table-column align="center" property="latitude" label="纬度"> </el-table-column>
      <el-table-column align="center" property="type" label="类别"> </el-table-column>
    </el-table>

    <el-pagination class="pagination"
    v-show="tableData.length > 0"
    align='center' 
    layout="prev, pager, next"
    :total="page.total"
    :page-size="page.pageSize" 

   @current-change="handleCurrentChange"
   background
    >
  </el-pagination>

    <!-- <el-pagination 
    v-show="tableData.length > 0"
    align='center' 
   @size-change="handleSizeChange" 
   @current-change="handleCurrentChange"
   :current-page="page.pageNo" 
   :page-sizes="[1,5,10,20]" 
   :page-size="page.pageSize" 
   layout="total, sizes, prev, pager, next, jumper" 
   :total="tableData.length">
</el-pagination> -->
  </div>
</template>

<script>
import {
  sysCategoryusebyid
} from "@/api/map";
export default {
  props: {
    tableData: {
      default: [],
      type: Array,

    },
    page:{
      default: {},
      type: Object,
    },
    searchList:{
      default: function(){
      },
      type: Object,
    }

  },
  data() {
    return {
      tableDataNew:{},
      // selectedLocation: [],
      // page.pageNo: 1, // 当前页码
      // total: 20, // 总条数
      // page.pageSize: 5 // 每页的数据条数
    };
  },
  watch: {
  },
  methods: {
    //勾选列表
    // onSelectedLocation(e) {
    //   this.$bus.$emit("onSelectedLocation", e);
    // },
    // click(){
    //   console.log(this.tableData)
    // }
    // handleSizeChange(val) {
    //      console.log(`每页 ${val} 条`);
    //      this.page.pageNo = 1;
    //      this.page.pageSize = val;
    //  },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.page.pageNo = val
         this.$emit('searchList',val)
         console.log('table',this.tableData)
         console.log(this.page)
     }
  },
};
</script>

<style scoped lang="scss"> 

  .pagination{
    display: flex;
    justify-content: end;
    margin-top: 20px;
}
</style>