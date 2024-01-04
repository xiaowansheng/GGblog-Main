import { http } from "@/utils/http";
// import Result from "./constant/result";
export type FileDto = {
  name: string
  path: string
  link: string
  type: string
}
/**
 * 获取阿里云oss授权上传凭证
 * @param params
 * @param config
 * @returns
 */
export const getOss = (dir:string,params: any) => {
  return http.get(
    "/upload/oss/access/info/"+dir,
    params
  );
};


/**
 * 自定义上传
 * @param params
 * @param config
 * @returns
 */
export const uploadFile = (data: any) => {
  return http.post(
    "/file/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
