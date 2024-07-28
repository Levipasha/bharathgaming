document.addEventListener('DOMContentLoaded', function() {
    displayFoodItems();

    document.getElementById('donateForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const donorName = document.getElementById('donorName').value;
        const foodItem = document.getElementById('foodItem').value;
        const quantity = document.getElementById('quantity').value;
        const location = document.getElementById('location').value;
        const expiry = document.getElementById('expiry').value;

        if (!donorName || !foodItem || !quantity || !location || !expiry) {
            alert("Please fill in all fields.");
            return;
        }

        const expiryTime = Date.now() + expiry * 60000; // Convert minutes to milliseconds
        const foodList = JSON.parse(localStorage.getItem('foodList')) || [];

        const newEntry = { donorName, foodItem, quantity, location, expiryTime };
        foodList.push(newEntry);

        localStorage.setItem('foodList', JSON.stringify(foodList));

        scheduleDeletion(newEntry, foodList.length - 1);
        displayFoodItems();
        this.reset();
    });

    document.getElementById('requestForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const requesterName = document.getElementById('requesterName').value;
        const requestedFood = document.getElementById('requestedFood').value;
        const requestedQuantity = document.getElementById('requestedQuantity').value;

        if (!requesterName || !requestedFood || !requestedQuantity) {
            alert("Please fill in all fields.");
            return;
        }

        const foodList = JSON.parse(localStorage.getItem('foodList')) || [];

        const itemIndex = foodList.findIndex(item => item.foodItem === requestedFood && item.quantity >= requestedQuantity);

        if (itemIndex !== -1) {
            const donorLocation = foodList[itemIndex].location;
            foodList[itemIndex].quantity -= requestedQuantity;
            if (foodList[itemIndex].quantity === 0) {
                foodList.splice(itemIndex, 1);
            }
            localStorage.setItem('foodList', JSON.stringify(foodList));
            alert(`Food request successful! Donor location: ${donorLocation}`);
        } else {
            alert('Requested food item not available or insufficient quantity.');
        }

        displayFoodItems();
        this.reset();
    });

    function displayFoodItems() {
        const foodList = JSON.parse(localStorage.getItem('foodList')) || [];
        const foodListElement = document.getElementById('foodList');
        foodListElement.innerHTML = '';

        foodList.forEach((item, index) => {
            if (item.expiryTime > Date.now()) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.foodItem}</strong> - Quantity: ${item.quantity} (Donor: ${item.donorName}, Location: ${item.location})`;
                foodListElement.appendChild(li);
                scheduleDeletion(item, index);
            }
        });
    }

    function scheduleDeletion(item, index) {
        const timeLeft = item.expiryTime - Date.now();
        setTimeout(() => {
            const foodList = JSON.parse(localStorage.getItem('foodList')) || [];
            if (foodList[index] && foodList[index].expiryTime === item.expiryTime) {
                foodList.splice(index, 1);
                localStorage.setItem('foodList', JSON.stringify(foodList));
                displayFoodItems();
            }
        }, timeLeft);
    }
});