var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com';

    /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    */
		const fetchPosts = fetch(`${url}/posts/`)
			.then((postData) => postData.json())
			.catch((err) => console.log(`An issue occured while retrieving posts: ${err}`))

		const fetchComments = fetch(`${url}/comments/`)
			.then((commentsData) => commentsData.json())
			.catch(err => console.log(`An issue occured while retrieving comments: ${err}`))

		const fetchTodos = fetch(`${url}/todos/`)
			.then((todosData) => todosData.json())
			.catch((err) => console.log(`An issue occured while retrieving todos: ${err}`))

		Promise.all([fetchPosts, fetchComments, fetchTodos])
			.then((results) => {
				nsp.posts = results[0]
				nsp.comments = results[1]
				nsp.todos = results[2]
	
				console.log('Fetch is complete!')
			})
			.catch((err) => console.log(`An error occured: ${err}`))

    

    //public
    return nsp;
})(MAINAPP || {});