import request from '@/utils/request'

export function GetOlderOldsterList(){
    return request({
        url:"/Management/GetOldsterDataList",
        method:"GET",
    })
}