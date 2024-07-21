const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 임시 사용자 데이터베이스
const users = [];
// 임시 리뷰 데이터베이스
const reviews = [];
// 임시 구매 이력 데이터베이스
const purchaseHistory = [];

// 임시 상품 데이터베이스
const products = [
    { id: 1, name: "눌레 반팔티", category: "clothing", description: "눌레를 가슴속에 품을 수 있는 기회", price: 25000, imageUrl: "https://i.imgur.com/2sXJZwX.jpg" },
    { id: 2, name: "눌레 스마트폰 홀더", category: "accessories", description: "스마트폰 뒤에 눌레가 착!", price: 15000, imageUrl: "https://i.imgur.com/X6Pbl4m.jpg" },
    { id: 3, name: "눌레 키링", category: "accessories", description: "눌레와 항상 함께하고 싶다면 눌레키링", price: 8000, imageUrl: "https://i.imgur.com/V1oXjxD.jpg" }
];

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.json({ success: false, message: '사용자 이름이 이미 존재합니다.' });
    }

    users.push({ username, password });
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' });
    }
});

app.post('/api/reviews', (req, res) => {
    const { productId, reviewText, reviewRating, username } = req.body;
    reviews.push({ productId, reviewText, reviewRating, username });
    res.json({ success: true });
});

app.get('/api/reviews/:productId', (req, res) => {
    const { productId } = req.params;
    const productReviews = reviews.filter(review => review.productId === productId);
    res.json({ reviews: productReviews });
});

app.get('/api/products', (req, res) => {
    const { category, search } = req.query;
    let filteredProducts = products;

    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({ products: filteredProducts });
});

app.get('/api/recommendations/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.json({ recommendations: [] });
    }

    const recommendations = products.filter(p => p.category === product.category && p.id !== product.id);
    res.json({ recommendations });
});

app.post('/api/purchase', (req, res) => {
    const { username, products } = req.body;
    purchaseHistory.push({ username, products, date: new Date() });
    res.json({ success: true });
});

app.get('/api/purchase-history/:username', (req, res) => {
    const { username } = req.params;
    const userPurchaseHistory = purchaseHistory.filter(purchase => purchase.username === username);
    res.json({ history: userPurchaseHistory });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
