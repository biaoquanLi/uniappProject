<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :listData="listData"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components:{
			listItem
		},
		props:{
			tab:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type: Number,
				default:0
			}
		},
		data() {
			return {
				listData:[]
			};
		},
		created(){
			this.$api.http({url:'get_list'}).then(res=>{
				console.log(333,res)
				this.listData = res
			})
		},
		methods:{
			change(e){
				const {current} = e.detail
				this.$emit('change',current)
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
			overflow: hidden;
		}
	}
</style>
