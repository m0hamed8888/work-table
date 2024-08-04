document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const price = parseFloat(document.getElementById('price').value);
    const dayName = document.getElementById('dayName').value;

    if (date && !isNaN(price) && dayName) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = { date, price, dayName };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));

        displayItems();
        event.target.reset();
    } else {
        alert('Please fill out all fields and enter a valid price.');
    }
});

function displayItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    let totalPrice = 0;

    items.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const price = parseFloat(item.price);  // Ensure price is a number
        span.textContent = `Date: ${item.date}, Price: ${price.toFixed(2)}, Day: ${item.dayName}`;
        li.appendChild(span);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(index);
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(index);
        li.appendChild(deleteButton);

        itemList.appendChild(li);

        totalPrice += price;
    });

    // Save total price to local storage
    localStorage.setItem('totalPrice', totalPrice);

    // Display total price
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)}`;
}

function editItem(index) {
    const items = JSON.parse(localStorage.getItem('items'));
    const item = items[index];

    document.getElementById('date').value = item.date;
    document.getElementById('price').value = item.price;
    document.getElementById('dayName').value = item.dayName;

    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('items'));
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
}

document.addEventListener('DOMContentLoaded', displayItems);

