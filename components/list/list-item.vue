<template>
	<list-scroll class="list-scroll">
		<list-card v-for="(item,index) in listData" :item="item" :key="index" ></list-card>
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
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
	}
</script>

<style lang="scss">
	.list-scroll{
		height: 100%;
	}
</style>
