<template>
	<div class="globalWrapper">
		<span className="globalLoadingMessage">Error: {{message}}</span>
	</div>
</template>

<script>

export default {
	name : 'ErrorPage',

	props : {
		message : Object,
	}
}

</script>