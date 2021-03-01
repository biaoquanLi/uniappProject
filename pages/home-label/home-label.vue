<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="changeStatus" >{{isEdit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view  class="label-content" >
				<view class="label-content__item" v-for="(item,index) in myLabelList" :key="index">
					{{item.name}}
					<uni-icons v-if="isEdit" class="icons-close" type="clear" size="18" color="red" @click="del(index)"></uni-icons>
				</view>
				<view  class="no-data" v-if="myLabelList.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
	
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading"  status="loading" iconType="snow"></uni-load-more>
			<view  class="label-content" >
				<view class="label-content__item" v-for="(item,index) in recommendLabelList" :key="index" @click="add(index)">{{item.name}}</view>
			</view>
			<view  class="no-data" v-if="recommendLabelList.length === 0 && !loading">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false, // 是否是编辑状态
				myLabelList:[],
				recommendLabelList: [],
				loading:false
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods:{
			changeStatus(){
				if(this.isEdit){ // 编辑完成状态
					this.setUpdateLabel(this.myLabelList)
				}
				this.isEdit = !this.isEdit
			},
			getLabel(){
				this.loading = true
				this.$api.http('get_label',{type:'all',user_id:'601e61e354a29f0001b6916b'}).then(({code,data})=>{
					if(code === 200){
						this.myLabelList = data.filter(item => item.current)
						this.recommendLabelList = data.filter(item => !item.current)
					}else{
						uni.showToast({
							title:'获取标签失败',
							icon:'none'
						})
					}
				}).finally(()=>{
					this.loading=false
				})
			},
			del(index){
				if(!this.isEdit) return
				const item = this.myLabelList[index]
				this.myLabelList.splice(index,1)
				this.recommendLabelList.unshift(item)
			},
			add(index){
				if(!this.isEdit){
					uni.showToast({
						title:'请先进入编辑状态',
						icon:'none'
					})
					return
				} 
				const item = this.recommendLabelList[index]
				this.recommendLabelList.splice(index,1)
				this.myLabelList.unshift(item)
			},
			setUpdateLabel(labelList){
				console.log(333,label)
				let label = []
				labelList.forEach(item=>{
					label.push(item._id)
				})
				uni.showLoading()
				this.$api.http('update_label',{label,user_id:'601e61e354a29f0001b6916b'}).then(res=>{
					if(res.code === 200){
						uni.showToast({
							title:'编辑成功',
							icon:'success'
						})
						uni.$emit('changeLabel')
					}else{
						uni.showToast({
							title:'编辑失败',
							icon:'none'
						})
					}
				}).finally(res=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					position: relative;
					padding: 2px 5px;
					margin-top: 16px;
					margin-right: 12px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						right: -15px;
						top: -15px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
