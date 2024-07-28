document.getElementById('problemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const problem = document.getElementById('problem').value;
    const password = document.getElementById('password').value;

    const problems = JSON.parse(localStorage.getItem('problems')) || [];

    problems.push({ username, problem, password });

    localStorage.setItem('problems', JSON.stringify(problems));

    displayProblems();
    this.reset();
});

function displayProblems() {
    const problems = JSON.parse(localStorage.getItem('problems')) || [];
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';

    problems.forEach((problem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${problem.username}</strong>: ${problem.problem}
            <button onclick="deleteProblem(${index})">Delete</button>
        `;
        problemList.appendChild(li);
    });
}

function deleteProblem(index) {
    const problems = JSON.parse(localStorage.getItem('problems'));
    const password = prompt("Enter the password to delete this problem:");

    if (password === problems[index].password) {
        problems.splice(index, 1);
        localStorage.setItem('problems', JSON.stringify(problems));
        displayProblems();
    } else {
        alert("Incorrect password. Unable to delete the problem.");
    }
}

// Display problems when the page loads
document.addEventListener('DOMContentLoaded', displayProblems);
