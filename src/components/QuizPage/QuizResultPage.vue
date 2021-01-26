<template>
	<div class="mpWrapper">
		<div class="qTitle">{{JSON.parse(this.quizData.title)}}</div>
			<div class="qAnswerEnd">
				<span class="qEndMessage">
					{{(this.won ? JSON.parse(this.quizData.message_end_win) : JSON.parse(this.quizData.message_end_loss))}}
				</span>
				<br/>
				<div v-for="(item,index) in questionData" :key="index" v-bind:class="(marks[index] ? 'qCorrect' : 'qWrong')">
					<div class="qResultQuestion">{{JSON.parse(item["text"])}}</div>
					<div class="qResultAnswer"> {{JSON.parse(item["answer"+quiz_answer[index]])}}</div>
				</div>
			</div>

			<div class="qSaveResult">
				<div v-show="!this.savedLink">
					Want to show people how you did? Save you results!<br/>
					<br/>
					<input 	placeholder="Your name here" 
							class="qSaveInput" 
							name="qNameInput" 
							autocomplete="off" 
							v-model="savedName"
							type="text" 
					/>
					<button class="qSaveButton" 
						v-on:click="this.saveResult()">
						Save Result
					</button>
							<br/>
				</div>
				<div 	class="qResultLink" 
						v-show="this.savedLink">

						Cool! Your link is <a target="_blank" rel="noreferrer" v-bind:href="this.resultLinkURL">{{this.resultLinkURL}}</a>
				</div>
		</div>
	</div>
</template>

<script>
import firebase from '@/components/Firebase.js';

export default {
	name : 'QuizResultPage',

	props : {
		quizData : Object,
		questionData : Array,
		quiz_answer : Array,
		marks : Array,
		won : Boolean,
		id : Number,
	},

	data(){
		return {
			savedLink : false,
			savedName : "",
			resultLinkURL : "",
		};
	},

	methods : {
		saveResult(){
			let a = this;
			firebase.firestore().collection("quiz").doc(this.id).collection("response").add({
				name : this.savedName,
				quiz_answer : this.quiz_answer,
				marks : this.marks,
				time : firebase.firestore.FieldValue.serverTimestamp(),
			}).then(function(docRef) {
				a.resultLinkURL = window.location.origin+"/"+a.id+"/r/"+docRef.id;
				a.savedLink = true;
			})
			.catch(function(error) {
				alert("Something went wrong '"+error+"')");
				console.error("Error adding document: ", error);
			});
		}
	}
}
</script>