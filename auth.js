document.addEventListener('DOMContentLoaded', function() {
    const userSection = document.getElementById('user-section');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userSection.innerHTML = `
            <span class="mr-4">환영합니다, ${loggedInUser.username}님</span>
            <button onclick="logout()" class="bg-gray-800 text-white px-4 py-2 rounded">로그아웃</button>
        `;
    } else {
        userSection.innerHTML = `
            <a href="login.html" class="bg-gray-800 text-white px-4 py-2 rounded mr-2">로그인</a>
            <a href="signup.html" class="bg-gray-800 text-white px-4 py-2 rounded">회원가입</a>
        `;
    }
});

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
}
