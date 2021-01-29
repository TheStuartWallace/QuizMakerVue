<template>
	<div class="mpWrapper">
		<div class="qTitle">{{JSON.parse(quiz.option.title)}}</div>
		<span class="qStartMessage">{{JSON.parse(quiz.option.message_start)}}</span>
		<span class="qQuestionCount">
			You have to answer {{quiz.question.length}} questions and need to answer {{quiz.option.score_win}} to win
		</span>
		<br/><br/>
		<button class="qStartButton" v-on:click="this.emitter.emit('next')">Start Quiz</button>
	</div>
</template>

<script>

export default {
	name : 'QuizFront',

	props : {
		quiz : Object,
	},
}
</script>