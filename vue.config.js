module.exports = {
  pages: {
    index: {
    		entry : 'src/main.js',
    		title : "Quiz Maker (Vue)",
		}
	},

	publicPath: process.env.NODE_ENV === 'production'
    	? '/quizmaker_vue/'
    	: '/',

}