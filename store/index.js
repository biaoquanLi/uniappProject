import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		userInfo: uni.getStorageSync('userInfo') || {},
		historyList: uni.getStorageSync('historyList')||[]
	},
	mutations:{
		SET_USER_INFO(state,userInfo){
			state.userInfo = userInfo
			uni.setStorageSync('userInfo',userInfo)
		},
		SET_HISTORY_LIST(state,historyList){
			state.historyList = historyList
		},
		CLEAR_HISTORY_LIST(state){
			state.historyList = []
		}
	},
	actions:{
		set_user_info({commit},userInfo){
			commit('SET_USER_INFO',userInfo)
		},
		set_history_list({commit,state},history){
			let historyList = state.historyList
			historyList.unshift(history)
			uni.setStorageSync('historyList',historyList)
			commit('SET_HISTORY_LIST',historyList)
		},
		clear_history_list({commit}){
			uni.removeStorageSync('historyList')
			commit('CLEAR_HISTORY_LIST')
		}
	}
})

export default store