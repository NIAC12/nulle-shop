document.getElementById('checkout-form').onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const card = document.getElementById('card').value;

    if (name && address && card) {
        alert('결제가 완료되었습니다. 감사합니다!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    } else {
        alert('모든 필드를 채워주세요.');
    }
}

