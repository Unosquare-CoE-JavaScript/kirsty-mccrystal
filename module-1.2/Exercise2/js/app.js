var MAINAPP = (function(nsp) {
    "use strict";

		// Don't this anymore
    // let posts = [],
    //     comments = [],
    //     todos = [];

    /*
    This IIFE is the start of an application. The first thing we want to do is download all the posts, comments and todos so that we can work with them. 
    Add the code in order to do that. Also, make sure that you add the posts, comments and todos to the MAINAPP variable so they are accessible outside 
    this function (e.g. nsp.posts = posts & return nsp). Because the code is asynchronous, you will need to consider the best way to do that.
    */

		let url = "https://jsonplaceholder.typicode.com"

		nsp = {
			posts: [],
			comments: [],
			todos: []
		}

		//If we wanted to wait for all fecth to complete before returning results we can use Promise.all() ( see Exercise 4 )
    fetch(`${url}/posts/`)
			.then((postData) => postData.json())
			.then((postObj) => nsp.posts = postObj)
			.catch(err => console.log(`An issue occured while retrieving posts: ${err}`))
å
		fetch(`${url}/comments/`)
			.then((commentsData) => commentsData.json())
			.then((commentsObj) => nsp.comments = commentsObj)
			.catch(err => console.log(`An issue occured while retrieving comments: ${err}`))

		fetch(`${url}/todos/`)
			.then((todosData) => todosData.json())
			.then((todosObj) => nsp.todos = todosObj)
			.catch(err => console.log(`An issue occured while retrieving todos: ${err}`))

    //public - not needed anymore, object already set at top
    // nsp.posts = posts;
    // nsp.comments = comments;
    // nsp.todos = todos

    return nsp;
})(MAINAPP || {});