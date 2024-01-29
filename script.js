let currentOffset = -600; // 副页面初始偏移量，表示副页面主要内容在屏幕外
let currentWhile = 82;
const maxOffset = 0; // 副页面完全展开时的偏移量
const minOffset = -600; // 副页面完全隐藏时的偏移量
const minWhite = 82
const moduleIndex = []
// 获取所有元素
const subPage = document.querySelector('.sub-page');
const whiteLine = document.querySelector('.white-line');
const scrollIndicator = document.querySelector('.scroll-indicator');
const navItems = document.querySelectorAll('.nav-item a');
const blackCircles = document.querySelectorAll('.black-circle');
const redCircles = document.querySelectorAll('.red-circle');
const indicatorVariable = document.querySelectorAll('#indicator-variable');


document.addEventListener('DOMContentLoaded', () => {
    // 更新导航栏激活状态的函数
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (event.deltaY > 0 && currentOffset < maxOffset) {
            // 向下滚动，逐步拉出副页面
            currentOffset = Math.min(currentOffset + 20, maxOffset);
            currentWhile = Math.max(currentWhile - 20, minWhite - 600);
        } else if (event.deltaY < 0 && currentOffset > minOffset) {
            // 向上滚动，逐步收回副页面
            currentOffset = Math.max(currentOffset - 20, minOffset);
            currentWhile = Math.min(currentWhile + 20, minWhite );
        }
        requestAnimationFrame(() => {
            subPage.style.right = `${currentOffset}vw`;
            whiteLine.style.left = `${currentWhile}vw`;
            updateActiveNavItem();
            updateIndicator()
        });
    });

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
    scrollIndicator.addEventListener('click', () => {
        setActive(1);
        moveToPage(1);
    });
});

function updateIndicator() {
    if (currentOffset > -590) {
        indicatorVariable.forEach(item => item.style.opacity = '0');
        scrollIndicator.style.width = '10vw';
        whiteLine.style.width = '10vw';
    } else {
        indicatorVariable.forEach(item => item.style.opacity = '1');
        scrollIndicator.style.width = '18vw';
        whiteLine.style.width = '18vw';
    }
}


// 定义激活导航项、黑圈和红圈的函数
function setActive(index) {
    // 移除之前所有的active类
    navItems.forEach(item => item.classList.remove('active'));
    blackCircles.forEach(circle => circle.classList.remove('active'));
    redCircles.forEach(circle => circle.classList.remove('active'));
    // 为点击的元素添加active类
    navItems[index].classList.add('active');
    redCircles[index].classList.add('active');
    if(blackCircles[index]){blackCircles[index].classList.add('active');}
}
function updateActiveNavItem() {
    if(currentOffset >= -25){setActive(6)}
    else if(currentOffset >= -125){setActive(5)}
    else if(currentOffset >= -225){setActive(4)}
    else if(currentOffset >= -325){setActive(3)}
    else if(currentOffset >= -425){setActive(2)}
    else if(currentOffset >= -525){setActive(1)}
    else{setActive(0)}
}

    // 定义函数以根据导航项移动副页面
function moveToPage(index) {
    // 计算新的right值
    currentOffset = minOffset + (index * 82); // 每个导航项增加100vw
    currentWhile = minWhite - (index * 82)
    requestAnimationFrame(() => {
        subPage.style.right = `${currentOffset}vw`;;
        whiteLine.style.left = `${currentWhile}vw`;
        updateIndicator()
    });
}

// Get all clickable boxes
const boxes = document.querySelectorAll(".option");
// Loop through each box and add click event
boxes.forEach(function(box) {
  box.onclick = function() {
    var modalId = box.getAttribute("data-modal-target");
    var modal = document.querySelector(modalId);
    modal.style.display = "block";
  };
});
// Close modal when clicking on close button or outside of the modal
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";}
  if (event.target.classList.contains('close-button')) {
    event.target.closest('.modal').style.display = "none";
  }
};


