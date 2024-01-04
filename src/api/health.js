import request from '@/utils/request'

export function GetOlderHealth(userId){
    return request({
        url:"/Management/GetOldsterHealthDataDays",
        method:"POST",
        data:{
            "oldsterId":userId
        }
    })
}


export function GetTodayHealth(userId){
    return request({
        url:"/Management/GetOldsterHealthData",
        method:"POST",
        data:{
            "oldsterId":userId
        }
    })
}