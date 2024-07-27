document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userInput = document.getElementById('userInput').value;
    const postedTextContainer = document.getElementById('postedTextContainer');

    if (userId.trim() !== "" && userName.trim() !== "" && userInput.trim() !== "") {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postContent = document.createElement('div');
        postContent.innerHTML = `<strong>${userName}</strong> (${userId}): ${userInput}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            const enteredId = prompt("Please enter your user ID to delete:");
            if (enteredId === userId) {
                postedTextContainer.removeChild(postDiv);
            } else {
                alert("Incorrect ID. You can only delete your own posts.");
            }
        });

        postDiv.appendChild(postContent);
        postDiv.appendChild(deleteButton);
        postedTextContainer.appendChild(postDiv);

        document.getElementById('userId').value = '';
        document.getElementById('userName').value = '';
        document.getElementById('userInput').value = ''; // Clear the input fields
    } else {
        alert("Please fill in all fields.");
    }
});
