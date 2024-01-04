import request from '@/utils/request'

export function GetHomeList(){
    return request({
        url:"/Management/GetHomeDataList",
        method:"GET",
    })
}