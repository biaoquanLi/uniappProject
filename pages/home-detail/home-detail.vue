<template>
	<ls-skeleton :skeleton="skeleton" :loading="loading" :animate="true">
		<view class="detail">
			<view class="detail-title">
				{{item.title}}
			</view>
			<view class="detail-header">
				<view class="detail-header__logo">
					<image :src="item.author?item.author.avatar:''" mode="aspectFill"></image>
				</view>
				<view class="detail-header__content">
					<view class="detail-header__content-title">
						{{item.author?item.author.author_name:''}}
					</view>
					<view class="detail-header__content-info">
						<text>{{item.create_time}}</text>
						<text>{{item.browse_count}} 浏览</text>
						<text>{{item.thumbs_up_count}}赞</text>
					</view>
				</view>
				<button class="detail-header__button" type="default">关注</button>
			</view>
			<view class="detail-content">
				<view class="detail-html">
					<u-parse :content="item.content" :noData="noData"></u-parse>
				</view>
				<view class="detail-comment">
					<view class="comment-title">最新评论</view>
					<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
						<comments-box :comments="item" @reply="reply"></comments-box>
					</view>
				</view>
			</view>
			<view class="detail-bottom">
				<view class="detail-bottom__input" @click="openComment">
					<text>谈谈你的看法</text>
					<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons">
					<view class="detail-bottom__icons-box" @click="openComment">
						<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
					</view>
					<!-- <view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
						<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
					</view>
					<view class="detail-bottom__icons-box" @click="thumbsup(formData._id)">
						<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373"></uni-icons>
					</view> -->
				</view>
			</view>
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
	</ls-skeleton>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	export default {
		components: {
			lsSkeleton,
			uParse
		},
		data() {
			return {
				loading: true,
				item: {},
				skeleton: [
					'circle+line-sm*2',
					'line',
					'card-lg',
					'card-lg',
					'card-lg',
					'card-lg'
				],
				commentsValue:'',
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsList:[] ,// 评论列表
				article_id:'',
				replyFormData:{}
			};
		},
		onLoad({
			article_id
		}) {
			this.article_id = article_id
			this.getDetail(article_id)
			this.getComments(article_id)
		},
		methods: {
			getDetail(article_id) {
				this.loading = true
				uni.showLoading()
				this.$api.http('get_detail', {
					article_id,
					user_id: '601e61e354a29f0001b6916b'
				}).then(res => {
					if (res.code === 200) {
						this.item = res.data
					} else {
						uni.showToast({
							title: '数据获取失败'
						})
					}
				}).finally(res => {
					this.loading = false
					uni.hideLoading()
				})
			},
			getComments(article_id){
				this.$api.http('get_comments',{user_id: '601e61e354a29f0001b6916b',article_id}).then(res=>{
					if(res.code === 200){
						this.commentsList = res.data
						console.log(res.data)
					}
				})
			},
			// 打开评论发布窗口
			openComment(){
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close(){
				this.$refs.popup.close()
			},
			submit(e){
				if(!this.commentsValue){
					uni.showToast({
						title:'评论内容不能为空',
						icon:'none'
					})
					return
				}
				const obj = {
					user_id:'601e61e354a29f0001b6916b',article_id:this.article_id,
					content:this.commentsValue
				}
				uni.showLoading()
				this.$api.http('update_comment',{...obj,...this.replyFormData}).then(res=>{
					if(res.code){
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
					uni.hideLoading()
					this.replyFormData = {}
				})
			},
			reply(e){
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}

		.detail-header__button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: $mk-base-color;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;

		.detail-html {
			padding: 0 15px;
		}

		.detail-comment {
			margin-top: 30px;

			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}

			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
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
