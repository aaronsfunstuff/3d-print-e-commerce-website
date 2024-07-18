function updateCartTotal() {
    const cartItems = getCartItems();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.querySelector('#cart-total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

function renderCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.querySelector('.cart-items-container');

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}"></p>
                <button data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.cart-item input').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.getAttribute('data-id');
            const quantity = parseInt(event.target.value);
            updateCartQuantity(productId, quantity);
            updateCartTotal();
        });
    });

    document.querySelectorAll('.cart-item button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
            updateCartTotal();
        });
    });

    updateCartTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.querySelector('.cart-items-container')) {
        renderCartItems();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                image: button.getAttribute('data-image')
            };
            addToCart(product);
        });
    });
});
