<template>
	<div class="mpWrapper">
		<div class="qTitle">{{JSON.parse(quizData.title)}}</div>
		<span class="qStartMessage">{{JSON.parse(quizData.message_start)}}</span>
		<span class="qQuestionCount">
			You have to answer {{questionData.length}} questions and need to answer {{quizData.score_win}} to win
		</span>
		<br/><br/>
		<button class="qStartButton" v-on:click="this.emitter.emit('next')">Start Quiz</button>
	</div>
</template>

<script>
export default {
	name : 'QuizFront',

	props : {
		quizData : Object,
		questionData : Array,
	}
}
</script>