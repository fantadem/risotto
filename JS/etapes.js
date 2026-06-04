
document.addEventListener("DOMContentLoaded", () => {
    fetch("etapes.json")
        .then((res) => {
            if (!res.ok) throw new Error("Impossible de charger etapes.json");
            return res.json();
        })
        .then((data) => {
            // Titre dynamique
            if (data.title) {
                const h1 = document.querySelector("h1");
                if (h1) h1.textContent = data.title;
                document.title = data.title;
            }

            const list = document.getElementById("etapesList");
            if (!list) return;
            list.innerHTML = "";

            if (!data.steps || data.steps.length === 0) {
                list.innerHTML = `<li class="list-group-item text-warning">Aucune étape trouvée.</li>`;
                return;
            }

            data.steps.forEach((step) => {
                const li = document.createElement("li");
                li.className = "list-group-item py-3";
                li.textContent = step.text;
                list.appendChild(li);
            });
        })
        .catch((err) => {
            const list = document.getElementById("etapesList");
            if (list) {
                list.innerHTML = `<li class="list-group-item text-danger">Erreur : ${err.message}</li>`;
            }
        });
});