<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="isShowLike?'heart-filled':'heart'" size="20"  color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			articleId:{
				type:String,
				default:''
			},
			isLike:{
				type: Boolean,
				default:false
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				isShowLike:false
			};
		},
		created(){
			this.isShowLike =  this.isLike
		},
		methods:{
			async likeTap(){
				this.$api.http('update_like',{article_id:this.articleId}).then(res => {
					const {msg} = res
					this.isShowLike = !this.isShowLike
					uni.$emit('updateArticle',this.types)
					uni.showToast({
						title:msg,
						icon:'none'
					})
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.icons{
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
