<template>
	<div class="mpWrapper">
		<div class="qTitle">{{JSON.parse(quiz.option.title)}}</div>
		<span class="qQuestion">{{JSON.parse(quiz.question[this.quiz_state].text)}}</span><br/>
		<br/>
		<button 	className="qAnswerButton" 
					v-on:click="this.selectAnswer(1)">
					{{JSON.parse(quiz.question[this.quiz_state].answer1)}}
		</button><br/>

		<button 	className="qAnswerButton" 
					v-on:click="this.selectAnswer(2)">

					{{JSON.parse(quiz.question[this.quiz_state].answer2)}}
		</button><br/>

		<button 	className="qAnswerButton" 
					v-on:click="this.selectAnswer(3)">

					{{JSON.parse(quiz.question[this.quiz_state].answer3)}}
		</button><br/>

		<button 	className="qAnswerButton" 
					v-on:click="this.selectAnswer(4)">

					{{JSON.parse(quiz.question[this.quiz_state].answer4)}}
		</button><br/>
	</div>
</template>

<script>
	
export default {
	name : 'QuizQuestionPage',

	props : {
		quiz: Object,
	},

	data(){
		return {
			quiz_state : 0,
			quiz_answer : [],
		};
	},

	methods : {
		selectAnswer(on){
			this.quiz_answer[this.quiz_state] = on;
			if(this.quiz_state >= this.quiz.question.length-1){
				this.emitter.emit("completedQuiz",this.quiz_answer);
			}else{
				this.quiz_state += 1;
			}
		}
	}
}	
</script>