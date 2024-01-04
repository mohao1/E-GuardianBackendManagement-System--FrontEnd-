import request from '@/utils/request'

export function GetCommunityList(){
    return request({
        url:"/Management/GetCommunityDataList",
        method:"GET",
    })
}

export function GetCommunityAdminList(){
    return request({
        url:"/Management/GetCommunityAdminDataList",
        method:"GET",
    })
}


export function GetCommunityUserList(){
    return request({
        url:"/Management/GetCommunityUserDataList",
        method:"GET",
    })
}