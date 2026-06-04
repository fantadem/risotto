const productList = document.getElementById("productList");
const nutriscoreBaseUrl = "https://static.openfoodfacts.org/images/attributes/dist/nutriscore";
window.products = [];

function createProductCard(ingredient) {
  const name = ingredient.name;
  const imageUrl = ingredient.image_front_small_url || "";
  const grade = (ingredient["nutriscore_grade"] || ingredient["nutriscore_grade "] || "").trim().toLowerCase();

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

async function loadIngredients() {
  if (!productList) return;

  productList.innerHTML = "";
  window.products = [];

  try {
    const response = await fetch("ingredients.json");
    const data = await response.json();
    const ingredients = data.ingredients || [];

    for (const ingredient of ingredients) {
      window.products.push(ingredient);
      productList.appendChild(createProductCard(ingredient));
    }
  } catch (error) {
    // échec silencieux
  }

  document.dispatchEvent(new CustomEvent("ingredientsLoaded"));
}

document.addEventListener("DOMContentLoaded", loadIngredients);
