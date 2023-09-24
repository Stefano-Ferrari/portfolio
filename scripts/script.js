let bright = '/styles/style-bright.css';
let dark = '/styles/style-dark.css';
let lightSwitchStatus;
let switchIMG = document.getElementById("light-switch");
let footerStatus = document.getElementById("footer");
/*const ball = document.querySelector('.ball');
const maxX = window.innerWidth - ball.clientWidth;
const maxY = window.innerHeight - ball.clientHeight;
const speed = 1; // You can adjust the speed as needed
let posX = window.innerWidth/2;
let posY = window.innerHeight/2;
let angle = Math.random() * Math.PI * 2;*/

/*function animateBall() {
  posX += Math.cos(angle) * speed;
  posY += Math.sin(angle) * speed;

  if (posX < 0 || posX > maxX-(ball.clientWidth/2)) {
    angle = Math.PI - angle;
  }

  if (posY < -ball.clientHeight/2 || posY > maxY-(ball.clientHeight)) {
    angle = -angle;
  }

  ball.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(animateBall);
}

function resetBallPosition() {
  posX = window.innerWidth/2;
  posY = window.innerHeight/2;
  ball.style.transform = `translate(${posX}px, ${posY}px)`;
  angle = Math.random() * Math.PI * 2;
}

function ballClickHandler() {
  // Your code here for what should happen when the ball is clicked
  console.log("Ball clicked!");
}

ball.addEventListener('click', ballClickHandler);
window.addEventListener('resize', resetBallPosition);

animateBall();*/

function toggleContact() {
  footerStatus.classList.toggle('hiddenFooter');
  footerStatus.classList.toggle('showFooter');
}


function lightCheck() {
  if (localStorage.getItem("currentStatus") == null) {
    localStorage.setItem("currentStatus", 0);
    lightSwitchStatus = 0;
    switchIMG.setAttribute("src", "/images/switch-dark.svg");
  } else {
    lightSwitchStatus = localStorage.getItem("currentStatus");
  }

  let stylesheet = document.getElementsByTagName("link").item(0);

  if (lightSwitchStatus == 0) {
    stylesheet.setAttribute("href", dark);
    lightSwitchStatus = 0;
    switchIMG.setAttribute("src", "/images/switch-dark.svg");
  } else {
    stylesheet.setAttribute("href", bright);
    lightSwitchStatus = 1;
    switchIMG.setAttribute("src", "/images/switch-bright.svg");
  }

  //console.log(lightSwitchStatus);
}

let lightSwitchButton = document.getElementsByClassName("lightSwitch");

function lightSwitch() {

  let stylesheet = document.getElementsByTagName("link").item(0);

  if (lightSwitchStatus != 0) {
    stylesheet.setAttribute("href", dark);
    lightSwitchStatus = 0;
    localStorage.setItem("currentStatus", lightSwitchStatus);
    switchIMG.setAttribute("src", "/images/switch-dark.svg");
  } else {
    stylesheet.setAttribute("href", bright);
    lightSwitchStatus = 1;
    localStorage.setItem("currentStatus", lightSwitchStatus);
    switchIMG.setAttribute("src", "/images/switch-bright.svg");
  }
}

for(var i=0;i<lightSwitchButton.length;i++){
    lightSwitchButton[i].addEventListener('click', lightSwitch, false);
}

function resizeGridItem(item) {
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-gap'));
  rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + (rowSpan);
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName("item");
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  item = instance.elements[0];
  resizeGridItem(item);
}

let overlay = document.getElementById("overlay");
let trigger = document.getElementById("trigger");

let toggleOverlayButton = document.getElementsByClassName("toggleOverlay");

function toggleOverlay() {
  overlay.classList.toggle("show");
  trigger.classList.toggle("show");
}

for(var i=0;i<toggleOverlayButton.length;i++){
    toggleOverlayButton[i].addEventListener('click', toggleOverlay, false);
}


let menu = document.getElementById("menu");

let toggleMenuButton = document.getElementsByClassName("toggleMenu");

function toggleMenu() {
  menu.classList.toggle("show");
}

for(var i=0;i<toggleMenuButton.length;i++){
    toggleMenuButton[i].addEventListener('click', toggleMenu, false);
}


trigger.addEventListener('wheel', function(e) {
  if ((trigger.classList.contains("clickthrough")) == false) {
    trigger.classList.add("clickthrough");
  }
  setTimeout(function() {
    trigger.classList.remove("clickthrough");
  }, 10);

});

function pageLoader(){
  lightCheck();
  resizeAllGridItems();

}


window.onload = pageLoader();
window.addEventListener("resize", resizeAllGridItems);

allItems = document.getElementsByClassName("item");
for(x=0;x<allItems.length;x++){
  imagesLoaded( allItems[x], resizeInstance);
}
