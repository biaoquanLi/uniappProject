<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :listData="listDataCash[index]" @loadMore="loadMore" :status="pageLoad[index]&&pageLoad[index].loadStatus"></list-item>
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
				listDataCash:{},
				pageLoad:{},
				pageSize:10
			};
		},
		watch:{
			tab(newVal){
				if(newVal.length === 0) return
				this.getList(0)
			}
		},
		created(){
			
		},
		methods:{
			change(e){
				const {current} = e.detail
				if(!this.listDataCash[current] || !this.listDataCash[current].length){
					this.getList(current)
				}
				this.$emit('change',current)
			},
			getList(current){
				if(!this.listDataCash[current]){
					this.pageLoad[current] = {page:1,loadStatus:'loading'}
					this.$forceUpdate()
				}else{
					this.pageLoad[current].loadStatus = 'loading'
				}
				this.$api.http('get_list',{classify:this.tab[current].name,pageSize:this.pageSize,page:this.pageLoad[current].page}).then(res=>{
					const {data} = res
					if(data.length === 0){
						this.pageLoad[current].loadStatus = 'moMore'
					}else{
						this.pageLoad[current].loadStatus = 'more'
					}
					const newData = this.listDataCash[current]?this.listDataCash[current].concat(data):[].concat(data)
					this.$set(this.listDataCash,current,newData)
				})
			},
			loadMore(){
				if(this.pageLoad[this.activeIndex].loadStatus === 'moMore')return
				this.pageLoad[this.activeIndex].page++
				this.getList(this.activeIndex)
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
