window.onload = function() {
    const cartList = document.getElementById('cart-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartList.innerHTML = '<p class="text-center text-gray-600">장바구니가 비어 있습니다.</p>';
    } else {
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('border-b', 'p-4', 'flex', 'justify-between', 'items-center');
            productElement.innerHTML = `
                <div>
                    <h2 class="text-xl">${product.name}</h2>
                    <p>${product.price}원</p>
                </div>
                <button onclick="removeFromCart(${product.id})" class="text-red-500">제거</button>
            `;
            cartList.appendChild(productElement);
        });
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}
