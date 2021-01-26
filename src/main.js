import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage/MainPage.vue'
import QuizPage from '@/components/QuizPage/QuizPage.vue'
import ResultPage from '@/components/ResultPage/ResultPage.vue'
import Scoreboard from '@/components/Scoreboard/Scoreboard.vue'

const emitter = mitt();
require("./style/index.css");

const routes = [
	{
		path: '/',
		name: 'Home',
		component: MainPage
	},
	{
		path: '/:id',
		name: 'Quiz',
		component: QuizPage
	},

	{
		path:'/:id/r/:result',
		name: 'Result',
		component : ResultPage,
	},

	{
		path:'/:id/scoreboard',
		name : 'Scoreboard',
		component: Scoreboard,
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

let app = createApp(App);
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
