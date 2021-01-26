<template>
	<div class="mpWrapper">
		<input 		placeholder="Give your quiz a title" 
					class="mpInputTitle" 
					type="text" 
					name="title" 
					autocomplete="off"
					v-model="title"/>
			
		<span class="mpQuizOption">
			<input 	placeholder="This is the start message" 
					class="mpInputStart" 
					name="message_start" 
					autocomplete="off"
					v-model="message_start"/>
		</span>

		<span class="mpQuizOption">
			<input 	placeholder="This is the winning message" 
					class="mpInputWin" 
					autocomplete="off"
					name="message_end_win" 
					v-model="message_end_win"/>
		</span>

		<span class="mpQuizOption">
			<input 	placeholder="This is the losing message" 
					class="mpInputLoss" 
					autocomplete="off"
					name="message_end_loss" 
					v-model="message_end_loss"/>
		</span>

		<span class="mpQuizOption">
			<input 	placeholder="Score needed to win" 
					min="1" 
					class="mpInputWinScore" 
					name="score_win" 
					type="number" 
					autocomplete="off"
					v-model="score_win"/>
		</span>
	</div>
</template>

<script>

export default {
	name : 'MainPageFront',

	data() {
		return {
			title : "",
			message_start : "",
			message_end_win : "",
			message_end_loss : "",
			score_win : 1,
		}
	},

	methods : {
		export(){
			return {
				title : this.title,
				message_start : this.message_start,
				message_end_win : this.message_end_win,
				message_end_loss : this.message_end_loss,
				score_win : this.score_win,
			}
		},

		verify(){
			if(this.title === "") return false
			if(this.message_start === "") return false
			if(this.message_end_win === "") return false
			if(this.message_end_loss === "") return false
			return true;
		},
	},

	mounted(){
		this.emitter.on("submit", () => {
			if(this.verify()){
				this.emitter.emit("submitOptions",this.export());
			}
		});
	}
}

</script>