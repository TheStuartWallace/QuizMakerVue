<template>
	<div class="globalWrapper">
		<NavigationBar 
			@leftNav="this.pageNavStatus -= 1" 
			@rightNav="this.pageNavStatus += 1" 
			v-bind:status="pageNavStatus" 
			v-bind:max="pageNavMax" 
			v-show="!showLink"
		/>

		<MainPageFront v-show="pageNavStatus == 0"/>
		<MainPageQuestionInput v-show="pageNavStatus == 1"/>
		<MainPageSubmit v-show="pageNavStatus == 2"/>
	</div>
</template>

<script>
import {reactive,watch} from 'vue';

import NavigationBar from '@/components/NavigationBar.vue';
import firebase from '@/components/Firebase.js';

import MainPageFront from './MainPageFront.vue';
import MainPageQuestionInput from './MainPageQuestionInput.vue';
import MainPageSubmit from './MainPageSubmit.vue';

export default {
	name : 'MainPage',
	
	created(){
		const quizData = reactive({
			title : 			"",
			message_start : 	"",
			message_end_win :	"",
			message_end_loss : 	"",
			score_win : 		0,
			question: 			undefined,
		});

		watch(quizData,(state,prevState) => {
			console.log(state+" from "+prevState);
		});
		return quizData;
	},

	components : {
		MainPageFront,
		MainPageQuestionInput,
		MainPageSubmit,
		NavigationBar,
	},
	
	data() {
		return {
			pageNavStatus : 0,
			pageNavMax : 3,
			showLink : false,
		}
	},

	methods : {
		submit(){
			this.emitter.emit("submit");
		},

		writeQuiz(){
			let a = this;
			firebase.firestore().collection("quiz").add({
				title : 			JSON.stringify(this.quizData.title),
				score_win : 		JSON.stringify(this.quizData.score_win),
				message_start : 	JSON.stringify(this.quizData.message_start),
				message_end_win : 	JSON.stringify(this.quizData.message_end_win),
				message_end_loss : 	JSON.stringify(this.quizData.message_end_loss),	
			}).then(function(docRef){
				let batch = firebase.firestore().batch();

				a.quizData.question.forEach((doc,index) => {
					batch.set(firebase.firestore().collection("quiz").doc(docRef.id).collection("question").doc(""+index),doc);
				});

				batch.commit();

				a.pageNavStatus = 2;
				a.showLink = true;
				a.emitter.emit("submitLink",(window.location.origin+"/"+docRef.id));
			})
			.catch(function(error) {
				alert("Something went wrong '"+error+"')");
				console.error("Error adding document: ", error);
			});
		},
	},

	mounted(){
		this.emitter.on("submitOptions", e => {
			this.quizData = {...this.quizData,...e};
		});

		this.emitter.on("submitQuestions", e=> {
			this.quizData = {...this.quizData,question:e};
			this.writeQuiz();
		});



	}
}
</script>