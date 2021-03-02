<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item" @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消 </text>
					<text class="popup-header__item" @click="submit">发布 </text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				page:1,
				pageSize: 5,
				loading:'loading',
				replyFormData:{},
				commentsValue:''
			};
		},
		onLoad(query){
			this.article_id = query.id
			this.getComments()
		},
		onReachBottom() {
			if(this.loading === 'noMore') return
			this.page++
			this.getComments()
		},
		methods:{
			// 关闭弹窗
			close(){
				this.$refs.popup.close()
			},
			// 打开评论发布窗口
			openComment(){
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			submit(e){ // 提交评论或回复
				if(!this.commentsValue){
					uni.showToast({
						title:'评论内容不能为空',
						icon:'none'
					})
					return
				}
				const obj = {
					article_id:this.article_id,
					content:this.commentsValue
				}
				this.$api.http('update_comment',{...obj,...this.replyFormData}).then(res=>{
					if(res.code){
						this.page = 1
						this.commentsList = []
						this.getComments(this.article_id)
						uni.showToast({
							title:'评论成功',
							icon:'success'
						})
					}else{
						uni.showToast({
							title:'评论失败',
							icon:'none'
						})
					}
				}).finally(()=>{
					this.close()
					this.replyFormData = {}
				})
			},
			reply(e){ // 回复
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			},
			getComments(){ // 获取评论
				this.$api.http('get_comments',{page:this.page,pageSize:this.pageSize,article_id:this.article_id}).then(res => {
					const {data} = res
					if(data.length === 0){
						this.loading = 'noMore'
						return
					}
					this.commentsList = this.commentsList.concat(data)
				})
			}
		}
	}
</script>

<style lang="scss">
.comments-content {
		padding: 0 15px;
	}
	
	.popup-wrap {
			background-color: #fff;
			.popup-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #F5F5F5 solid;
				.popup-header__item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}
			.popup-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				.popup-textarea {
					width: 100%;
					height: 200px;
					
				}
				.popup-count {
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
</style>
