<template>
	<div class="globalWrapper">
		<Loading v-if="pageNavStatus == -1 && this.errorMessage != undefined" v-bind:message="this.errorMessage"/>
		<Loading v-else-if="pageNavStatus == -1" />

		<QuizFront 	
			v-bind:quiz="this.quiz"
			v-bind:quizData="this.quiz.options"
			v-else-if="pageNavStatus == 0"
		/>

		<QuizQuestionPage
			v-bind:quiz="this.quiz"
			v-else-if="pageNavStatus == 1"
		/>

		<QuizResultPage 
			v-bind:quiz="this.quiz"
			v-bind:quiz_answer="this.quiz_answer"
			v-bind:marks="this.marks"
			v-bind:won="this.won"
			v-bind:id="this.id"
			v-else-if="pageNavStatus == 2"
		/>

	</div>
</template>

<script>
import QuizMaker from '@/QuizMaker.js';
import Loading from '@/components/Loading.vue';
import QuizFront from '@/components/QuizPage/QuizFront.vue';
import QuizQuestionPage from '@/components/QuizPage/QuizQuestionPage.vue';
import QuizResultPage from '@/components/QuizPage/QuizResultPage.vue';

export default {
	name : 'QuizPage',

	components : {
		Loading,
		QuizFront,
		QuizQuestionPage,
		QuizResultPage,
	},

	data() {
		return {
			pageNavStatus : -1,
			pageNavMax : 3,

			id : this.$route.params.id,
			quiz : undefined,

			quiz_answer : [],
			marks : [],
			
			won : false,
			errorMessage : undefined,
		}
	},

	created(){
		this.quiz = {
			option : undefined,
			question : undefined,
		};

		QuizMaker.getQuizOptions(this.id).then((data) => {
			if(data === undefined){
				this.errorMessage = "Error! No such quiz!"; 
				this.pageNavStatus = -1;
			}else{
				this.quiz.option = data;
			}
		});

		if(this.errorMessage === undefined){
			QuizMaker.getQuizQuestions(this.id).then((data) => {
			if(data === undefined){
				this.errorMessage = "Error! Unable to load questions!"; 
				this.pageNavStatus = -1;
			}else{
				this.quiz.question = data; 
				this.emitter.emit("next");
				}
			});
		}
		
		this.emitter.on("next",() => {
			this.pageNavStatus += 1;
		});

		this.emitter.on("completedQuiz",(e) => {
			this.markAnswers(e);
			this.quiz_answer = e;
			this.pageNavStatus += 1;
		});
	},

	methods : {
		markAnswers(answersgiven){
			let marks = [];
			let right = 0;
			for(let a=0; a<this.quiz.question.length; a++){
				marks = marks.concat((answersgiven[a] === this.quiz.question[a].correct));
				if(answersgiven[a] === this.quiz.question[a].correct) right = right + 1;
			}

			this.marks = marks;
			this.won = (right >= this.quiz.option.score_win);
		}
	}
}
</script>