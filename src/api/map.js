import request from "@/utils/request";

export function geoGgyGoalList() {
  return request({
    url: "/geo/ggyGoal/list",
    method: "get",
    params: params,
  });
}
//获取分类
export function queryAllSysCategorybyname(params) {
  return request({
    url: "/sys/api/queryAllSysCategorybyname",
    method: "get",
    params: params,
  });
}
// 获取目标点
export function ggyGoalList(params) {
  return request({
    url: "/geo/ggyGoal/list",
    method: "get",
    params: params,
  });
}
//模型列表
export function ggyModelinfoList(params) {
  return request({
    url: "/geo/ggyModelinfo/list",
    method: "get",
    params: params,
  });
}


//计算
export function ggyGoalCalculate(data) {
  return request({
    url: "/geo/ggyGoal/calculate",
    method: "post",
    data: data,
  });
}
//下载
export function ggyGoalExportXls(data) {
  return request({
    url: "/geo/ggyGoal/exportXls",
    method: "post",
    data: data,
  });
}

// 边境线范围内的目标点
export function gyGoalFrontierhave(data) {
  return request({
    url: "/geo/ggyGoal/frontierhave",
    method: "post",
    data: data,
  });
}

// 得到矩阵下拉list
export function gyGoalMatrixlist(params) {
  return request({
    url: "/geo/ggyGoal/matrixlist",
    method: "get",
    params: params,
  });
}

// 分页列表查询,地图页面的搜索接口
export function gyGoalMaplist(params) {
  return request({
    url: "/geo/ggyGoal/maplist",
    method: "get",
    params: params,
  });
}

// 全地图所有目标点
export function gyGoalMapall(params) {
  return request({
    url: "/geo/ggyGoal/mapall",
    method: "get",
    params: params,
  });
}

// 修改矩阵接口
export function gyGoalEditmatrix(data) {
  return request({
    url: "/geo/ggyGoal/editmatrix",
    method: "post",
    data: data,
  });
}

// 根据id返回如：目标类型的对象
export function sysCategoryusebyid(params) {
  return request({
    url: "sys/api/SysCategoryusebyid",
    method: "get",
    params: params,
  });
}