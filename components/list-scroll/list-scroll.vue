<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" >
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
		}
	}
</script>

<style lang="scss">
.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100vh;
			display: flex;
			flex-direction: column;
		}
	}
</style>
