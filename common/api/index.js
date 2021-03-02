const http = (name,data,isLoading = true) => {
	const newData = {user_id:'601e61e354a29f0001b6916b',...data}
	if(isLoading){
		uni.showLoading({title:'加载中'})
	}
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name,
			data:newData
		}).then(res=>{
			const {result} = res
			if(result.code === 200){
				resolve(result)
			}else{
				reject(result)
			}
		}).catch(err => {
			uni.showToast({
				title:result.data,
				duration: 2000
			})
		}).finally(res=>{
			if(isLoading){
				uni.hideLoading()
			}
		})
	})
}

export default {
	http
}