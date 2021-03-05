import store from '../../store/index.js'
const http = (name,data,isLoading = true) => {
	const newData = {user_id:store.state.userInfo._id,...data}
	if(isLoading){
		uni.showLoading({title:'加载中'})
	}
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name,
			data:newData
		}).then(res=>{
			if(isLoading){
				uni.hideLoading()
			}
			const {result} = res
			if(result.code === 200){
				resolve(result)
			}else{
				reject(result)
			}
		}).catch(err => {
			if(isLoading){
				uni.hideLoading()
			}
			uni.showToast({
				title:'数据加载失败',
				icon:'none',
				duration: 2000
			})
		})
	})
}

export default {
	http
}