// 제품 목록 데이터 (이미지 파일 경로를 업데이트)
const products = [
    { id: 1, name: '눌레 키링', price: 8000, description: '귀여운 눌레 키링입니다.', image: 'https://github.com/NIAC12/nulle-store/blob/main/images/keyring.jpg?raw=true' },
    { id: 2, name: '눌레 스마트폰 홀더', price: 15000, description: '편리한 눌레 스마트폰 홀더입니다.', image: 'https://github.com/NIAC12/nulle-store/blob/main/images/SPholder.jpg?raw=true' },
    { id: 3, name: '눌레 티셔츠', price: 25000, description: '편안한 눌레 티셔츠입니다.', image: 'https://github.com/NIAC12/nulle-store/blob/main/images/Tshirts.jpg?raw=true' },
];

window.onload = function() {
    displayProducts(products);
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const formattedPrice = product.price.toLocaleString('ko-KR') + ' ₩';
        const productElement = document.createElement('div');
        productElement.classList.add('bg-white', 'p-4', 'shadow-md', 'rounded-lg', 'text-center');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-contain mb-4 rounded-lg">
            <h2 class="text-xl font-bold mb-2">${product.name}</h2>
            <p class="text-gray-600 mb-2">${product.description}</p>
            <p class="text-gray-800 font-semibold mb-4">${formattedPrice}</p>
            <button onclick="addToCart(${product.id})" class="bg-gray-800 text-white px-4 py-2 rounded">장바구니에 추가</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id == productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`);
}
