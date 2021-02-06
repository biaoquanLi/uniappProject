<template>
	<view class="content">
		<navbar></navbar>
		<tab :list="labelList"></tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelList:[]
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel(){
				uniCloud.callFunction({
					name:'label_list'
				}).then(res=>{
					const {result} = res
					if(result.code === 200){
						this.labelList = result.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
