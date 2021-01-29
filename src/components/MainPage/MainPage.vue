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
import QuizMaker from '@/QuizMaker.js';

import NavigationBar from '@/components/NavigationBar.vue';
import MainPageFront from './MainPageFront.vue';
import MainPageQuestionInput from './MainPageQuestionInput.vue';
import MainPageSubmit from './MainPageSubmit.vue';

export default {
	name : 'MainPage',

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

			quizData : {
				title : 			"",
				message_start : 	"",
				message_end_win :	"",
				message_end_loss : 	"",
				score_win : 		0,
				question: 			undefined,
			},
		}
	},

	methods : {
		submit(){
			this.emitter.emit("submit");
		},
	},

	mounted(){
		this.emitter.on("submitOptions", e => {
			this.quizData = {...this.quizData,...e};
		});

		this.emitter.on("submitQuestions", e=> {
			this.quizData = {...this.quizData,question:e};
			QuizMaker.createQuiz(this.quizData).then((data) => {
				this.emitter.emit("submitLink",data); 
				this.pageNavStatus = 2; 
				this.showLink = true;
			});
		});



	}
}
</script>