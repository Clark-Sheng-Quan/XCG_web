// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.querySelector('.mobile-nav-toggle');
    var mobileNav = document.querySelector('.mobile-navbar');
    var closeNavButton = document.createElement('div');

    // 创建关闭按钮并添加到移动导航栏
    closeNavButton.classList.add('mobile-nav-close');
    closeNavButton.innerHTML = '&times;'; // 使用HTML实体代表一个“关闭”字符
    mobileNav.appendChild(closeNavButton);

    // 切换移动导航栏的显示状态
    toggleButton.addEventListener('click', function() {
        mobileNav.classList.add('active');
    });

    // 点击关闭按钮隐藏移动导航栏
    closeNavButton.addEventListener('click', function() {
        mobileNav.classList.remove('active');
    });
});
