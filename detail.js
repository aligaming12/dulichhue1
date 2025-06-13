import { database } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Guard ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Bạn phải đăng nhập để xem nội dung này!');
        // Lưu lại trang muốn truy cập để chuyển hướng sau khi đăng nhập
        const intendedUrl = window.location.href;
        window.location.href = `login.html?redirect=${encodeURIComponent(intendedUrl)}`;
        return; // Dừng thực thi nếu chưa đăng nhập
    }

    // --- Load Content ---
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const itemId = urlParams.get('id');

    if (category && itemId && database[category]) {
        const item = database[category].find(i => i.id === itemId);

        if (item) {
            document.getElementById('detail-title').textContent = item.name;
            document.getElementById('detail-description').textContent = item.description;
            const detailImage = document.getElementById('detail-image');
            detailImage.src = item.image;
            detailImage.alt = item.name;
            document.title = `${item.name} - Khám phá Huế`;
        } else {
            document.querySelector('.detail-content').innerHTML = '<h1>404 - Không tìm thấy nội dung</h1>';
        }
    } else {
        document.querySelector('.detail-content').innerHTML = '<h1>Lỗi: Thông tin không hợp lệ</h1>';
    }
}); 