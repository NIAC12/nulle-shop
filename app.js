// 제품 목록 데이터 (이미지 파일 경로를 업데이트)
const products = [
    { id: 1, name: '눌레 키링', price: 10000, description: '귀여운 눌레 키링입니다.', image: '/mnt/data/keyring.jpg' },
    { id: 2, name: '눌레 스마트폰 홀더', price: 15000, description: '편리한 눌레 스마트폰 홀더입니다.', image: '/mnt/data/SPholder.jpg' },
    { id: 3, name: '눌레 티셔츠', price: 20000, description: '편안한 눌레 티셔츠입니다.', image: '/mnt/data/Tshirts.jpg' },
];

window.onload = function() {
    displayProducts(products);

    const imageUploadInput = document.getElementById('image-upload');
    const preview = document.getElementById('preview');

    imageUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" class="w-full h-64 object-cover">`;
        }
        reader.readAsDataURL(file);
    });

    const productUploadForm = document.getElementById('product-upload-form');
    productUploadForm.onsubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const description = document.getElementById('product-description').value;
        const imageFile = document.getElementById('image-upload').files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                id: products.length + 1,
                name: name,
                price: price,
                description: description,
                image: e.target.result
            };
            products.push(newProduct);
            displayProducts(products);
            productUploadForm.reset();
            preview.innerHTML = `<span class="text-gray-600">여기에 이미지 미리보기가 표시됩니다</span>`;
        }
        reader.readAsDataURL(imageFile);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('bg-white', 'p-4', 'shadow-md', 'rounded-lg', 'text-center');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4 rounded-lg">
            <h2 class="text-xl font-bold mb-2">${product.name}</h2>
            <p class="text-gray-600 mb-2">${product.description}</p>
            <p class="text-gray-800 font-semibold mb-4">${product.price}원</p>
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
