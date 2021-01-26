<template>
	<div class="globalWrapper">
		<div class="qTitle">{{JSON.parse(this.quizData.title)}}</div>
			<span class="rResultName">Showing results for '{{this.name}}' on the {{JSON.parse(this.quizData.title)}}</span>
			<br/><br/>
			<span 	v-for="(item,index) in questionData"
					:key="index"
					v-bind:class="(marks[index] ? 'qCorrect' : 'qWrong')">

			<span className="qResultQuestion">{{JSON.parse(item.text)}}</span>
			<br/>
			<span className="qResultAnswer"> {{JSON.parse(item["answer"+quiz_answer[index]])}}</span>
			<br/><br/>
		</span>
		
	</div>
</template>

<script>
import firebase from '@/components/Firebase.js';

export default {
	name : 'ResultPage',
	
	data(){
		return {
			id : this.$route.params.id,
			result : this.$route.params.result,

			quizData : {},
			questionData : [],

			name : "",
			quiz_answer : [],
			marks : [],
			date : new Date(),
		}
	},

	created(){
		this.getQuizData();
	},

	methods : {
		async getQuizData(){
			const question_data = await firebase.firestore().collection("quiz").doc(this.id).collection("question").get();
			this.questionData = question_data.docs.map(doc => doc.data());
			const quiz_data = await firebase.firestore().collection("quiz").doc(this.id).get();
			this.quizData = quiz_data.data();
			const responce_data = await firebase.firestore().collection("quiz").doc(this.id).collection("response").doc(this.result).get();
			
			this.name = responce_data.data().name;
			this.quiz_answer = responce_data.data().quiz_answer;
			this.marks = responce_data.data().marks; 
			this.date = responce_data.data().time.toDate();
		}
	}
}
</script>