<template>
	<div class="globalWrapper">
		<Loading v-if="pageNavStatus == -1 && this.errorMessage != undefined" v-bind:message="this.errorMessage"/>
		<Loading v-else-if="pageNavStatus == -1" />

		<span class="sbTitle">{{JSON.parse(this.quizData.title)}}'s Scoreboard</span>
		
		<div class="sbEntry" v-for="(resp,index) in responces" :key="index">
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
</template>

<script>
import firebase from '@/components/Firebase.js';
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
				errorMessage : "",
				quizData : {},
				questionData : [],
				responces : new Array(10).fill(undefined),
			};

		},

		methods : {
			async getQuizData(){
				const quiz_data = await firebase.firestore().collection("quiz").doc(this.id).get();
				
				if(!quiz_data.exists){
					this.errorMessage = "This quiz does not exist";
					this.showStage = -1;
					return;
				}else{
					this.quizData = quiz_data.data();
				}

				const question_data = await firebase.firestore().collection("quiz").doc(this.id).collection("question").get();
				this.questionData = question_data.docs.map(doc => doc.data());

				let a = this;
				await firebase.firestore().collection("quiz").doc(this.id).collection("response").get().then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						let responceData = {
							name : doc.data().name,
							quiz_answer : doc.data().quiz_answer,
							marks : doc.data().marks, 
							score : a.mark(doc.data().marks),
							date : doc.data().time.toDate(),
						};

						let array = a.responces;
						array.push(responceData);

						a.responces = array;
					});
				});

				let array = this.responces;

				array.sort(function(a,b){return b.score - a.score});
				array = array.slice(0,10);
				
				this.responces = array;
				this.showStage = 1;
			},

			mark(score){
				let count = 0;

				for(let a=0; a<score.length; a++){
					if(score[a]) count++;
				}

				return count;
			}
		},

		created(){
			this.getQuizData();
		},
	}
</script>