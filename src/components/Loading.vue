<template>
	<div class="globalWrapper">
		<span className="globalLoadingMessage">{{message}}</span>
	</div>
</template>

<script>

export default {
	name : 'Loading',

	props : {
		message : {
			default : "Loading...",
			type : String,
		}
	}
}
</script>