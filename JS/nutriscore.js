const nutriscoreElement = document.getElementById("nutriscore-recette");

const gradeOrder = ["a", "b", "c", "d", "e"];

function averageGrade(grades) {
  const indices = grades.map(g => gradeOrder.indexOf(g)).filter(i => i !== -1);
  if (!indices.length) return null;
  const avg = indices.reduce((a, b) => a + b, 0) / indices.length;
  return gradeOrder[Math.round(avg)];
}

function computeNutriscore() {
  const products = window.products || [];

  const grades = products
    .map(p => ((p["nutriscore_grade"] || p["nutriscore_grade "] || "")).trim().toLowerCase())
    .filter(g => gradeOrder.includes(g));

  const grade = averageGrade(grades);
  if (!grade) return;

  const img = document.createElement("img");
  img.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${grade}.svg`;
  img.alt = `Nutri-Score moyen : ${grade.toUpperCase()}`;
  img.style.width = "120px";
  img.style.mixBlendMode = "multiply";

  nutriscoreElement.appendChild(img);
}

document.addEventListener("ingredientsLoaded", computeNutriscore);
