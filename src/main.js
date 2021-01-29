import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import { createRouter, createWebHashHistory  } from 'vue-router'
import MainPage from '@/components/MainPage/MainPage.vue'
import QuizPage from '@/components/QuizPage/QuizPage.vue'
import ResultPage from '@/components/ResultPage/ResultPage.vue'
import Scoreboard from '@/components/Scoreboard/Scoreboard.vue'
import NotFound from '@/components/NotFound.vue'

const emitter = mitt();
require("./style/index.css");

const routes = [
	{
		path: '/',
		name: 'Home',
		component: MainPage
	},
	{
		path: '/:id/',
		name: 'Quiz',
		component: QuizPage,
		pathToRegexpOptions: { strict: true },
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
	},

	{
		path : "/:pathMatch(.*)",
		name : "NotFound",
		component : NotFound,
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	base : "/quizmaker_vue/",
	routes
})

let app = createApp(App);
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
