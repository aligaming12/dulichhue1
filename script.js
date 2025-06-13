document.addEventListener('DOMContentLoaded', function() {
    // --- Account Dropdown Logic ---
    const accountArea = document.querySelector('.account-area');
    const dropdownMenu = accountArea.querySelector('.dropdown-menu');
    
    if(accountArea) {
        const trigger = accountArea.querySelector('.account-trigger');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', function(e){
        if (dropdownMenu && !accountArea.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // --- Check Login Status ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    const accountTriggerText = document.getElementById('account-trigger-text');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (loggedInUser) {
        // User is logged in
        if (loggedOutView) loggedOutView.style.display = 'none';
        if (loggedInView) loggedInView.style.display = 'block';
        if (accountTriggerText) accountTriggerText.textContent = loggedInUser;
        if (userNameDisplay) userNameDisplay.textContent = loggedInUser;
    } else {
        // User is not logged in
        if (loggedOutView) loggedOutView.style.display = 'block';
        if (loggedInView) loggedInView.style.display = 'none';
        if (accountTriggerText) accountTriggerText.textContent = 'Tài khoản';
    }

    // --- Logout Logic ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.reload(); // Reload the page
        });
    }

    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800); // Match transition duration
            }, 500); // Minimum display time
        });
    }

    // --- Navigation Bar Styling on Scroll ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Scroll-Reveal Animation for Sections & Cards ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Hiển thị nút sau khi cuộn 300px
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Swiper Slider Initialization ---
    const swiper = new Swiper('.content-slider', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- Smooth Scroll to Last Viewed Section ---
    const lastViewedSectionId = sessionStorage.getItem('lastViewedSection');
    if (lastViewedSectionId) {
        const lastViewedSection = document.getElementById(lastViewedSectionId);
        if (lastViewedSection) {
            // Dùng timeout nhỏ để đảm bảo trang tải xong hoàn toàn trước khi cuộn
            setTimeout(() => {
                lastViewedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        // Xóa khỏi session để không tự cuộn ở lần làm mới trang tiếp theo
        sessionStorage.removeItem('lastViewedSection'); 
    }

    // --- Save Last Viewed Section ---
    const links = document.querySelectorAll('.card-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Tìm phần section cha gần nhất và lấy ID
            const parentSection = e.target.closest('section');
            if (parentSection) {
                sessionStorage.setItem('lastViewedSection', parentSection.id);
            }
        });
    });
});