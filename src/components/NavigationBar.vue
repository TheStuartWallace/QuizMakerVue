<template>
	<button class="globalLeftNav" v-on:click="this.$emit('leftNav')" v-if="status-1 >= 0">&lt;</button>
	<button class="globalRightNav" v-on:click="this.$emit('rightNav')" v-if="status+1 < max">&gt;</button>
</template>

<script>
export default {
	name : 'NavigationBar',
	emits:["leftNav","rightNav"],
	props : {
		status : Number,
		max : Number
	},
}
</script>