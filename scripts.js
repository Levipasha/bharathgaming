document.addEventListener('DOMContentLoaded', () => {
    const postedTextContainer = document.getElementById('postedTextContainer');
    loadPosts();

    document.getElementById('textForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value;
        const userInput = document.getElementById('userInput').value;

        if (userId.trim() !== "" && userName.trim() !== "" && userInput.trim() !== "") {
            const post = {
                userId,
                userName,
                userInput
            };

            addPostToDOM(post);
            savePost(post);

            document.getElementById('userId').value = '';
            document.getElementById('userName').value = '';
            document.getElementById('userInput').value = ''; // Clear the input fields
        } else {
            alert("Please fill in all fields.");
        }
    });

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postContent = document.createElement('div');
        postContent.innerHTML = `<strong>${post.userName}</strong> (${post.userId}): ${post.userInput}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            const enteredId = prompt("Please enter your user ID to delete:");
            if (enteredId === post.userId) {
                postedTextContainer.removeChild(postDiv);
                deletePost(post);
            } else {
                alert("Incorrect ID. You can only delete your own posts.");
            }
        });

        postDiv.appendChild(postContent);
        postDiv.appendChild(deleteButton);
        postedTextContainer.appendChild(postDiv);
    }

    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => addPostToDOM(post));
    }

    function deletePost(postToDelete) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.userId !== postToDelete.userId || post.userInput !== postToDelete.userInput);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
});
