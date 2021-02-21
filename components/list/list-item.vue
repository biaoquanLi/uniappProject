<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<list-card v-for="(item,index) in listData" :item="item" :key="index"  ></list-card>
		<uni-load-more v-if="listData.length ===0 || listData.length > 7 "  :status="status" iconType="snow"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			listData:{
				type:Array,
				default(){
					return []
				}
			},
			status:{
				type:String,
				default:'loading'
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		methods:{
			loadMore(){
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll{
		height: 100%;
	}
</style>
