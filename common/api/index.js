const http = (name,data) => {
	const newData = {user_id:'601e61e354a29f0001b6916b',...data}
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
		})
	})
}

export default {
	http
}