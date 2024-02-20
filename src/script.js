
// Element
const modules = document.querySelectorAll('.module-page');
const subPage = document.querySelector('.sub-page');
const whiteLine = document.querySelector('.white-line');
const scrollIndicator = document.querySelector('.scroll-indicator');
const navItems = document.querySelectorAll('.nav-item a');
const blackCircles = document.querySelectorAll('.black-circle');
const redCircles = document.querySelectorAll('.red-circle');
const indicatorVariable = document.querySelectorAll('#indicator-variable');

var currentOffset = 82; 
var maxOffset = 82;
var minOffset = -240
var scrollSpeed = 15
var moduleIndex = [0, 82, 155, 200, 250, 290]


document.addEventListener('DOMContentLoaded', adjustViewForDevice);

window.addEventListener('resize', adjustViewForDevice);

function adjustViewForDevice() {

    if (window.matchMedia("(max-width: 1366px").matches) {
        mobileView()
    }else{
        desktopView()
    }
    redirect('.ticket-button')
    redirect('.guest-link')
    redirect('.form-link')
    redirect('.ig-link')
}

function mobileView() {
    redirect('.mobile-ticket')
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'src/mobile.css'; // 指定mobile.css的路径
    document.head.appendChild(link);
    const toggleButton = document.querySelector('.mobile-nav-toggle'); // 找到触发按钮
    const mobileNav = document.querySelector('.mobile-navbar'); // 找到移动导航栏

    // 切换移动导航栏的显示状态
    toggleButton.addEventListener('click', function() {
        mobileNav.classList.toggle('active'); // 如果导航栏已经是激活状态，这将会关闭它，反之亦然
    });

    const navLinks = document.querySelectorAll('.mobile-nav-items a'); // 假设你的移动导航项在这个容器内

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止链接的默认动作

            // 获取链接的href属性，并移除前缀'#'以得到对应模块的ID
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // 使用scrollIntoView方法平滑滚动到目标元素
            if (targetElement) {
                if (targetId === 'module0') {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                mobileNav.classList.toggle('active');
            }
        });
    });

    const mobileTicket = document.querySelector('.mobile-ticket');
    mobileTicket.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
}

function desktopView() {


    var offset = getViewportWidthRatio()
    minOffset = offset[0]
    moduleIndex[2] *= offset[1]
    moduleIndex[3] *= offset[1]
    moduleIndex[4] *= offset[1]
    moduleIndex[5] *= offset[1]

    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY > 0 && currentOffset > minOffset) {
            // 向下滚动，逐步拉出副页面
            currentOffset = Math.max(currentOffset - scrollSpeed, minOffset);
        } else if (event.deltaY < 0 && currentOffset < maxOffset) {
            // 向上滚动，逐步收回副页面
            currentOffset = Math.min(currentOffset + scrollSpeed, maxOffset );
        }
        requestAnimationFrame(() => {
            subPage.style.left = `${currentOffset}vw`;
            whiteLine.style.left = `${currentOffset}vw`;
            updateActiveNavItem();
            updateIndicator()
        });
    },{ passive: false });

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActive(index);
            moveToPage(index);
        });
    });

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
}

function updateIndicator() {
    if (currentOffset < maxOffset - 10) {
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
    if(navItems[index]){navItems[index].classList.add('active');};
    if(redCircles[index]){redCircles[index].classList.add('active');};
    if(blackCircles[index]){blackCircles[index].classList.add('active');};
}
function updateActiveNavItem() {
    if(currentOffset >= maxOffset-moduleIndex[0]){setActive(0)}
    else if(currentOffset >= maxOffset-moduleIndex[1]){setActive(1)}
    else if(currentOffset >= maxOffset-moduleIndex[2]){setActive(2)}
    else if(currentOffset >= maxOffset-moduleIndex[3]){setActive(3)}
    else if(currentOffset >= maxOffset-moduleIndex[4]){setActive(4)}
    else if(currentOffset >= maxOffset-moduleIndex[5]){setActive(5)}
    else{setActive(6)}
}

    // 定义函数以根据导航项移动副页面
function moveToPage(index) {
    currentOffset = maxOffset - (moduleIndex[index]);
    requestAnimationFrame(() => {
        subPage.style.left = `${currentOffset}vw`;
        whiteLine.style.left = `${currentOffset}vw`;
        updateIndicator()
    });
}

function redirect(className) {
    document.querySelectorAll(className).addEventListener('click', function(event) {
        event.preventDefault();
        const destinationUrl = this.href;
        document.getElementById('loading-animation').style.display = 'flex';
        window.location.href = destinationUrl;
    });
}
function copyEmailToClipboard(event) {
    event.preventDefault();
    const email = 'xcgcon@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show the confirmation message
        const confirmationMessage = document.getElementById('copyConfirmation');
        confirmationMessage.style.display = 'inline';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 2000);
    }, (err) => {
        console.error('Failed to copy: ', err);
    });
}

function getViewportWidthRatio() {
    var viewportWidth = window.innerWidth;
    const computedStyle = getComputedStyle(subPage);
    const width = computedStyle.width;
    const widthValue = parseFloat(width);
    var offset = (widthValue - viewportWidth * 1.08) / viewportWidth * -100;
    const def = 3.3436820083682006
    var ratio = (widthValue - viewportWidth * 0.08) / viewportWidth / def;
    
    return [offset, ratio]
}

// Get all clickable boxes in join us
const boxes = document.querySelectorAll(".option");
// Loop through each box and add click event
boxes.forEach(function(box) {
  box.onclick = function() {
    var modalId = box.getAttribute("data-modal-target");
    var modal = document.querySelector(modalId);
    modal.style.display = "flex";
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

