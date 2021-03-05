<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<view>
			<list-card v-for="(item,index) in listData" :item="item" :key="index"></list-card>
		</view>
		<view v-if="listData.length ===0 || listData.length > 7 " class="status">
			<uni-load-more  :status="status" iconType="snow" ></uni-load-more>
		</view>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default () {
					return []
				}
			},
			status: {
				type: String,
				default: 'loading'
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;

		.status {
			margin-bottom: 10px;
		}
	}
</style>
