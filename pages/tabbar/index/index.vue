<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="labelList" @tab="tab" :currentIndex="currentIndex"></tab>
		<view class="home-list">
			<list :tab="labelList" @change="swiperChange" :activeIndex="activeIndex"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelList:[],
				currentIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			this.getLabel()
			uni.$on('changeLabel',res => {
				this.labelList=[]
				this.currentIndex=0
				this.activeIndex=0
				this.getLabel()
			})
		},
		onShareAppMessage() {
			
		},
		methods: {
			swiperChange(current){
				this.currentIndex = current
			},
			tab({item,index}){
				this.activeIndex = index
				
			},
			getLabel(){
				this.$api.http('get_label').then(res => {
					const {data} = res
					data.unshift({name:'全部'})
					this.labelList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
