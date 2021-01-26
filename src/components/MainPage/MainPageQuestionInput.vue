<template>
	<div class="mpWrapper">
		<div class="mpQuestionTitle">Question {{questionNav+1}}</div>

		<input 		class="mpQuestionInput" 
					placeholder="Enter your question here" 
					name="text" 
					autocomplete="off" 
					v-model="questionInput[questionNav].text"/><br>
		
		<span class="mpAnswerSpan">
			<input 	autocomplete="off" 
					v-bind:class="questionInput[questionNav].correct === 1 ? 'mpQuestionCorrect' : 'mpQuestion'"
					placeholder="Enter option 1 here" 
					v-model="questionInput[questionNav].answer1">

			<button class="mpCorrect" v-on:click="questionInput[questionNav].correct = 1">Correct</button>
			<br/>
		</span>

		<span class="mpAnswerSpan">
			<input 	autocomplete="off" 
					v-bind:class="questionInput[questionNav].correct === 2 ? 'mpQuestionCorrect' : 'mpQuestion'"
					placeholder="Enter option 2 here" 
					v-model="questionInput[questionNav].answer2">
			<button class="mpCorrect" v-on:click="questionInput[questionNav].correct = 2">Correct</button>
			<br/>
		</span>

		<span class="mpAnswerSpan">
			<input 	autocomplete="off" 
					v-bind:class="questionInput[questionNav].correct === 3 ? 'mpQuestionCorrect' : 'mpQuestion'"
					placeholder="Enter option 3 here" 
					v-model="questionInput[questionNav].answer3">
			<button class="mpCorrect" v-on:click="questionInput[questionNav].correct = 3">Correct</button
				><br/>
		</span>	

		<span class="mpAnswerSpan">
			<input 		autocomplete="off" 
						v-bind:class="questionInput[questionNav].correct === 4 ? 'mpQuestionCorrect' : 'mpQuestion'"
						placeholder="Enter option 4 here" 
						v-model="questionInput[questionNav].answer4">
			<button class="mpCorrect" v-on:click="questionInput[questionNav].correct = 4">Correct</button>
			<br/>
		</span>
		<div class="mpQuestionNavigation">
			<button class="mpQuestionNavigationPrevious" 	v-on:click="questionNav -= 1" :disabled="this.leftDisabled">	Previous 		</button>
			<button class="mpQuestionNavigationNew" 		v-on:click="newQuestion">										New question 	</button>
			<button class="mpQuestionNavigationNext" 		v-on:click="questionNav += 1" :disabled="this.rightDisabled">	Next 			</button>
		</div>
	</div>
</template>

<script>
export default {
	name : 'MainPageQuestionInput',

	data(){
		return {
			questionNav : 0,
			questionInput : [{text : "",answer1:"",answer2:"",answer3:"",answer4:"",correct:-1}]
		}
	},

	methods:{
		newQuestion(){
			this.questionInput.push({text : "",answer1:"",answer2:"",answer3:"",answer4:"",correct:-1});
			this.questionNav = this.questionInput.length -1; 
		},

		validate(){
			for(let a=0; a<this.questionInput.length; a++){
				if(this.questionInput[a].text == "") return false;
				if(this.questionInput[a].answer1 == "") return false;
				if(this.questionInput[a].answer2 == "") return false;
				if(this.questionInput[a].answer3 == "") return false;
				if(this.questionInput[a].answer4 == "") return false;
				if(this.questionInput[a].correct === -1) return false;
			}

			return true;
		},

		export(){
			let data = [];
			let exportData = this.questionInput;

			for(let a=0; a<exportData.length; a++){
				data.push({
					text : JSON.stringify(exportData[a].text),
					answer1:JSON.stringify(exportData[a].answer1),
					answer2:JSON.stringify(exportData[a].answer2),
					answer3:JSON.stringify(exportData[a].answer3),
					answer4:JSON.stringify(exportData[a].answer4),
					correct:exportData[a].correct,
				});
			}

			return data;
		}
	},

	mounted(){
		this.emitter.on("submit", () => {
			if(this.validate()){
				this.emitter.emit("submitQuestions",this.export());
			}
		});
	},

	computed: {
		leftDisabled(){
			return (this.questionNav - 1 >= 0 ? false:true);
		},

		rightDisabled(){
			return (this.questionNav + 1 < this.questionInput.length ? false : true);
		}
	}
}
</script>