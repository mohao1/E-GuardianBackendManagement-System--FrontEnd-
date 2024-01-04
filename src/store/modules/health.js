import {GetOlderHealth , GetTodayHealth } from '@/api/health'

const state ={
    OldsterHealthList:[],
    TodayHealth:{}
}

const mutations = {
    SET_OLDSTER: (state, OldsterHealthList) => {
      state.OldsterHealthList=OldsterHealthList
    },
    SET_TODAYHEALTH: (state, TodayHealth) => {
        state.TodayHealth=TodayHealth
      }
  }

const actions = {
    getOldsterHealth({ commit ,state},userId) {
        return new Promise((resolve, reject) => {
            if(state.OldsterHealthList.length!==0 && state.OldsterHealthList[0].userId===userId){
                resolve()
                return 
            }
            GetOlderHealth(userId).then(
                res=>{
                    commit("SET_OLDSTER",res.data)
                    resolve()
                }
            ).catch(e=>{
                reject(e)
            })
          })
    },
    getTodayHealth({ commit },userId){
        new Promise((resolve, reject) => {
            GetTodayHealth(userId).then(
                res=>{
                    commit("SET_TODAYHEALTH",res.data)
                    resolve()
                }
            ).catch(e=>{
                reject(e)
            })
          })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }