import request from '@/utils/request'

export function GetYounger(){
    return request({
        url:"/Management/GetYoungerDataList",
        method:"GET",
    })
}