<template>
  <div class="page">
    <!-- 左边 -->

    <div class="left-box animate__animated animate__bounceInLeft">
      <div class="pannel">
        <!-- <div class="el-card__header">
          <span>筛选条件</span>
        </div>
        <div class="item">
          <el-input
            placeholder="请输入内容"
            v-model="goals.name"
            clearable
            class="input-with-select"
          >
            <el-select
              slot="prepend"
              v-model="goals.data"
              popper-class="left-select"
              clearable
              multiple
              :collapse-tags="true"
              placeholder="请选择"
              style="width: 130px"
            >
              <el-option
                v-for="item in goals.list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
           <el-button @click="search" :disabled="!this.goals.data"
            >搜索
            </el-button
          >
        </div> -->

        <!-- <el-checkbox-group v-model="checkeddata2">
    <el-checkbox v-for="point in tableData2" :label="point" :key="point">{{point}}</el-checkbox>
    </el-checkbox-group>  -->

        <div class="el-card__header">
          <span>筛选条件</span>
        </div>
        <div class="pannel_top">
          <div class="selectDiv">
            <span class="leftBoxSpan">类型：</span>
            <el-select
              slot="prepend"
              v-model="goals.data"
              popper-class="left-select"
              clearable
              multiple
              :collapse-tags="true"
              placeholder="请选择"
              style="width: 130px"
              @change="selectGoalsOptionValue = goals.data"
            >
              <el-option
                v-for="item in goals.list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="selectDiv">
            <span class="leftBoxSpan">区域：</span>
            <el-select
              slot="prepend"
              v-model="location.data"
              popper-class="left-select"
              clearable
              multiple
              :collapse-tags="true"
              placeholder="请选择"
              style="width: 130px"
              @change="selectLocationOptionValue = location.data"
            >
              <el-option
                v-for="item in location.list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="pannel_bottom">
          <span class="leftBoxSpan">目标名称：</span>
          <el-input
            placeholder="请输入目标名称"
            v-model="goals.name"
            clearable
            class="input-with-select"
          ></el-input>

          <el-button slot="append" @click="search" type="primary">
            搜索
          </el-button>
          <el-button type="info" @click="resetPage">重置</el-button>
        </div>
      </div>
      <searchList
        :table-data="search_list"
        :page="page"
        @searchList="searchList"
      />
      <!-- <div class="pannel">
        <div class="el-card__header">
          <span>模型选择</span>
        </div>
        <div v-for="item in models.list" :key="item.id" class="text item">
          <div>{{ item.name }}</div>

          <el-radio-group v-model="models.data[item.id]">
            <el-radio
              v-for="iitem in item.children"
              :key="iitem.id"
              :label="iitem.id"
              >{{ iitem.modelname }}</el-radio
            >
          </el-radio-group>
        </div>
        <el-button @click="handleCalc" :disabled="calcBtndisabled"
          >计算</el-button
        >
      </div> -->
      <div class="distanceSelect" v-show="showDistanceSelect">
        <span>距离(km)</span>
        <el-slider
          @change="onChangeDistanceSelect"
          v-model="distanceSelectValue"
          show-input
          :max="10000"
        >
        </el-slider>
      </div>

      <div v-show="search_list.length>0">
        <span class="leftBoxSpan">矩阵层级：</span>
        <el-select
          @change="diaLogOpen"
          class="selectThreaten"
          :popper-append-to-body="false"
          v-model="selectMatrix"
          placeholder="请选择矩阵层级"
        >
          <el-option
            :style="{ 'min-width': '200px' }"
            v-for="item in selectThreaten"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <!-- <el-button class="showThreaten" type="primary" @click="handleCalc">显示威胁列表</el-button> -->
      <div class="dialogTable">
        <el-dialog
          :title="dialogTableTitle"
          align="center"
          :visible.sync="dialogTableVisible"
          :append-to-body="true"
          @close="selectMatrix = ''"
          ><span class="dialogTableSpan"
            >（矩阵修改数据请与原数据格式保持一致）</span
          >
          <el-table
            :data="dataListNew"
            @cell-dblclick="dblclick"
            :cell-class-name="tableCellClassName"
            :stripe="true"
            :border="true"
            align="center"
            height="300"
            v-if="dialogTableType == 1"
          >
            <el-table-column
              v-for="(item, index) in dataColum"
              :key="index"
              align="center"
              :label="item"
            >
              <template slot-scope="scope">
                <el-input
                  @blur="hideInput"
                  size="mini"
                  :ref="scope.row.index + ',' + scope.column.index"
                  v-model="dataListChange"
                  v-if="
                    scope.row.index + ',' + scope.column.index == currentCell &&
                    scope.column.index != 0 &&
                    showMatrixTable
                  "
                >
                </el-input>
                <span v-else>{{ scope.row[index] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-table 
              :data="dataListNew[0]"
              style="width:100%"
              @cell-dblclick="dblclick"
              :cell-class-name="tableCellClassName"
              :stripe="true"
              :border="true"
              align="center"
              height="300"
              type="index"
                :index="indexMethod"
              >
              <el-table-column

                  :label="dataColum[0]"
                  >
                </el-table-column>
              <el-table-column
                v-for="(item, index) in dataColumNew"
                :key="item"
                align="center"
                :label="item"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row[index] }}</span>
                </template>
              </el-table-column>
            </el-table> -->

          <el-table
            v-else-if="dialogTableType == 2"
            :data="dataListNew"
            style="width: 100%"
            @cell-dblclick="dblclick"
            :cell-class-name="tableCellClassName"
            :stripe="true"
            :border="true"
            align="center"
            height="300"
          >
            <el-table-column
              v-for="(item, index) in dataColum"
              :key="index"
              align="center"
              :label="item"
            >
              <template slot-scope="scope">
                <el-input
                  @blur="hideInput"
                  size="mini"
                  :ref="scope.row.index + ',' + scope.column.index"
                  v-model="dataListChange"
                  v-if="
                    scope.row.index + ',' + scope.column.index == currentCell &&
                    scope.column.index != 0 &&
                    showMatrixTable
                  "
                >
                </el-input>
                <span v-else>{{ scope.row[index] }}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="dialogBtn">
            <el-button type="primary" @click="dialogSave">保存</el-button>
            <el-button
              @click="(dialogTableVisible = false), (selectMatrix = '')"
              >取消</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="map-box">
      <div id="map">
        <div class="tool">
          <!-- <el-button
            type="primary"
            :disabled="drawBtndisabled"
            @click.stop="drawRound"
            >圆形筛选</el-button
          >
          <el-button
            type="primary"
            :disabled="drawBtndisabled"
            @click.stop="drawPolygon"
            >多边形筛选</el-button
          > -->
          <el-button type="primary" @click.stop="drawPolyline"
            >标绘边界线</el-button
          >
          <!-- <el-button type="primary" @click.stop="drawMaker">绘制点</el-button> -->
          <el-button type="danger" @click.stop="reset">重置</el-button>
        </div>
        <div class="choose" v-show="chooseShow">
          <el-button type="warning" @click.stop="revoke">撤回</el-button>
          <el-button type="danger" @click.stop="deletes">删除</el-button>
          <el-button type="success" @click.stop="success">完成</el-button>
        </div>
      </div>
    </div>

    <div
      class="right-box pannel animate__animated animate__bounceInRight"
      v-show="drawerRight"
    >
      <div class="el-card__header">
        <span>结果列表</span>
        <button
          type="button"
          class="el-dialog__headerbtn"
          @click="drawerRight = false"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <result :table-data="tableData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import maps from "../map";
