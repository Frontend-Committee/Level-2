let products = [
    { id: 1, name: "shirt", price: 1000, image: "imagesIcons/shirt.jpg" },
    { id: 2, name: "shoes", price: 599, image: "imagesIcons/shoes.jpg" },
    { id: 3, name: "cap", price: 350, image: "imagesIcons/cap.jpg" },
    { id: 4, name: "dress", price: 2500, image: "imagesIcons/dress.jpg" },
    { id: 5, name: "pants", price: 790, image: "imagesIcons/pants.jpg" },
    { id: 6, name: "accessories", price: 500, image: "imagesIcons/accessories.jpg" },
];

let cartCounter = 0;
const cartCounterElement = document.getElementById("counter");
const productsContainer = document.getElementById("productContainer");

function addCartEvent(){
    const addToCartButtons = document.querySelectorAll(".product button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCounter++;
            cartCounterElement.textContent = cartCounter;
        });
    });
}

function displayProducts(productsArray) {
    productsContainer.innerHTML = "";
    productsArray.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img class="imageContainer" src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });

    addCartEvent();
}

displayProducts(products);