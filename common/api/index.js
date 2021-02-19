const http = (object) => {
	const {data,url} = object
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name:url,
			data
		}).then(res=>{
			const {result} = res
			if(result.code === 200){
				resolve(result.data)
				// this.labelList = result.data
			}else{
				reject(result.data)
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