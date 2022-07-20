const hamburgerMenu = document.getElementById('menu');
const navMenu = document.getElementById("nav");

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show')

})

// Scroll Header
window.addEventListener("scroll", () => {
    const header = document.getElementById('header')
  if (window.scrollY > header.offsetHeight + 200) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

const copyBox = document.getElementById("copyText");
const copyBtn = document.getElementById("copyBtn");

copyBox.addEventListener('focusin', () => {
    copyBox.select();
});


copyBtn.addEventListener('click',() => {
    const copyText = copyBox.value;
    copyBox.select();
    navigator.clipboard.writeText(copyText);
    copyBox.value = 'Copied!'

    setTimeout(() => {
        copyBox.value = copyText;
    }, 2000);
})