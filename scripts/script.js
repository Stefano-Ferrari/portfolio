let bright = '/styles/style-bright.css';
let dark = '/styles/style-dark.css';
//let lightSwitchStatus;
//let switchIMG = document.getElementById("light-switch");
let footerStatus = document.getElementById("footer");

function toggleContact() {
  footerStatus.classList.toggle('hiddenFooter');
  footerStatus.classList.toggle('showFooter');
}

document.addEventListener('DOMContentLoaded', () => {
  const tags = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');

  console.log(cards);

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Toggle active class
      tag.classList.toggle('active');

      // Get all active tags
      const activeTags = Array.from(tags)
        .filter(t => t.classList.contains('active'))
        .map(t => t.dataset.tag);

      // Filter cards
      cards.forEach(card => {

        console.log(card);
        const cardTags = card.dataset.tags.split(' ');
        if (activeTags.length === 0 || activeTags.some(tag => cardTags.includes(tag))) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});


/*function lightCheck() {
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
}*/

function resizeGridItem(item) {
  grid = document.getElementsByClassName("projects-grid")[0];
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



let menu = document.getElementById("menu");
let menuBtn = document.getElementById("menu-btn-nav");

/*let toggleMenuButton = document.getElementsByClassName("toggleMenu");*/

function toggleMenu() {
  menu.classList.toggle("hidden");
  menuBtn.classList.toggle("menu-open");
}


function togglePopup(element) {


  if (element.classList.contains("close-icon")) {
    let parent = element.parentElement;
    let parent2 = parent.parentElement;

    let popup = parent2.querySelector(".popup");


    popup.classList.add("hidden");
    parent2.classList.toggle("relative");
    document.body.classList.toggle("overflow");
  } else {

    let parent = element.parentElement;
    let popup = parent.querySelector(".popup");

    if (popup.classList.contains("hidden")) {

      popup.classList.remove("hidden");
      element.classList.toggle("relative");
      document.body.classList.toggle("overflow");
    }
  }


}

function closePopup(element) {

  let parent = element.parentElement;
  let parent2 = parent.parentElement;
  let parent3 = parent2.parentElement;

  let popup = parent3.querySelector(".popup");
  console.log(popup);


  popup.classList.toggle("hidden");
  parent3.classList.toggle("relative");
  document.body.classList.toggle("overflow");

}

function stopVideo() {
  document.querySelectorAll("video").forEach(video => {
   video.pause();
   video.currentTime = 0; // facoltativo: riavvia da inizio
 });

 document.querySelectorAll("iframe").forEach(iframe => {
    const src = iframe.src;
    iframe.src = src; // riassegna lo stesso src per forzare il reload
  });
}

/*for(var i=0;i<toggleMenuButton.length;i++){
    toggleMenuButton[i].addEventListener('click', toggleMenu, false);
}*/

function pageLoader() {
  //lightCheck();
  resizeAllGridItems();

}


window.onload = pageLoader();
window.addEventListener("resize", resizeAllGridItems);

allItems = document.getElementsByClassName("item");
for (x = 0; x < allItems.length; x++) {
  imagesLoaded(allItems[x], resizeInstance);
}
