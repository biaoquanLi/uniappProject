<template>
	<view>
		<view class="feedback-title">
			意见反馈
		</view>
		<view class="feedback-content">
			<textarea class="feeback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
			</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imgList" :key="index" >
				<view class="close-icon" @click="onDelBtnClick(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imgList.length < 6" class="feedback-image-item" @click="onAddImageBtnClick">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		
		<button type="primary" class="feedback-button" @click="onSubmitBtnClick">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				imgList:[]
			};
		},
		methods:{
			onDelBtnClick(index){ // 删除图片
				this.imgList.splice(index,1)
			},
			onAddImageBtnClick(){ // 添加图片
				const count = 6 - this.imgList.length
				uni.chooseImage({
					count,
					success:(res)=>{
						res.tempFilePaths.forEach((url,index)=>{
							if(index<count){ // 兼容H5
								this.imgList.push({url})
							}
						})
					}
				})
			},
			async onSubmitBtnClick(){ // 提交
				if(!this.content){
					uni.showToast({
						title:'反馈问题不能为空',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title:'提交中'
				})
				let feedbackImages = [] // 要上传的图片数组地址
				for(let i = 0; this.imgList.length>i;i++){
					const url = this.imgList[i].url
					const filePath = await this.uploadPic(this.imgList[i].url)
					feedbackImages.push(filePath)
				}
				this.$api.http('update_feedback',{content:this.content,feedbackImages},false).then(res => {
					uni.hideLoading()
					if(res.code === 200){
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/tabbar/my/my'
							})
						},1000)
					}else{
						uni.showToast({
							title:'提交失败',
							icon:'none'
						})
					}
				})
			},
			async uploadPic(filePath){
				const dir = 'feedback/';
				const fileExt = '.'+filePath.substr(filePath.lastIndexOf('.') + 1);
				const randName = (
				  new Date().getTime() * 10000 +
				  Math.floor(Math.random() * 10000)
				).toString(32);
				const {fileID} = await uniCloud.uploadFile({
					filePath,
					cloudPath:dir+randName+fileExt
				})
				return fileID
			}
		}
	}
</script>

<style lang="scss">
.feedback-title{
		margin: 15px 15px 0 15px;
		color: #666;
		font-size: 14px;
	}
	.feedback-content{
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;
		.feeback-textarea{
			width: 100%;
			height: 100px;
			font-size: 12px;
		}
	}
	
	.feedback-image-box{
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item{
			box-sizing: border-box;
			position: relative;
			padding-top: 33.33%;
			width: 33.33%;
			height: 0;
			.close-icon{
				position: absolute;
				right: 0;
				top: 0;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
			}
			.image-box{
				position: absolute;
				top: 5px;
				right: 5px;
				left: 5px;
				bottom: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;
				.image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
	}
	
	.feedback-button{
		margin: 0 15px;
		background-color: $mk-base-color!important;
	}
</style>
