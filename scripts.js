document.getElementById('donateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const donorName = document.getElementById('donorName').value;
    const foodItem = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;

    const foodList = JSON.parse(localStorage.getItem('foodList')) || [];

    foodList.push({ donorName, foodItem, quantity });

    localStorage.setItem('foodList', JSON.stringify(foodList));

    displayFoodItems();
    this.reset();
});

document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const requesterName = document.getElementById('requesterName').value;
    const requestedFood = document.getElementById('requestedFood').value;
    const requestedQuantity = document.getElementById('requestedQuantity').value;

    const foodList = JSON.parse(localStorage.getItem('foodList')) || [];

    const itemIndex = foodList.findIndex(item => item.foodItem === requestedFood && item.quantity >= requestedQuantity);

    if (itemIndex !== -1) {
        foodList[itemIndex].quantity -= requestedQuantity;
        if (foodList[itemIndex].quantity === 0) {
            foodList.splice(itemIndex, 1);
        }
        localStorage.setItem('foodList', JSON.stringify(foodList));
        alert('Food request successful!');
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
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.foodItem}</strong> - Quantity: ${item.quantity} (Donor: ${item.donorName})`;
        foodListElement.appendChild(li);
    });
}

// Display food items when the page loads
document.addEventListener('DOMContentLoaded', displayFoodItems);
