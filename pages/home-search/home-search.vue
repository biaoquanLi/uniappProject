<template>
	<view class="home">
		<navbar :isSearch="true" @confirm="confirm"  v-model="value"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="isHistory && !value">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistoryList" v-if="historyList.length">清空</text>
				</view>
				<view v-if="historyList.length" class="label-content">
					<view class="label-content__item" v-for="(item,index) in historyList" @click="openHistory(item)"  :key="index">{{item.name}}</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading"  status="loading" iconType="snow" ></uni-load-more>
				<view v-if="searchList.length">
					<list-card @click="setHistory"  v-for="(item,index) in searchList" :item="item" :key="index"></list-card>
				</view>
				<view v-if="!searchList.length && !loading"  class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isHistory:true,
				searchList:[], //搜索结果列表数据,
				loading:false, // 数据加载状态
				mark:false,
				timeId:null,
				value:''
			};
		},
		computed:{
			...mapState(['historyList'])
		},
		methods:{
			confirm(value){
				this.getList(value)
				// if(!value){
				// 	clearTimeout(this.timer)
				// 	this.mark = false
				// 	this.getList(value)
				// 	return
				// }
				// if(!this.mark){
				// 	this.mark = true
				// 	this.timeId =setTimeout(()=>{
				// 		this.mark = false
				// 		this.getList(value)
				// 	},1000)
				// }
			},
			getList(value){
				this.searchList = []
				if(!value){
					this.isHistory = true
					return
				}
				this.isHistory = false
				this.loading = true
				this.$api.http('get_search_list',{value}).then(res=>{
					const {data} = res
					this.searchList = data
				}).finally(res=>{
					this.loading = false
				})
			},
			setHistory(){
				console.log(11,this.value)
				if(this.value){
					this.$store.dispatch('set_history_list',{name:this.value})	
				}
			},
			openHistory(item){
				this.value = item.name
				this.getList(this.value)
			},
			clearHistoryList(){
				this.$store.dispatch('clear_history_list')
				uni.showToast({
					title:'清空完成',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
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
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
