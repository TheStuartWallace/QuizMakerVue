<template>
	<div class="globalWrapper">
		<Loading v-if="pageNavStatus == -1 && this.errorMessage != undefined" v-bind:message="this.errorMessage"/>
		<Loading v-else-if="pageNavStatus == -1" />

		<QuizFront 	
			v-bind:quizData="this.quizData" 
			v-bind:questionData="this.questionData" 
			v-else-if="pageNavStatus == 0"
		/>

		<QuizQuestionPage
			v-bind:quizData="this.quizData"
			v-bind:questionData="this.questionData"
			v-else-if="pageNavStatus == 1"
		/>

		<QuizResultPage 
			v-bind:quizData="this.quizData"
			v-bind:questionData="this.questionData"
			v-bind:quiz_answer="this.quiz_answer"
			v-bind:marks="this.marks"
			v-bind:won="this.won"
			v-bind:id="this.id"
			v-else-if="pageNavStatus == 2"
		/>

	</div>
</template>

<script>
import firebase from '@/components/Firebase.js';
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
			questionData : [],
			quizData : {},
			quiz_answer : [],
			marks : [],
			won : false,
			errorMessage : undefined,
		}
	},

	created(){
		this.getQuizData();

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
		async getQuizData(){

			const quiz_data = await firebase.firestore().collection("quiz").doc(this.id).get();
			if(!quiz_data.exists){
				this.pageNavStatus = -1;
				this.errorMessage = "Error! (This quiz does not exist)";
				return;
			}else{
				this.quizData = quiz_data.data();
				document.title = JSON.parse(this.quizData.title)+" - Quiz Maker";
			}

			const question_data = await firebase.firestore().collection("quiz").doc(this.id).collection("question").get();
			this.questionData = question_data.docs.map(doc => doc.data());
			

			this.pageNavStatus = 0;
		},

		markAnswers(answersgiven){
			let marks = [];
			let right = 0;
			for(let a=0; a<this.questionData.length; a++){
				marks = marks.concat((answersgiven[a] === this.questionData[a].correct));
				if(answersgiven[a] === this.questionData[a].correct) right = right + 1;
			}

			this.marks = marks;
			this.won = (right >= this.quizData.score_win);
		}
	}
}
</script>