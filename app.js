const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;
const loader = document.querySelector(".loader");

async function FetchData() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=office`
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}
FetchData();
