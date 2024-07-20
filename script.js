const products = [
    { id: 1, name: "눌레 반팔티", description: "눌레를 가슴속에 품을 수 있는 기회", price: 25000, imageUrl: "https://i.imgur.com/2sXJZwX.jpg" },
    { id: 2, name: "눌레 스마트폰 홀더", description: "스마트폰 뒤에 눌레가 착!", price: 15000, imageUrl: "https://i.imgur.com/hmEGD4U.jpeg" },
    { id: 3, name: "눌레 키링", description: "눌레와 항상 함께하고 싶다면 눌레키링", price: 8000, imageUrl: "https://i.imgur.com/EiwGin1.jpeg" }
];

const cart = [];

function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₩${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart();
    alert(`${product.name} added to cart!`);
    updateCart();
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        saveCart();
        alert('Product removed from cart!');
        updateCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
    }
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.textContent = product.name;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(product.id);
        cartItem.appendChild(removeButton);
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = calculateTotal();
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total Price: ₩${totalPrice.toLocaleString()}`;
    cartContainer.appendChild(totalDiv);
}

function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayProducts(products);
    updateCart();
});
