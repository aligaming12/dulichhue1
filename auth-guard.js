document.addEventListener('DOMContentLoaded', () => {
    // Lấy thông tin người dùng đã đăng nhập từ localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Nếu không có người dùng nào đăng nhập
    if (!loggedInUser) {
        // Ẩn nội dung chính của trang chi tiết
        const detailContainer = document.querySelector('.detail-container');
        if (detailContainer) {
            detailContainer.style.display = 'none';
        }

        // Tạo và hiển thị hộp thoại thông báo
        const intendedUrl = window.location.href;
        const loginUrl = `../login.html?redirect=${encodeURIComponent(intendedUrl)}`;

        const modalHTML = `
            <div class="auth-overlay">
                <div class="auth-modal">
                    <h2>Yêu Cầu Đăng Nhập</h2>
                    <p>Bạn cần phải đăng nhập để xem nội dung chi tiết. Vui lòng đăng nhập để tiếp tục khám phá!</p>
                    <a href="${loginUrl}" class="login-btn">Đi đến trang đăng nhập</a>
                </div>
            </div>
        `;

        // Chèn hộp thoại vào cuối trang
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}); 