document.getElementById('signup-form').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('이미 존재하는 사용자 이름입니다.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('회원가입이 완료되었습니다!');
            window.location.href = 'login.html';
        }
    } else {
        alert('모든 필드를 채워주세요.');
    }
}
