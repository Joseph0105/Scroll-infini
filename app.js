const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;
const loader = document.querySelector(".loader");

async function FetchData() {
  try {
    // On récupère les images de l'api

    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=3SaT2A1b1qYml9Ev_NLfZ46URiWxp-C-s0TbGbXoTCU`
    );

    // Si les images ne sont pas chargées pour X raison, on envoir un message d'erreur

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    // On récupère les données en json

    const data = await response.json();
    console.log(data);

    // Si l'utilisateur recherche quelques chose qui n'est pas dans la base de données

    if (!data.total) {
      imagesList.textContent = "";
      throw new Error(
        `Nous n'avons pas trouvé de résultats pour votre recherche...`
      );
    }

    // On appel la création d'image

    createImages(data.results);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createImages(data) {
  // Pour chaques image dans data, on crée un élément img

  data.forEach((img) => {
    const newImg = document.createElement("img");

    // il suffit de regarder la réponse en console pour trouver la source, on modifie le format, toujours dans la réponse en console

    newImg.src = img.urls.regular;
    imagesList.appendChild(newImg);
    loader.style.display = "none";
  });
}

// On créer une intersectionObserver pour détecter quand le scroll arrive à la fin du viewport, ici on a mis une marge à la racine de 50% pour que tout se déclenche avant que l'utilisateur arrive à la fin

const bottomObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: "50%",
});

// On crée la fonction avec comme paramètre "entries" qui est un tableau contenant des informations sur tous les éléments cibles.
function handleIntersect(entries) {
  // Si la position de défilement scrollY (ce que j'ai déjà scrollé) est supérieur à la hauteur de la fenêtre && que le tableau d'objet d'entrée est intersecté.
  // Alors, le pageIndex s'incrémente pour ne pas que fetchData charge les mêmes images.
  //  isIntersecting est un booléen qui indiqe si l'élément cible est actuellement en intersection avec le viewport.

  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    FetchData();
  }
}

// On sélectionne notre marker

const infiniteMarker = document.querySelector(".infinite-marker");

// on appel la méthode observe sur bottomObserve pour ajouter l'élément du DOM infiniteMarker, celui qui va déclencher le chargement de nouvelles images.

bottomObserver.observe(infiniteMarker);

// En gros, quand le scroll va toucher 50% de la marge de la racine de la div infiniteMarker, ça va recharger de nouvelles images

// On récupère l'input et le formulaire du HTML
const input = document.querySelector(".search-input");
const form = document.querySelector("form");

// On crée une fonction qui sera appelé plus tard, preventDefault pour pas que ça soummette dans le vide
function handleSearch(e) {
  e.preventDefault();

  if (input.value === "") {
    errorMsg.textContent =
      "Veuillez entrer du texte avant de soumettre une recherche";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    //   On change la valeur de searchQuery par celle de l'utilisateur
    searchQuery = input.value;
    //   On déclenche FetchData sur la recherche de l'utilisateur
    FetchData();
  }
}
// On déclenche l'évènement submit sur le formulaire, en appliquant la fonction Handlsubmit
form.addEventListener("submit", handleSearch);
