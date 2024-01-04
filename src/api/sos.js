import request from '@/utils/request'

export function GetSosList(){
    return request({
        url:"/Management/SelectRecordList",
        method:"GET",
    })
}

export function GetSosToDaysList(data){
    return request({
        url:"/Management/SelectRecordListByTime",
        method:"POST",
        data:{
            time:data
        }
    })
}

export function GetoldsterName(data){
    return request({
        url:"/Words/Written/GetOldster",
        method:"POST",
        data:{
            senderId:data
        }
    })
}