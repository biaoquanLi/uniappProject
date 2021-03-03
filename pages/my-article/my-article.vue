<template>
	<view>
		<uni-load-more v-if="articleList.length === 0 && !showNoData" status="loading" iconType="snow"></uni-load-more>
		<list-card v-for="(item,index) in articleList" :key="index" :item="item"></list-card>
		<view class="no-data" v-if="showNoData">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList:[],
				showNoData:false
			};
		},
		onLoad(){
			this.getArticleList()
		},
		methods:{
			getArticleList(){
				this.$api.http('get_my_article').then(res => {
					if(res.code === 200){
						this.articleList= res.data
						if(this.articleList.length === 0){
							this.showNoData = true
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.no-data {
		padding: 50px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
</style>
