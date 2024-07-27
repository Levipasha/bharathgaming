document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = document.getElementById('userInput').value;
    const postedTextContainer = document.getElementById('postedTextContainer');

    if (userInput.trim() !== "") {
        const userId = prompt("Please enter your user ID or username:");

        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerText = userInput;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            const enteredId = prompt("Please enter your user ID or username to delete:");
            if (enteredId === userId) {
                postedTextContainer.removeChild(postDiv);
            } else {
                alert("Incorrect ID. You can only delete your own posts.");
            }
        });

        postDiv.appendChild(deleteButton);
        postedTextContainer.appendChild(postDiv);

        document.getElementById('userInput').value = ''; // Clear the input field
    } else {
        alert("Please enter some text.");
    }
});
