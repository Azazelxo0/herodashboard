import { BASE_URL } from "./baseurl";
import { commonApi } from "./commonApi";


export const getreq = async(reqHeader,searchKey)=>{
    return await commonApi('GET',`${BASE_URL}/hero/req?search=${searchKey}`,'',reqHeader)
}

export const deletegrevApi = async(reqHeader,projectId)=>{
    return await commonApi("DELETE",`${BASE_URL}/hero/delete/${projectId}`,{},reqHeader)
}

export const loginApi = async(userDetails)=>{
    return await commonApi ("POST", `${BASE_URL}/hero/login`,userDetails,"")
}

