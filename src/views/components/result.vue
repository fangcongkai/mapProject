<template>
  <!-- <el-drawer
  title="我是标题"
  :visible.sync="drawer"

  > -->

  <div>
    <el-table
      ref="singleTable"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      highlight-current-row
      height="450"
      width="600"
      :stripe="true"
      :border="true"
      align="center"
    >
      <el-table-column align="center" property="name" label="名称" width="120">
      </el-table-column>
      <el-table-column
        align="center"
        property="cname"
        label="目标类型"
        width="80"
      >
      </el-table-column>
      <el-table-column
        align="center"
        property="longitude"
        label="经度"
        width="50"
      >
      </el-table-column>
      <el-table-column
        align="center"
        property="latitude"
        label="纬度"
        width="50"
      >
      </el-table-column>
      <el-table-column
        align="center"
        property="threatenEvaluate"
        label="威胁评分"
        width="80"
      >
      </el-table-column>
      <el-table-column
        align="center"
        property="threatenLevel"
        label="威胁等级"
        width="80"
      ></el-table-column>

      <!-- <el-table-column align="center" property="latitude" label="区域" width="50" >
      </el-table-column> -->

      <!-- <el-table-column align="center" property="latitude" label="海拔" width="50" >
      </el-table-column> -->
      <!-- <el-table-column label="排名">
         <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> 
      </el-table-column>  -->
    </el-table>

    <el-pagination
      class="pagination"
      v-show="tableData.length > 0"
      align="center"
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
    >
    </el-pagination>
    <el-button
      type="primary"
      style="margin-top: 15px"
      :disabled="tableData.length <= 0"
      :loading="downloadLoading"
      @click="handleDownload"
    >
      导出excel
    </el-button>
  </div>

<!-- </el-drawer> -->
</template>

<script>
export default {
  props: {
    tableData: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      drawer:true,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数

      index: 0,
      downloadLoading: false,
      autoWidth: true,
      bookType: "xlsx",
    };
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    formatJson(filterVal, jsonData) {
      let i = 0;
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else if (j === "index") {
            return ++i;
          } else {
            return v[j];
          }
        })
      );
    },
    handleDownload() {
      console.log(this.tableData);
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "名称",
          "目标类型",
          "经度",
          "纬度",
          "威胁评分",
          "威胁等级",
        ];
        const filterVal = [
          "name",
          "type",
          "longitude",
          "latitude",
          "threatenEvaluate",
          "threatenLevel",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "计算结果",
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        });
        this.downloadLoading = false;
      });

      console.log("11111111111", this.tableData);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>