
const productList = document.getElementById("productList");
const nutriscoreBaseUrl = "https://static.openfoodfacts.org/images/attributes/dist/nutriscore";

function createProductCard(product) {
  const name = product.product_name || product.product_name_fr || "Produit non disponible";
  const imageUrl = product.image_front_small_url || product.image_url || "";
  const grade = (product.nutriscore_grade || "").toLowerCase();

  const card = document.createElement("div");
  card.className = "card mb-3";

  const row = document.createElement("div");
  row.className = "row g-0 align-items-center";

  const imageColumn = document.createElement("div");
  imageColumn.className = "col-4 col-md-2";

  const image = document.createElement("img");
  image.className = "img-fluid rounded-start p-2";
  image.alt = name;
  image.src = imageUrl;

  if (!imageUrl) {
    image.alt = "Produit non disponible";
  }

  const bodyColumn = document.createElement("div");
  bodyColumn.className = "col-8 col-md-10";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex justify-content-between align-items-center gap-3";

  const title = document.createElement("h3");
  title.className = "card-title h6 mb-0";
  title.textContent = name;

  cardBody.appendChild(title);

  if (grade) {
    const badge = document.createElement("img");
    badge.src = `${nutriscoreBaseUrl}-${grade}.svg`;
    badge.alt = `Nutri-Score ${grade.toUpperCase()}`;
    badge.style.width = "90px";
    badge.style.height = "auto";
    cardBody.appendChild(badge);
  }

  imageColumn.appendChild(image);
  bodyColumn.appendChild(cardBody);
  row.appendChild(imageColumn);
  row.appendChild(bodyColumn);
  card.appendChild(row);

  return card;
}

function createUnavailableCard() {
  const card = document.createElement("div");
  card.className = "card mb-3";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.textContent = "Produit non disponible";

  card.appendChild(cardBody);

  return card;
}

async function fetchProduct(barcode) {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,product_name_fr,image_front_small_url,image_url,nutriscore_grade`
  );

  if (!response.ok) {
    throw new Error("Produit non disponible");
  }

  const data = await response.json();

  if (!data.product) {
    throw new Error("Produit non disponible");
  }

  return data.product;
}

async function loadIngredients() {
  if (!productList) {
    return;
  }

  productList.innerHTML = "";

  try {
    const response = await fetch("ingredients.json");
    const data = await response.json();
    const ingredients = data.ingredients || [];

    for (const ingredient of ingredients) {
      try {
        const product = await fetchProduct(ingredient.barcode);
        productList.appendChild(createProductCard(product));
      } catch (error) {
        productList.appendChild(createUnavailableCard());
      }
    }
  } catch (error) {
    productList.appendChild(createUnavailableCard());
  }
}

document.addEventListener("DOMContentLoaded", loadIngredients);
