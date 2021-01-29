<template>
	<div class="mpWrapper">
		<div v-if="!showLink" class="mpSubmitQuiz">
			<span class="mpSubmitQuizMessage">Finished? Submit your quiz now!</span><br>
			<button class="mpSubmitQuizButton" v-on:click="this.emitter.emit('submit')">Submit quiz and get your link</button>
		</div>

		<div v-if="showLink" class="mpSubmitQuizMessage">
			<router-link :to="this.resultLink" target="_blank">Cool, here's your link</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name : 'MainPageSubmit',

	data(){
		return {
			showLink : false,
			resultLink : ""
		}
	},

	mounted(){
		this.emitter.on("submitLink", e=> {
			this.showLink = true;
			this.resultLink = e;
		});
	},
}
</script>