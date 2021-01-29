<template>
	<div class="mpWrapper">
		<div class="qTitle">{{JSON.parse(this.quiz.option.title)}}</div>
			<div class="qAnswerEnd">
				<span class="qEndMessage">
					{{(this.won ? JSON.parse(this.quiz.option.message_end_win) : JSON.parse(this.quiz.option.message_end_loss))}}
				</span>
				<br/>
				<div v-for="(item,index) in quiz.question" :key="index" v-bind:class="(marks[index] ? 'qCorrect' : 'qWrong')">
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

						<router-link target="_blank" :to="this.resultLinkURL">Cool, here's your link</router-link>
				</div>
		</div>
	</div>
</template>

<script>
import QuizMaker from '@/QuizMaker.js';

export default {
	name : 'QuizResultPage',

	props : {
		quiz : Object,
		
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

	computed : {
		results(){
			return {
				name : this.savedName,
				quiz_answer : this.quiz_answer,
				marks : this.marks,
			};
		},
	},

	methods : {
		saveResult(){
			QuizMaker.createResult(this.id,this.results).then((data) => {this.resultLinkURL = data; this.savedLink = true;});
		}
	}
}
</script>