import result from "@/views/components/result";
import searchList from "@/views/components/search-list";
import debounce from "@/utils/debounce.js"

import {
  queryAllSysCategorybyname,
  ggyGoalList,
  ggyModelinfoList,
  ggyGoalCalculate,
  ggyGoalExportXls,
  gyGoalFrontierhave,
  gyGoalMatrixlist,
  gyGoalMaplist,
  gyGoalMapall,
  gyGoalEditmatrix,
  sysCategoryusebyid
} from "@/api/map";
import { forEach, forIn, map as MAP } from "lodash";

let BM;
let map;
let draw;
let temp;
let HTTP_URL = "http://localhost:9000";
// let MAP_ID = 'bigemap.0mz2j9o9'
let MAP_ID = "bigemap.4k2ke5tv";
let MAP_ID2 = "bigemap.c1w6sw8z";
// let HTTP_URL = "http://www.bigemap.com:9000";
// let MAP_ID = "bigemap.zhongkexingtu";
//创建一个图形覆盖物的集合来保存点线面
var drawnItems;
export default {
  components: { result, searchList },
  data() {
    return {
      dialogTableType: 0, // 矩阵类型1，2
      dialogTableObj: {
        name: "",
        matrix: null,
      }, // 修改后对象
      dialogTableTitle: "", // 表格名
      showTable: true,
      // 分页
      page: {
        pageNo: 1,
        pageSize: 5,
        total: null,
      },

      // 类型 区域
      selectGoalsOptionValue: [],
      selectLocationOptionValue: [],

      showMatrixTable: true, //显示矩阵层级表格
      dataListChange: "",
      dataListChangeArr: [],
      dialogTableVisible: false,
      currentCell: null,

      selectMatrix: "",
      selectThreaten: [],

      dataListNew: [],
      dataColum: [],
      dataColumNew: [],
      dataList: [],

      // 距离选择是否显示
      distanceSelectValue: 0,
      showDistanceSelect: false,

      drawerLeft: true,
      drawerRight: false,
      chooseShow: false,

      search_list: [], //检索点后台返回数据
      marker_arr: [], //检索点数据
      in_arr: [], //范围内点数据
      not_in_arr: [], //范围外点数据
      markers: null, //地图标注
      screenStatus: false, //是否框选

      draw_arr: {
        frontierDrop: [],
        value: 0,
      }, // 绘制边界线点
      result_list: [], // 绘制边境线目标点数组

      drawType: "", //绘画类型
      data: {
        //三种画法保存的地图数据
        polygon: null,
        circle: null,
        polyline: null,
      },
      //筛选条件数据和列表
      goals: {
        data: "",
        name: "",
        list: [
          {
            name: "全部",
            id: "",
          },
        ],
      },
      location: {
        data: "",
        name: "",
        list: [
          {
            name: "全部",
            id: "",
          },
        ],
      },
      //模型数据和列表
      models: {
        data: {},
        list: [],
      },
      //结果
      tableData: [],
    };
  },
  created() {},
  computed: {
    //计算按钮禁用状态
    calcBtndisabled() {
      let status = true;
      forIn(this.models.data, function (value, key) {
        if (value != "") {
          status = false;
        }
      });
      return status;
    },
    // 绘制按钮
    drawBtndisabled() {
      if (this.markers) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.getMatrixList();
    // this.$bus.$on("onSelectedLocation", this.onSelectedLocation);
    //
    maps.then(() => {
      BM = window.BM;
      BM.Config.HTTP_URL = HTTP_URL;
      // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.googlemap-streets，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
      map = BM.map("map", null, {
        center: [0, 0],
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
      });
      var layer1 = BM.tileLayer(MAP_ID)
        .addTo(map)
        .on("load", function (argument) {
          layer1.options.maxNativeZoom = 5;
          layer1.options.maxZoom = 12;
          map.setMaxZoom(12);
        });

      var layer2 = BM.tileLayer(MAP_ID2)
        .addTo(map)
        .on("load", function (argument) {
          // layer2.options.maxNativeZoom=12;
          // layer2.options.maxZoom=12;
          map.setMaxZoom(12);
        });

      // map = BM.map("map", MAP_ID, {
      //   center: [0, 0],
      //   zoom: 14,
      //   zoomControl: true,
      //   attributionControl: false,
      // });

      map.fitBounds([
        [25.09204864501953, 82.99107360839844],
        [40.437604904174805, 112.89484405517578],
      ]);
      drawnItems = new BM.FeatureGroup();

      map.addLayer(drawnItems);

      //监听绘画完成事件
      map.on(BM.Draw.Event.CREATED, (e) => {
        var layer = e.layer;
        temp = {
          layer: e.layer,
          type: e.layerType,
        };
        this.draw_arr.frontierDrop = e.layer.editing.latlngs[0];

        console.log("draw_arr", this.draw_arr);
        // console.log(11,this);
        this.data[this.drawType] = layer;
        drawnItems.addLayer(layer);
        //判断是多边形还是圆形

        if (e.layerType == "polygon") {
          this.resetScreenData();
          this.screenStatus = true;
          //判断哪些点在多边形里
          let polygonlatlng = layer.getLatLngs();

          //polygon的平面左边数组
          let ps = polygonlatlng[0].map((v) => {
            let arr = [v.lat, v.lng];
            return [map.project(arr).x, map.project(arr).y];
          });

          this.marker_arr.forEach((v) => {
            let latlng = v.getLatLng();
            //点的平面坐标
            var point = map.project([latlng.lat, latlng.lng]);
            if (this.isIn([point.x, point.y], ps)) {
              this.in_arr.push(v.id);
            } else {
              this.not_in_arr.push(v.id);
            }
          });
        } else if (e.layerType == "circle") {
          this.resetScreenData();
          this.screenStatus = true;
          //比较中心点
          let center = layer.getLatLng();
          let radius = layer.getRadius();

          this.marker_arr.forEach((v) => {
            let latlngs = [v.getLatLng(), center];
            //计算距离
            let distance = map.distance(latlngs[0], latlngs[1]);
            if (distance <= radius) {
              this.in_arr.push(v.id);
            } else {
              this.not_in_arr.push(v.id);
            }
          });
        }

        this.chooseShow = false;
      });

      axios
        .get("https://geo.datav.aliyun.com/areas_v3/bound/100000.json")
        .then((res) => {
          console.log(11);

          BM.geoJSON(res.data, {
            style: function () {
              return { color: "white", fillOpacity: 0 };
            },
          }).addTo(map);
        });

      this.getAllTarget();
    });
    // this.$alert("这是一段内容", "标题名称", {
    //   confirmButtonText: "确定",
    //   callback: (action) => {
    //     this.$message({
    //       type: "info",
    //       message: `action: ${action}`,
    //     });
    //   },
    // });

    this.queryAllSysCategorybyname();
    this.queryAllSysLocationbyname();
    this.ggyModelinfoRootList();
  },

  beforeDestroy() {
    // this.$bus.$off("onSelectedLocation");
  },

  methods: {
    //绘制点
    drawPoint(data) {
      //登陆聚合对象
      this.markers = new BM.MarkerClusterGroup({
        showCoverageOnHover: false, //不显示边界
        zoomToBoundsOnClick: true, //点击放大到对应位置
        removeOutsideVisibleBounds: false,
        animate: true, //动画
        maxClusterRadius: 50, //缩放半径,
        disableClusteringAtZoom: null, //在指定级别以下禁用缩放
      });
      console.log(this.markers);

      this.markers.addTo(map);

      let mm = [];
      forEach(data, (item) => {
        let marker;
        console.log(item);
        // let iconUrl = `http://www.bigemap.com/mapoffline/marker/${item.weight}.png`;
        let iconUrl = "";
        let color = "";
        if (item.color === 1) {
          iconUrl = "/icon/low.png";
          color = "green";
        } else if (item.color === 2) {
          iconUrl = "/icon/middle.png";
          color = "yellow";
        } else if (item.color === 3) {
          iconUrl = "/icon/high.png";
          color = "red";
        }

        let icon = BM.icon({
          iconUrl: iconUrl,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        if (!item.threatenEvaluate) {
          item.threatenEvaluate = 0;
        }

        console.log(item.name, item.threatenEvaluate);
        marker = BM.marker([item.latitude, item.longitude], { icon: icon })
          .bindTooltip(item.name, {
            direction: "bottom",
            permanent: true,
            className: "my_tooltip",
          })

          // .bindPopup(item.name + "，威胁评分：" + item.threatenEvaluate + '11'); //绑定气泡窗口
          .bindPopup(
            `${item.name}<br/>经度:${item.longitude}<br/>纬度:${item.latitude}
          <br/>危险等级:<br/>威胁评分:${item.threatenEvaluate}
          <br/><div style="display:flex;align-items:center;">威胁颜色:<div style="background-color:${color}; width:12px; height:12px;border-radius:50%;display=inline-block"></div></div>`,
            { className: "bindPopup" }
          );
        //绑定危险等级
        marker.id = item.id;
        mm.push(marker);
      });

      this.marker_arr = mm;
      this.markers.addLayers(mm);
    },
    indexMethod(i) {
      console.log("---", typeof i);
      console.log("this.dataColum", i, this.dataColumNew[i] + "aaa");
      // return this.dataColumNew[i] + 'aaa'
      return i + "a";
    },

    //滑块值改变
    onChangeDistanceSelect() {
      if (this.distanceSelectValue != 0) {
        this.borderRangePoint();
        // console.log(typeof this.borderRangePoint())
        // debounce(this.borderRangePoint(),1000)
        // this.handleCalc()
      }
    },

    // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
    // 拼接后类似这样："1,0","1,1",
    dblclick(row, column) {
      this.showMatrixTable = true;
      this.currentCell = row.index + "," + column.index;
      // this.dataListChange = this.dataListNew[row.index][column.index]
      this.dataListChange =
        this.dataListNew[row.index][column.index].toString();

      console.log(
        "00000",
        this.dataListChange,
        this.dataListNew[row.index][column.index]
      );
      // this.$refs[row.index + "," + column.index].focus();
    },
    // 当input失去焦点的时候，隐藏input
    hideInput() {
      if (this.dataListChange == null || this.dataListChange == "") {
        console.log(this.dataListChange);
        this.showMatrixTable = false;
        return;
      }
      let [row, column] = this.currentCell
        .split(",")
        .map((item) => parseInt(item));

      // this.dataListChange = this.dataListNew[row][column]
      console.log(
        "row " + row,
        "col" + column,
        "data ",
        this.dataListChange,
        this.dataListNew[row][column]
      );
      // this.dataListChange = this.dataListChange.split(",").map(item => parseFloat(item))
      // let temp = this.dataListChange.split(",").map(item => parseFloat(item))
      // this.dataListNew[row][column] = temp
      // this.dataList[row][column-1] = temp

      // this.dataList[]

      if (this.dialogTableType == 1) {
        let newArr = [];
        this.dataListNew[row][column] = parseFloat(this.dataListChange);
        this.dataList.forEach((item, i) => {
          if (item.value === this.dialogTableTitle) {
            item.lable[row][column - 1] = parseFloat(this.dataListChange);
            newArr = JSON.parse(JSON.stringify(item.lable));
          }
          this.showMatrixTable = false;
        });
        this.dialogTableObj.name = this.dialogTableTitle;
        this.dialogTableObj.matrix = newArr;
      } else if (this.dialogTableType == 2) {
        let newArr = [];
        let dataListChangeArr = this.dataListChange
          .split(",")
          .map((item) => parseFloat(item));

        this.dataListNew[row][column] = JSON.parse(
          JSON.stringify(dataListChangeArr)
        );
        console.log(
          "dataListChangeArr",
          JSON.parse(JSON.stringify(dataListChangeArr)),
          this.dataListNew
        );
        this.dataList.forEach((item) => {
          if (item.value === this.dialogTableTitle) {
            console.log(
              "item.lable",
              item.lable,
              row * this.dataColumNew.length + column - 1,
              "lable",
              item.lable[row * this.dataColumNew.length + column - 1]
            );
            item.lable[row * this.dataColumNew.length + column - 1] =
              dataListChangeArr;
            console.log(
              "item.lablelate",
              item.lable[row * this.dataColumNew + column - 1]
            );
            newArr = JSON.parse(JSON.stringify(item.lable));
          }
          this.showMatrixTable = false;
        });
        console.log("newArr", newArr);
        this.dialogTableObj.name = this.dialogTableTitle;
        this.dialogTableObj.matrix = newArr;
      }
      this.currentCell = null;
      this.dataListChange = "";
    },

    // 重置框选数据
    resetScreenData() {
      this.in_arr = [];
      this.not_in_arr = [];
    },
    //判断坐标函数
    isIn(a, b, c) {
      var d = a[0];
      a = a[1];
      var e = !1,
        f,
        h,
        k,
        l,
        m = b.length,
        n = 0;
      for (l = m - 1; n < m; l = n, n += 1) {
        var p = !1;
        f = b[n][0];
        h = b[n][1];
        k = b[l][0];
        l = b[l][1];
        if ((f === d && h === a) || (k === d && l === a)) return c ? !0 : !1;
        if (h < a === l >= a) {
          f = ((k - f) * (a - h)) / (l - h) + f;
          if (d === f) return c ? !0 : !1;
          p = d < f;
        }
        p && (e = !e);
      }
      return e;
    },
    // 查询分类数据
    queryAllSysCategorybyname() {
      queryAllSysCategorybyname({ name: "目标分类" }).then((res) => {
        this.goals.list = this.goals.list.concat(res.result);
        console.log("目标分类", res);
      });
    },
    queryAllSysLocationbyname() {
      queryAllSysCategorybyname({ name: "目标区域" }).then((res) => {
        this.location.list = this.location.list.concat(res.result);
        console.log("目标分类", res);
      });
    },
    // 查询模型
    ggyModelinfoRootList() {
      queryAllSysCategorybyname({ name: "模型分类" }).then(async (res) => {
        this.models.list = await Promise.all(
          MAP(res.result, async (item) => {
            this.$set(this.models.data, item.id, "");
            let children = await ggyModelinfoList({ type: item.id });
            item.children = children.result.records || [];
            return item;
          })
        );
      });
    },
    // 边境线范围内的目标点
    borderRangePoint() {
      this.draw_arr.value = this.distanceSelectValue;
      console.log("draw_arr", this.draw_arr);
      gyGoalFrontierhave(this.draw_arr).then((res) => {
        console.log(res);
        this.result_list = res.result;
        console.log("result_list", this.result_list);
        this.tableData = res.result;
        this.drawerRight = true;

        if (this.markers) {
          this.markers.remove();
          this.markers = null;
        }
        this.drawPoint(this.result_list);
      });
    },

    //得到矩阵下拉list
    getMatrixList() {
      gyGoalMatrixlist().then((res) => {
        console.log("gyGoalMatrixlist", res);
        this.selectThreaten = res.result;
        this.dataList = res.result;
        this.dialogTableTitle = res.value;
        console.log("this.dialogTableTitle = ", res.result);
      });
    },
    //分页列表查询,地图页面的搜索
    searchList(value) {
      this.page.pageNo = value;
      gyGoalMaplist({
        areas: this.selectLocationOptionValue,
        type: this.selectGoalsOptionValue,
        name: this.goals.name,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
      }).then((res) => {
        console.log("res", res);
        this.page.total = res.result.total;
        this.search_list = res.result.records || [];
      });
    },
    // 全地图所有目标点
    getAllTarget() {
      gyGoalMapall().then((res) => {
        this.drawPoint(res.result);
      });
    },
    //修改矩阵接口
    changeMatrix() {
      gyGoalEditmatrix(this.dialogTableObj).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    // 根据id返回如：目标类型的对象
    getSysCategoryusebyid(){
      sysCategoryusebyid().then(res => {
        console.log('根据id返回如：目标类型的对象',res)
      })
    },

    // 删除已绘制图形
    deletes() {
      if (draw && draw._enabled) {
        //正在绘制重启绘制
        draw.disable();
        draw.enable();
      } else {
        //绘制完成删除已绘制的图形
        if (temp) temp.layer.remove();
        draw.enable();
      }
    },
    // 绘制完成
    success() {
      if (draw && draw._enabled) {
        //正在绘制手动完成
        draw._finishShape();
        draw.disable(); //绘制完成关闭绘制
      }
      this.chooseShow = false;
    },
    // 撤回上一步绘制
    revoke() {
      if (!draw || !draw._enabled || !draw._markers.length) {
        alert("没有在绘制哦");
        return;
      } //如果没有绘制过，则不执行撤回操作
      draw.deleteLastVertex();
    },
    // 左界面显示隐藏
    openLeft() {
      this.drawerLeft = !this.drawerLeft;
    },

    // 绘制线
    drawPolyline() {
      this.showDistanceSelect = true;
      this.drawType = "polyline";
      if (this.data[this.drawType]) {
        this.data[this.drawType].remove();
      }
      if (draw && draw._enabled) draw.disable();
      if (!draw || draw.type != "polyline") {
        draw = new BM.Draw.Polyline(map);
      }
      draw.enable();
    },
    // 绘制点
    drawMaker() {
      this.drawType = "marker";
      if (this.data[this.drawType]) {
        this.data[this.drawType].remove();
      }
      if (draw && draw._enabled) draw.disable();
      if (!draw || draw.type != "marker") {
        draw = new BM.Draw.Marker(map, {
          shapeOptions: {
            color: "red",
          },
        });
      }
      draw.enable();
    },
    // 重置
    resetPage() {
      // this.reset()
      this.goals.data = "";
      this.goals.name = "";

      this.location.data = "";

      this.search_list = [];
    },
    reset() {
      this.showDistanceSelect = false;
      this.distanceSelectValue = 0;
      this.removeMarker("circle");
      this.removeMarker("polygon");
      this.removeMarker("marker");
      this.removeMarker("polyline");
      this.marker_arr = [];
      this.in_arr = [];
      this.not_in_arr = [];
      if (this.markers) {
        this.markers.remove();
        this.markers = null;
      }
    },
    // 绘制圆
    drawRound() {
      this.drawType = "circle";
      this.removeMarker("circle");
      this.removeMarker("polygon");
      if (draw && draw._enabled) draw.disable();
      if (!draw || draw.type != "circle") {
        draw = new BM.Draw.Circle(map, {
          shapeOptions: {
            color: "red",
          },
        });
      }

      console.log(draw);
      draw.enable();
    },
    // 删除绘制图形
    removeMarker(type) {
      if (this.data[type]) {
        if (type == "circle" || type == "polygon") {
          this.screenStatus = false;
        }
        this.data[type].remove();
        this.data[type] = null;
      }
    },

    // 查询地图点
    search() {
      if (this.markers) {
        this.markers.remove();
      }
      if (
        this.goals.data != null ||
        this.goals.name != null ||
        this.location.data != null
      ) {
        this.searchList(this.page.pageNo);
      }
      ggyGoalList({
        type: this.goals.data,
        name: this.goals.name,
        pageSize: 9999,
      }).then((res) => {
        
        this.search_list = res.result.records || [];
  
        if (res.result.total) {

          this.drawPoint(res.result.records);
          //   //登陆聚合对象
          //   this.markers = new BM.MarkerClusterGroup({
          //     showCoverageOnHover: false, //不显示边界
          //     zoomToBoundsOnClick: true, //点击放大到对应位置
          //     removeOutsideVisibleBounds: false,
          //     animate: true, //动画
          //     maxClusterRadius: 100, //缩放半径,
          //     disableClusteringAtZoom: null, //在指定级别以下禁用缩放
          //   });

          //   this.markers.addTo(map);

          //   let mm = [];
          //   forEach(res.result.records, (item) => {
          //     let marker;
          //     let icon = BM.icon({
          //       iconUrl: "http://www.bigemap.com/mapoffline/marker/2.png",
          //       iconSize: [30, 30],
          //       iconAnchor: [15, 30],
          //     });

          //     marker = BM.marker([item.latitude, item.longitude], { icon: icon })
          //       .bindTooltip(item.name, {
          //         direction: "bottom",
          //         permanent: true,
          //         className: "my_tooltip",
          //       })

          //       .bindPopup(item.name); //绑定气泡窗口
          //     //绑定危险等级
          //     marker.id = item.id;
          //     mm.push(marker);
          //   });

          //   this.marker_arr = mm;
          //   this.markers.addLayers(mm);
        }
      });
    },
    // 绘制多边形
    drawPolygon() {
      this.drawType = "polygon";
      this.removeMarker("circle");
      this.removeMarker("polygon");
      if (draw && draw._enabled) draw.disable();
      if (!draw || draw.type != "polygon") {
        draw = new BM.Draw.Polygon(map, {
          showArea: false, //不显示面积
          allowIntersection: false, //不允许交叉
          drawError: {
            color: "#b00b00",
            message: "不能绘制交叉的多边形!",
          }, //绘制错误时的提示信息
          shapeOptions: {
            color: "red",
          }, //绘制的多边形的样式
          repeatMode: false, //是否可以重复绘制
        });
      }

      draw.enable();
      this.chooseShow = true;
    },
    // 计算按钮
    handleCalc() {
      // if (this.marker_arr.length <= 0) {
      //   this.$message({
      //     message: "请根据筛选条件搜索点位 ",
      //     type: "warning",
      //   });
      //   return;
      // }
      // if (this.data.polyline == null) {
      //   this.$message({
      //     message: "请先在地图上标绘边境线，再进行计算！",
      //     type: "warning",
      //   });
      //   return;
      // }
      this.ggyGoalCalculate();
    },
    // 移除范围外的点
    deleteMarker() {
      if (this.not_in_arr.length > 0) {
        forEach(this.marker_arr, (item) => {
          if (this.not_in_arr.includes(item.id)) {
            item.remove && item.remove();
          }
        });
      }
    },
    // 提交计算
    // ggyGoalCalculate() {
    //   this.tableData = [];
    //   const goals = this.screenStatus
    //     ? this.in_arr
    //     : MAP(this.marker_arr, "id");

    //   if (goals.length <= 1) {
    //     this.$message({
    //       message: "点位少于2个,无需计算",
    //       type: "warning",
    //     });
    //     return;
    //   }
    //   const models = [];
    //   forIn(this.models.data, function (value, key) {
    //     if (value != "") {
    //       models.push(value);
    //     }
    //   });

    //   const places = MAP(this.data.polyline._latlngs, (item) => {
    //     return {
    //       latitude: item.lat,
    //       longitude: item.lng,
    //     };
    //   });

    //   ggyGoalCalculate({ goals: goals, models: models, places: places }).then(
    //     (res) => {
    //       this.deleteMarker();
    //       this.$message({
    //         message: "查询成功",
    //         type: "success",
    //       });
    //       this.tableData = res.result;
    //       this.drawerRight = true;
    //     }
    //   );
    // },

    ggyGoalCalculate() {
      this.tableData = [];
      const goals = this.screenStatus
        ? this.in_arr
        : MAP(this.marker_arr, "id");

      if (goals.length <= 1) {
        this.$message({
          message: "点位少于2个,无需计算",
          type: "warning",
        });
        return;
      }
      const models = [];
      forIn(this.models.data, function (value, key) {
        if (value != "") {
          models.push(value);
        }
      });

      const places = MAP(this.data.polyline._latlngs, (item) => {
        return {
          latitude: item.lat,
          longitude: item.lng,
        };
      });
      console.log(goals, places, models);
      ggyGoalCalculate({ goals: goals, models: ["1"], places: places }).then(
        (res) => {
          this.deleteMarker();
          this.$message({
            message: "查询成功",
            type: "success",
          });
          this.tableData = res.result;
          this.drawerRight = true;
        }
      );
    },

    // 地点多选
    // onSelectedLocation(e) {

    //   if (this.markers) {
    //     this.markers.remove();
    //   }
    //   this.drawPoint(e);
    // },

    diaLogOpen(e) {
      this.dialogTableTitle = e;
      this.dialogTableVisible = true;
      this.dataListNew = [];
      this.dataColumNew = [];

      this.dataList.forEach((item, i) => {
        if (item.value === e) {
          this.dialogTableType = item.type;
          this.dataColum = item.header;

          item.header.forEach((item, i) => {
            if (i != 0) {
              this.dataColumNew.push(item);
            }
          });
          if (this.dialogTableType == 1) {
            this.dataListNew = JSON.parse(JSON.stringify(item.lable));
            console.log(" this.dataListNew.push", this.dataListNew);
          } else if (this.dialogTableType == 2) {
            let arr = [];
            let temp = [];
            arr = JSON.parse(JSON.stringify(item.lable));
            console.log("this.dialogTableType", temp);
            arr.forEach((item, i) => {
              // console.log('item',(i+1) / this.dataColumNew.length)
              // if((i+1)%this.dataColumNew.length == 0){
              //   temp.push(this.dataColumNew[(i+1) / this.dataColumNew.length])
              // }
              temp.push(item);
              if ((i + 1) % this.dataColumNew.length == 0) {
                console.log("if", item, temp);
                this.dataListNew.push(JSON.parse(JSON.stringify(temp)));
                temp = [];
              }
            });
            console.log("this.this.dataListNew", this.dataListNew);
          }
        }
      });

      this.dataListNew.forEach((item, i) => {
        // item.forEach((item,i) => {
        item.unshift(this.dataColumNew[i]);
        // })
      });

      console.log("this.dataListNew", this.dataListNew);
    },

    dialogSave() {
      this.dialogTableVisible = false;
      this.selectMatrix = "";
      if (
        this.dialogTableObj.name == "" ||
        this.dialogTableObj.name == undefined
      )
        return;
      this.changeMatrix();
      this.dialogTableObj = {};
    },
  },
};
</script>
<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.map-box {
  flex: 1;
  width: 1;
  height: 100%;
  position: relative;

  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
.tittext {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 10;
}
.el-card__header {
  border: none;
  span {
    font-size: 18px;
  }
}
.tool {
  position: absolute;
  z-index: 10;
  right: 1rem;
  top: 10px;
  display: inline-flex;
  flex-direction: row;
  align-content: flex-start;

  .el-button {
    margin: 0;
    margin-left: 10px !important;
  }
}

.choose {
  position: absolute;
  bottom: 10%;
  z-index: 10;
  left: 50%;
}


.dialogTableSpan{
  color: red; 
  font-size: 12px;
  display: block;
  margin: -20px 0 20px;
}


  .dialogBtn {
  display: flex;
  justify-content: end;
  /* background-color: #bfa; */
  margin-top: 5px;
}


.left-box {
  width: 490px;
  .leftBoxSpan {
    font-size: 14px;
  }

  .selectThreaten {
    margin: 20px auto;
    width: 310px;
    ::v-deep .el-select-dropdown {
      min-width: 200px !important;
    }
  }

  .distanceSelect {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* width:200px; */
    .el-slider--with-input {
      width: 296px;

      ::v-deep .el-input-number--small {
        width: 115px !important;
        display: inline-block;
      }
    }
    span {
      font-size: 16px;
      display: inline-block;
      margin-right: 20px;
    }
  }
}
.left-box,
.right-box {
  min-width: 300px;
  overflow-y: auto;
  padding: 0 20px;
  .el-radio-group {
    display: flex;
    flex-direction: column;
    & > * {
      margin: 10px 0;
    }
  }
  .pannel {
    margin-bottom: 10px;
    /* background-color: #bfa; */
    .pannel_top {
      /* width:100%; */
      padding-left: 14px;
      margin-top: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      ::v-deep .el-input--suffix {
        width: 143px;
      }
      .selectDiv {
        display: inline;
        margin-right: 24px;
        /* background-color: #aaa; */
        line-height: 50px;
        height: 50px;
      }
    }
    .pannel_bottom {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* background-color: #aaa; */
      .input-with-select {
        width: 154px;
        /* margin-left: -28px */
        /* margin-right: 40px; */
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .item {
    text-align: left;
    ::v-deep .el-select .el-input {
      width: 120px;
    }
  }
}

.bindPopup {
  background-color: red;
  div {
    width: 2px;
    height: 2px;
  }
}
</style>
