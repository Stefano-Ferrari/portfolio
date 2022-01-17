let bright = 'styles/style-bright.css';
let dark = 'styles/style-dark.css';
let lightSwitchStatus;
let switchIMG = document.getElementById("light-switch");

function lightCheck() {
  if (localStorage.getItem("currentStatus") == null) {
    localStorage.setItem("currentStatus", 0);
    lightSwitchStatus = 0;
    switchIMG.setAttribute("src", "images/switch-dark.svg");
  } else {
    lightSwitchStatus = localStorage.getItem("currentStatus");
  }

  let stylesheet = document.getElementsByTagName("link").item(0);

  if (lightSwitchStatus == 0) {
    stylesheet.setAttribute("href", dark);
    lightSwitchStatus = 0;
    switchIMG.setAttribute("src", "images/switch-dark.svg");
  } else {
    stylesheet.setAttribute("href", bright);
    lightSwitchStatus = 1;
    switchIMG.setAttribute("src", "images/switch-bright.svg");
  }

  console.log(lightSwitchStatus);
}

let lightSwitchButton = document.getElementsByClassName("lightSwitch");

function lightSwitch() {

  let stylesheet = document.getElementsByTagName("link").item(0);

  if (lightSwitchStatus != 0) {
    stylesheet.setAttribute("href", dark);
    lightSwitchStatus = 0;
    localStorage.setItem("currentStatus", lightSwitchStatus);
    switchIMG.setAttribute("src", "images/switch-dark.svg");
  } else {
    stylesheet.setAttribute("href", bright);
    lightSwitchStatus = 1;
    localStorage.setItem("currentStatus", lightSwitchStatus);
    switchIMG.setAttribute("src", "images/switch-bright.svg");
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

  lightCheck();
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



trigger.addEventListener('wheel', function(e) {
  console.log("scroll");
  if ((trigger.classList.contains("clickthrough")) == false) {
    trigger.classList.add("clickthrough");
  }
  setTimeout(function() {
    trigger.classList.remove("clickthrough");
    console.log("stop")
  }, 10);

});


window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);

/*allItems = document.getElementsByClassName("item");
for(x=0;x<allItems.length;x++){
  imagesLoaded( allItems[x], resizeInstance);
}*/
