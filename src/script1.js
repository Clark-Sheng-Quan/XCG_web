document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavItems = document.querySelector('.mobile-nav-items');

    toggle.addEventListener('click', function() {
        mobileNavItems.classList.toggle('active'); // 切换移动导航项的显示和隐藏
    });
});
