const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
document.addEventListener("DOMContentLoaded", () => {
    gridBtn.classList.add("active");
    getBusinesses();
});
gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
    getBusinesses();
});
listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
    getBusinesses();
});

async function getBusinesses() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayBusinesses(data.businesses);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function displayBusinesses(businesses) {
    directory.innerHTML = "";
    businesses.forEach(business => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = "images/" + business.image;
        img.alt = business.name;

        const name = document.createElement("h2");
        name.textContent = business.name;

        const address = document.createElement("p");
        address.textContent = business.address;

        const phone = document.createElement("p");
        phone.textContent = business.phone;

        const description = document.createElement("p");
        description.textContent = business.description;

        const membership = document.createElement("p");
        if (business.membership == 3) {
            membership.textContent = "⭐ Gold Member";
            membership.classList.add("gold");
        } else if (business.membership == 2) {
            membership.textContent = "⭐ Silver Member";
            membership.classList.add("silver");
        } else {
            membership.textContent = "Member";
            membership.classList.add("member");
        }

        const link = document.createElement("a");
        link.href = business.website;
        link.textContent = "Visit Website →";
        link.target = "_blank";

        if (directory.classList.contains("grid")) {
            card.appendChild(img);
        }
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(description);
        card.appendChild(membership);
        card.appendChild(link);

        directory.appendChild(card);
    });
}