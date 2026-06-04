const nutriscoreElement = document.getElementById("nutriscore-recette");

function getGrade(score) {
  if (score <= -1) return "a";
  if (score <= 2) return "b";
  if (score <= 10) return "c";
  if (score <= 18) return "d";
  return "e";
}

function waitForProducts() {
  return new Promise(resolve => {
    const check = () => {
      if (window.products && window.products.length) {
        resolve(window.products);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

async function main() {
  const products = await waitForProducts();

  const scores = products
    .map(p => p.nutriscore_score)
    .filter(s => typeof s === "number");

  if (!scores.length) return;

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  const grade = getGrade(avg);

  const img = document.createElement("img");
  img.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${grade}.svg`;
  img.alt = `Nutri-Score ${grade.toUpperCase()}`;
  img.style.width = "120px";

  nutriscoreElement.appendChild(img);
}

document.addEventListener("DOMContentLoaded", main);
