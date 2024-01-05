let currentOffset = -600; // 副页面初始偏移量，表示副页面主要内容在屏幕外
let currentWhile = 80;
const maxOffset = 0; // 副页面完全展开时的偏移量
const minOffset = -600; // 副页面完全隐藏时的偏移量
const subPage = document.querySelector('.sub-page');
const whiteLine = document.querySelector('.white-line');

document.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY > 0 && currentOffset < maxOffset) {
            // 向下滚动，逐步拉出副页面
            currentOffset = Math.min(currentOffset + 25, maxOffset);
            currentWhile = Math.min(currentWhile - 25);
        } else if (event.deltaY < 0 && currentOffset > minOffset) {
            // 向上滚动，逐步收回副页面
            currentOffset = Math.max(currentOffset - 25, minOffset);
            currentWhile = Math.max(currentWhile + 25);
        }

        requestAnimationFrame(() => {
            subPage.style.right = `${currentOffset}vw`;
            whiteLine.style.left = `${currentWhile}vw`;
        });
    });
});

// 获取所有顶部导航链接、黑圈和红圈
const navItems = document.querySelectorAll('.nav-item a');
const blackCircles = document.querySelectorAll('.black-circle');
const redCircles = document.querySelectorAll('.red-circle');

// 定义激活导航项、黑圈和红圈的函数
function setActive(index) {
    // 移除之前所有的active类
    navItems.forEach(item => item.classList.remove('active'));
    blackCircles.forEach(circle => circle.classList.remove('active'));
    redCircles.forEach(circle => circle.classList.remove('active'));

    // 为点击的元素添加active类
    navItems[index].classList.add('active');
    blackCircles[index].classList.add('active');
    redCircles[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {

    // 定义函数以根据导航项移动副页面
    function moveToPage(index) {
        // 计算新的right值
        const newRightValue = -600 + (index * 100); // 每个导航项增加100vw
        const newLeftValue = 80 - (index * 100)
        requestAnimationFrame(() => {
            subPage.style.right = `${newRightValue}vw`;;
            whiteLine.style.left = `${newLeftValue}vw`;
        });
    }

    // 为导航项添加点击事件监听器
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActive(index);
            moveToPage(index);
        });
    });

    // 为黑圈添加点击事件监听器
    blackCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            setActive(index);
            moveToPage(index);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const whiteLine = document.querySelector('.white-line');

    window.addEventListener('scroll', () => {
        // 获取滚动指示器的当前位置
        const indicatorLeft = scrollIndicator.getBoundingClientRect().left;

        // 更新白线的位置
        whiteLine.style.left = `${indicatorLeft}px`;
    });
});
