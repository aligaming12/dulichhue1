document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const notificationBox = document.getElementById('notification-box');

    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        notificationBox.innerHTML = '';
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationBox.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => { if(notificationBox.contains(notification)) notificationBox.removeChild(notification); }, 500);
        }, 3000);
    }

    // Lấy danh sách người dùng từ localStorage, hoặc tạo mới nếu chưa có
    function getUsers() {
        return JSON.parse(localStorage.getItem('hueTourismUsers')) || [];
    }

    // Lưu danh sách người dùng vào localStorage
    function saveUsers(users) {
        localStorage.setItem('hueTourismUsers', JSON.stringify(users));
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const pageTitle = document.querySelector('h2').textContent;
            const users = getUsers();

            // Xử lý cho trang đăng ký
            if (pageTitle.includes('Đăng ký')) {
                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();
                const confirmPassword = document.getElementById('confirm-password').value.trim();

                if (!username || !email || !password) {
                    showNotification('Vui lòng nhập đầy đủ thông tin!', 'error');
                    return;
                }
                if (password !== confirmPassword) {
                    showNotification('Mật khẩu xác nhận không khớp!', 'error');
                    return;
                }
                if (users.some(user => user.username === username)) {
                    showNotification('Tên đăng nhập đã tồn tại!', 'error');
                    return;
                }
                if (users.some(user => user.email === email)) {
                    showNotification('Email đã được sử dụng!', 'error');
                    return;
                }

                users.push({ username, email, password });
                saveUsers(users);

                showNotification('Đăng ký thành công! Đang chuyển đến trang đăng nhập...', 'success');
                setTimeout(() => { window.location.href = 'login.html'; }, 2000);
            }
            // Xử lý cho trang đăng nhập
            else if (pageTitle.includes('Đăng nhập')) {
                const credential = document.getElementById('credential').value.trim();
                const password = document.getElementById('password').value.trim();

                if (!credential || !password) {
                    showNotification('Vui lòng nhập đầy đủ thông tin!', 'error');
                    return;
                }

                const foundUser = users.find(user => (user.username === credential || user.email === credential));

                if (foundUser && foundUser.password === password) {
                    localStorage.setItem('loggedInUser', foundUser.username);
                    showNotification('Đăng nhập thành công! Chào mừng bạn.', 'success');

                    // Kiểm tra xem có cần chuyển hướng đặc biệt không
                    const urlParams = new URLSearchParams(window.location.search);
                    const redirectUrl = urlParams.get('redirect');

                    setTimeout(() => { 
                        window.location.href = redirectUrl || 'index.html'; 
                    }, 2000);
                } else {
                    showNotification('Tên đăng nhập hoặc mật khẩu không chính xác!', 'error');
                }
            }
        });
    }
}); 