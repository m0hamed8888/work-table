document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const date = document.getElementById('date').value;
    const price = document.getElementById('price').value;
    const dayName = document.getElementById('dayName').value;
    
    if (date && price && dayName) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ date, price, dayName });
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
        event.target.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

function displayItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = `Date: ${item.date}, Price: ${item.price}, Day: ${item.dayName}`;
        li.appendChild(span);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editItem(index);
        li.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(index);
        li.appendChild(deleteButton);
        
        itemList.appendChild(li);
    });
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
