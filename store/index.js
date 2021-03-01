import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		historyList: uni.getStorageSync('historyList')||[]
	},
	mutations:{
		SET_HISTORY_LIST(state,historyList){
			state.historyList = historyList
		},
		CLEAR_HISTORY_LIST(state){
			state.historyList = []
		}
	},
	actions:{
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