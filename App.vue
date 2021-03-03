<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.http('get_user',{user_id:'601e61e354a29f0001b6916b'},false).then(res => {
				if(res.code === 200){
					this.$store.dispatch('set_user_info',res.data)
				}else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
