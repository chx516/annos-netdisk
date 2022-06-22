<template>
	<div class="home-wrapper">
		<Banner></Banner>
		<Function></Function>
	</div>
</template>

<script>
import Banner from '_c/home/Banner.vue'
import Function from '_c/home/Function.vue'

export default {
	name: 'Home',
	components: {
		Banner,
		Function
	}
}
</script>

<style lang="stylus" scoped>
.home-wrapper {
  width: 100% !important;
  flex-direction column
}
</style>
