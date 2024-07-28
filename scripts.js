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

        const newEntry = {
            donorName,
            foodItem,
            quantity,
            location,
            expiryTime
        };
        
        database.ref('foodItems').push(newEntry);

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

        database.ref('foodItems').once('value', function(snapshot) {
            const foodList = snapshot.val();
            let found = false;

            for (let key in foodList) {
                if (foodList[key].foodItem === requestedFood && foodList[key].quantity >= requestedQuantity) {
                    const donorLocation = foodList[key].location;
                    foodList[key].quantity -= requestedQuantity;

                    if (foodList[key].quantity === 0) {
                        database.ref('foodItems').child(key).remove();
                    } else {
                        database.ref('foodItems').child(key).update({ quantity: foodList[key].quantity });
                    }

                    alert(`Food request successful! Donor location: ${donorLocation}`);
                    found = true;
                    break;
                }
            }

            if (!found) {
                alert('Requested food item not available or insufficient quantity.');
            }

            displayFoodItems();
        });

        this.reset();
    });

    function displayFoodItems() {
        const foodListElement = document.getElementById('foodList');
        foodListElement.innerHTML = '';

        database.ref('foodItems').on('value', (snapshot) => {
            const foodList = snapshot.val();
            for (let key in foodList) {
                const item = foodList[key];
                if (item.expiryTime > Date.now()) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${item.foodItem}</strong> - Quantity: ${item.quantity} (Donor: ${item.donorName}, Location: ${item.location})`;
                    foodListElement.appendChild(li);
                } else {
                    database.ref('foodItems').child(key).remove();
                }
            }
        });
    }
});
