<template>
	<div class="globalWrapper">
		<Loading v-if="errorMessage !== undefined" v-bind:message="this.errorMessage"/>

		<div v-else style="	display:flex;
							justify-content:center;
							align-items:center;
							flex-direction: column;
							width:100%;
							height:100%;">
							
			<div class="qTitle">{{JSON.parse(this.quiz.option.title)}}</div>
			
			<span class="rResultName">Showing results for '{{this.name}}' on the {{JSON.parse(this.quiz.option.title)}}</span>
			
			<br/><br/>

			<span 	v-for="(item,index) in quiz.question"
					:key="index"
					v-bind:class="(marks[index] ? 'qCorrect' : 'qWrong')">
				<span className="qResultQuestion">{{JSON.parse(item.text)}}</span>
				<br/>
				<span className="qResultAnswer"> {{JSON.parse(item["answer"+quiz_answer[index]])}}</span>
				<br/><br/>

			</span>		
		</div>
	</div>
</template>

<script>
import QuizMaker from '@/QuizMaker.js';
import Loading from '@/components/Loading.vue';

export default {
	name : 'ResultPage',

	components : {
		Loading,
	},
	
	data(){
		return {
			id : this.$route.params.id,
			result : this.$route.params.result,

			errorMessage : undefined,

			quiz : {},

			name : "",
			quiz_answer : [],
			marks : [],
			date : new Date(),
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

		QuizMaker.getQuizResponce(this.id,this.result).then((data) => {
			if(data === undefined){
				this.errorMessage = "Error! Unable to show result";
			}else{
				this.name = data.name;
				this.quiz_answer = data.quiz_answer;
				this.marks = data.marks; 
				this.date = data.date;
			}
		});
	},

	methods : {
		// async getQuizData(){
		// 	const question_data = await firebase.firestore().collection("quiz").doc(this.id).collection("question").get();
		// 	this.questionData = question_data.docs.map(doc => doc.data());
		// 	const quiz_data = await firebase.firestore().collection("quiz").doc(this.id).get();
		// 	this.quizData = quiz_data.data();
		// 	const responce_data = await firebase.firestore().collection("quiz").doc(this.id).collection("response").doc(this.result).get();

		// 	console.log(responce_data.data());
			
		// 	this.name = responce_data.data().name;
		// 	this.quiz_answer = responce_data.data().quiz_answer;
		// 	this.marks = responce_data.data().marks; 
		// 	this.date = responce_data.data().time.toDate();
		// }
	}
}
</script>