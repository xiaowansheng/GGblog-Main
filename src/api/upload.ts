import { http } from "@/utils/http";
// import Result from "./constant/result";

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

