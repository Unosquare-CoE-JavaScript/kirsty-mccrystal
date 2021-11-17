//Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). 
// Set up the function so you can pass in the userID and the function will assign only the posts for that user to a variable. 
// The data should be stored in an array.

const getPosts = async (userID) => {
  let url = 'https://jsonplaceholder.typicode.com/posts'
  let posts = []

  const fetchedPosts = await fetch(url).then(postData => postData.json())
  posts = fetchedPosts.filter(post => post.userId === userID)
  console.log(posts)
}

getPosts(1)

