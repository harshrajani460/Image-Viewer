let images = [
  {
    link: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    link: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    link: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    link: "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    link: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];
function truncateString() {
  let list = document.querySelectorAll(".text-list");
  list.forEach((item, index) => {
    if (item.scrollWidth > item.clientWidth) {
      let str = images[index].title;
      let finalStrLength = Math.floor(
        (item.clientWidth / item.scrollWidth) * str.length
      );
      finalStrLength -= 3; //we have to include ...
      finalStr =
        str.slice(0, Math.floor(finalStrLength / 2)) +
        "..." +
        str.slice(str.length - Math.floor(finalStrLength / 2));
      item.innerText = finalStr;
    }
  });
}

function createItem(item) {
  let div = document.createElement("div");
  let img = document.createElement("img");
  let text = document.createElement("div");

  img.className = "img-list";
  img.src = item.link;
  img.title = item.title;

  text.innerText = item.title;
  text.className = "text-list";

  div.className = "list-item";
  div.appendChild(img);
  div.appendChild(text);
  return div;
}
function showList(images) {
  let list = document.getElementsByClassName("list")[0];
  images.forEach((item) => {
    let itemElement = createItem(item);
    list.appendChild(itemElement);
  });
}

function showPreview(item) {
  let image = document.getElementsByClassName("img-preview")[0];
  image.src = item.firstElementChild.src;

  let previewText = document.getElementsByClassName("preview-text")[0];
  console.log(previewText);
  previewText.innerText = item.firstElementChild.title;
}
function removeHighlight() {
  let list = document.getElementsByClassName("list-item");
  Array.from(list).forEach((item) => {
    item.classList.remove("highlight");
  });
}
function addHighlight(item) {
  item.classList.add("highlight");
}
function clickEventListener() {
  let listOfItem = document.getElementsByClassName("list-item");
  [...listOfItem].forEach((item) => {
    item.addEventListener("click", (event) => {
      let img = item.firstElementChild.src;
      removeHighlight();
      addHighlight(item);
      showPreview(item);
    });
  });
}
function keyEventListener() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      let item = findHighlightedItem();
      let newHighlighted = highlightPrevItem(item);
      showPreview(newHighlighted);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      let item = findHighlightedItem();
      let newHighlighted = highlightNextItem(item);
      showPreview(newHighlighted);
    }
  });
}
function findHighlightedItem() {
  let list = document.getElementsByClassName("list-item");
  let finalItem;
  [...list].forEach((item) => {
    if ([...item.classList].indexOf("highlight") >= 0) {
      finalItem = item;
    }
  });

  return finalItem;
}
function highlightNextItem(item) {
  let next = item.nextElementSibling;
  if (next) {
    if ([...next.classList].indexOf("list-item") >= 0) {
      removeHighlight();
      addHighlight(next);
      return next;
    }
  }
  return item;
}
function highlightPrevItem(item) {
  let prev = item.previousElementSibling;
  if (prev) {
    if ([...prev.classList].indexOf("list-item") >= 0) {
      removeHighlight();
      addHighlight(prev);
      return prev;
    }
  }
  return item;
}

function initialView() {
  showList(images);
  let item = document.getElementsByClassName("list-item")[0];
  addHighlight(item);
  showPreview(item);
  clickEventListener();
  keyEventListener();
}
initialView();
truncateString();
