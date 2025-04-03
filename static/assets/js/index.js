const form = document.querySelector("form");
const input = document.querySelector("input");

localStorage.setItem('cloakedTitle', 'My Drive - Google Drive');
localStorage.setItem('cloakedIcon', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');
tabCloak();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker.register("/oldsw.js", {
    scope: '/sv/',
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
    else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
    localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
    location.href = "/portal";
  });
});

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
  return false;
}
