let allProducts = [];

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    })
    .catch(error => console.log("Error:", error));

let cartCounter = 0;
const cartCounterElement = document.getElementById("counter");
const productsContainer = document.getElementById("productContainer");

function addCartEvent(){
    const buttons = document.querySelectorAll(".addToCartBtn");
    buttons.forEach(button => {
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
        productElement.className = "productCard";
        productElement.innerHTML = `
            <img class="productImage" src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="addToCartBtn">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });

    addCartEvent();
}

searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );
    displayProducts(filteredProducts);
});
