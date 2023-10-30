import { ElMessage } from "element-plus";

import shortUUID from 'short-uuid'
// 创建 ShortUUID 实例
const uuidInstance = shortUUID();
/**
 * 
 * @param message 例子：xxx/id/1
 * @returns 
 */
export function getQueryString(message: string): string {
  let href: String = window.location.href;
  let arr: string[] = href.split("/");
  // console.log("arr", arr);
  let param = arr[arr.length - 1];
  let id = Number.parseInt(param);
  // console.log("id=", id);
  if (!isNaN(id)) {
    return id.toString();
  } else {
    // ElMessage({
    //   showClose: true,
    //   message: message,
    //   type: "error",
    // });
  }
  return "";
}
/**
 * 
 * @param param 例子：xxx/query?id=1
 * @returns 
 */
export function getParam(param: string) {
  let url = location.href;
  // console.log(url);
  let value = "";
  try {
    let strs: Array<string> = url.split("?");
    if (strs[1] != undefined) {
      let params = strs[1].split("&");
      // console.log("", params);
      let ps: Array<{
        key: string;
        value: string;
      }> = [];
      params.forEach((e) => {
        let p = e.split("=");
        ps.push({
          key: p[0],
          value: p[1],
        });
      });
      // console.log("", ps);
      ps.forEach((e) => {
        if (e.key == param) {
          value = e.value;
        }
      });
    }
  } catch (error) {
    // ElMessage({
    //   showClose: true,
    //   message: "参数错误！",
    //   type: "error",
    // });
  }
  if (value == "") {
    // ElMessage({
    //   showClose: true,
    //   message: "参数没有找到！",
    //   type: "error",
    // });
    return null;
  } else {
    return value;
  }
}

/**
 * 创建一个短的uuid
 * @returns 
 */
export function shortUuid() {
  return uuidInstance.new()
}