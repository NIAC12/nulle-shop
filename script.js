const products = [
    { id: 1, name: "눌레 반팔티", category: "clothing", description: "눌레를 가슴속에 품을 수 있는 기회", price: 25000, imageUrl: "https://i.imgur.com/2sXJZwX.jpg" },
    { id: 2, name: "눌레 스마트폰 홀더", category: "accessories", description: "스마트폰 뒤에 눌레가 착!", price: 15000, imageUrl: "https://i.imgur.com/X6Pbl4m.jpg" },
    { id: 3, name: "눌레 키링", category: "accessories", description: "눌레와 항상 함께하고 싶다면 눌레키링", price: 8000, imageUrl: "https://i.imgur.com/V1oXjxD.jpg" }
];

const cart = [];
let currentProduct = null;

function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" onclick="showProductDetails(${product.id})">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₩${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(productDiv);
    });
}

function showProductDetails(productId) {
    currentProduct = products.find(p => p.id === productId);
    const productContainer = document.getElementById('product-details');
    productContainer.style.display = 'block';

    document.getElementById('product-image').src = currentProduct.imageUrl;
    document.getElementById('product-name').innerText = currentProduct.name;
    document.getElementById('product-description').innerText = currentProduct.description;
    document.getElementById('product-price').innerText = `Price: ₩${currentProduct.price.toLocaleString()}`;
    document.getElementById('add-to-cart-button').onclick = () => addToCart(productId);

    loadReviews(productId);
    loadRecommendations(productId);
}

function goBack() {
    document.getElementById('product-details').style.display = 'none';
    displayProducts(products);
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
    loadProducts();
});

document.getElementById('categoryFilter').addEventListener('change', function() {
    loadProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadProducts();
    updateCart();
});

function loadProducts() {
    const search = document.getElementById('searchInput').value;
    const category = document.getElementById('categoryFilter').value;

    fetch(`/api/products?category=${category}&search=${search}`)
    .then(response => response.json())
    .then(data => {
        displayProducts(data.products);
    });
}

function submitReview(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review-text').value;
    const reviewRating = document.getElementById('review-rating').value;
    const username = 'current_user'; // 실제 사용자 이름으로 교체 필요

    fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: currentProduct.id, reviewText, reviewRating, username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('리뷰가 제출되었습니다.');
            loadReviews(currentProduct.id);
        } else {
            alert('리뷰 제출에 실패했습니다.');
        }
    });
}

function loadReviews(productId) {
    fetch(`/api/reviews/${productId}`)
    .then(response => response.json())
    .then(data => {
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';

        data.reviews.forEach(review => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = `${review.username}: ${review.reviewText} (평점: ${review.reviewRating})`;
            reviewList.appendChild(reviewItem);
        });
    });
}

function loadRecommendations(productId) {
    fetch(`/api/recommendations/${productId}`)
    .then(response => response.json())
    .then(data => {
        const recommendationContainer = document.getElementById('recommendation-container');
        recommendationContainer.innerHTML = '';

        data.recommendations.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" onclick="showProductDetails(${product.id})">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ₩${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;

            recommendationContainer.appendChild(productDiv);
        });
    });
}

function showPurchaseHistory() {
    const username = 'current_user'; // 실제 사용자 이름으로 교체 필요

    fetch(`/api/purchase-history/${username}`)
    .then(response => response.json())
    .then(data => {
        const purchaseHistoryContainer = document.getElementById('purchase-history-container');
        purchaseHistoryContainer.innerHTML = '';

        data.history.forEach(purchase => {
            const purchaseDiv = document.createElement('div');
            purchaseDiv.className = 'purchase';

            purchaseDiv.innerHTML = `
                <p>구매 날짜: ${new Date(purchase.date).toLocaleDateString()}</p>
                <ul>
                    ${purchase.products.map(product => `<li>${product.name} - ₩${product.price.toLocaleString()}</li>`).join('')}
                </ul>
            `;

            purchaseHistoryContainer.appendChild(purchaseDiv);
        });

        document.getElementById('purchase-history').style.display = 'block';
    });
}

function hidePurchaseHistory() {
    document.getElementById('purchase-history').style.display = 'none';
}
