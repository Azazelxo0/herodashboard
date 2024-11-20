import { BASE_URL } from "./baseurl";
import { commonApi } from "./commonApi";


export const getreq = async(searchKey)=>{
    return await commonApi('GET',`${BASE_URL}/hero/req?search=${searchKey}`,"","")
}

export const deletegrevApi = async(projectId)=>{
    return await commonApi("DELETE",`${BASE_URL}/hero/delete/${projectId}`,{},"")
}

export const loginApi = async(userDetails)=>{
    return await commonApi ("POST", `${BASE_URL}/hero/login`,userDetails,"")
}