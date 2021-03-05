<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadMore(){
				this.$emit("loadMore")
			}
		}
	}
</script>

<style lang="scss">
.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		.list-scroll {
			height: 100%;
			overflow: auto;
			display: flex;
			flex-direction: column;
		}
	}
</style>
