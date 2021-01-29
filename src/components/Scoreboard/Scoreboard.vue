<template>
	<div class="globalWrapper">
		<Loading v-if="(pageNavStatus == -1 && this.errorMessage !== undefined) || this.quiz.option === undefined" v-bind:message="this.errorMessage"/>
		<Loading v-else-if="pageNavStatus == -1" />

		<div v-else style="	display:flex;
							justify-content:center;
							align-items:center;
							flex-direction: column;
							width:100%;
							height:100%;">
			<span class="sbTitle">{{JSON.parse(this.quiz.option.title)}}'s Scoreboard</span>
			
			<div class="sbEntry" v-for="(resp,index) in this.quiz.top10" :key="index">
				<span v-if="resp === undefined">
					<span class="sbEntryPos">#{{index+1}}</span> <span class="sbEntryName">No Entry</span>
				</span>

				<span style="display: flex; justify-content: center; align-items: center; flex-direction: column;" v-else>
					<span>
						<span class="sbEntryPos">#{{index+1}}</span> <span class="sbEntryName">{{resp.name}}</span>
					</span>
					<span class="sbEntryScore">Score: {{resp.score}}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import QuizMaker from '@/QuizMaker.js';
import Loading from '@/components/Loading.vue';

	export default {
		name : 'Scoreboard',

		components : {
			Loading,
		},

		data(){
			return {
				id : this.$route.params.id,
				showStage : -1,
				errorMessage : undefined,
				quiz : {},
			};

		},

		created(){
			this.quiz = {
				option : undefined,
				top10 : undefined,
			};

			QuizMaker.getQuizOptions(this.id).then((data) => {
				if(data !== undefined){
					this.quiz.option = data;
				}else{
					this.errorMessage = "Error! Unable to load scoreboard.";
					this.showStage = -1;
				}
			});

			if(this.errorMessage === undefined){
				QuizMaker.getQuizTop10(this.id).then((data) => {
					if(data !== undefined){
						this.quiz.top10 = data; 
						this.showStage = 0;
					}else{
						this.errorMessage = "Error! Unable to load top 10";
						this.showStage = -1;
					}
				});
			}

			console.log(this.quiz);
		},
	}
</script>