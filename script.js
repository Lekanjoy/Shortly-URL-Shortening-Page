const hamburgerMenu = document.getElementById("menu");
const menuIcon = document.getElementById("icon-close");
const navMenu = document.getElementById("nav");

//Hamburger Menu
hamburgerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  if (navMenu.classList.contains("show")) {
    menuIcon.src = "/images/icon-close.svg";
    menuIcon.style.width = "25px";
  } else {
    menuIcon.src = "/images/icon-hamburger.svg";
  }
});

// Scroll Header
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > header.offsetHeight + 200) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

const shortenURL = document.getElementById("shortenURL");
const shortenBtn = document.getElementById("shortenBtn");
const label = document.getElementById("label");

//  Creating an onClick event on the Button
shortenBtn.addEventListener("click", getShortLink);

// create functioni that validate url
function validateURL(url) {
  const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

// Error message for invalid URL
function errorMessage() {
  label.style.display = "block";
  shortenURL.style.border = "2px solid hsl(0, 87%, 67%)";
  // Removes error message after 5 Seconds
  setTimeout(() => {
    label.style.display = "none";
    shortenURL.style.border = "none";
  }, 5000);
}

// Fetching link from API
async function getShortLink() {
  const userURL = shortenURL.value;
  // check if url is valid

  if (!userURL) {
    errorMessage();

    return;
  }

  if (!validateURL(userURL)) {
    errorMessage();
    label.textContent = "Invalid URL";
    return;
  }

  const response = await fetch("https://gotiny.cc/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: userURL,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0].code) {
        return `https://gotiny.cc/${data[0].code}`;
      }
    })
    .catch((err) => {
      shortenBtn.textContent = "Shorten It!";

      console.error(err);
      label.textContent = "Something went wrong!";
      shortenURL.style.border = "2px solid hsl(0, 87%, 67%)";
      label.style.display = "block";

      // Removes error message after 5 Seconds
      setTimeout(() => {
        label.style.display = " none";
        shortenURL.style.border = "none";
      }, 5000);
    });

  if (response) {
    createLinkElement(userURL, response);
    shortenURL.value = "";
    shortenBtn.textContent = "Shorten It!";
  }
}

console.log(getShortLink());

function createLinkElement(originalLink, shortLink) {
  let container = document.querySelector(".clipboard");

  // Creating the element
  let div = document.createElement("div");
  let originalInput = document.createElement("input");
  let shortInput = document.createElement("input");
  let button = document.createElement("button");

  // Adding Tailwind classes to style the created elements
  div.className = "link flex w-full gap-y-0.5 relative pb-6";
  originalInput.className =
    "hidden outline-none rounded-lg rounded-r-none w-1/2 p-4 text-DarkViolet md:block";
  shortInput.className =
    "short w-full outline-none rounded-l-none rounded-lg p-4 text-Cyan md:w-1/2";
  button.className =
    "copyBtn absolute px-4 py-2 bg-Cyan rounded-lg text-white  right-3 top-2";

  // Making sure user can only copy the links and not accidentally modify it.
  originalInput.readOnly = true;
  shortInput.readOnly = true;

  // Adding Content to the elements
  originalInput.value = originalLink;
  shortInput.value = shortLink;
  button.textContent = "Copy";

  // Appending the elements to the Page
  container.appendChild(div);
  div.append(originalInput);
  div.append(shortInput);
  div.append(button);

  // Copy to Clipboard Here
  copyToClipboard();

  //  Makes sure Generated Links are not more than 3
  // tidyLinks(container);
}

// Function to copy shortlink generated.
function copyToClipboard() {
  let copyBtn = document.getElementsByClassName("copyBtn");

  // Looping through all the copy buttons to be created.
  for (let i = 0; i < copyBtn.length; i++) {
    copyBtn[i].addEventListener("click", (e) => {
      let url = e.target.parentNode.querySelector(".short").value;
      let selectText = e.target.parentNode.querySelector(".short");
      selectText.select();
      navigator.clipboard.writeText(url);
      copyBtn[i].textContent = "Copied";
      copyBtn[i].classList.add("copiedBg");

      // Setting the 'Copy' button back to its original state after 5seconds
      setTimeout(() => {
        copyBtn[i].textContent = "Copy";
        copyBtn[i].classList.remove("copiedBg");
        selectText.setSelectionRange(0, 0);
      }, 5000);
    });
  }
}

//  Setting the limit of links generated to 3
function tidyLinks(param) {
  let limit = 3;

  // if(container.length > limit){
  //   container.splice(0, container.length - limit);

  // }
  // console.log(param.length);
}
