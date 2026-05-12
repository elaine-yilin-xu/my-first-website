const products = [

    {
        name: "Revital Eyes Firming Gel",
        price: "A$90.00",
        image: "images/product1.jpg",
        link: "revital-eyes-firming-gel.html",
        tags: []
    },

    {
        name: "Age Defying Hand Cream",
        price: "A$45.00",
        image: "images/product2.jpg",
        link: "age-defying-hand-cream.html",
        tags: []
    },

    {
        name: "Desensitising Elixir",
        price: "A$60.00",
        image: "images/product3.jpg",
        link: "desensitising-elixir.html",
        tags: []
    },

    {
        name: "Eye Contour Elixir",
        price: "A$60.00",
        image: "images/product4.jpg",
        link: "eye-contour-elixir.html",
        tags: []
    },

    {
        name: "Hydrating Mud Mask",
        price: "A$75.00",
        image: "images/product5.jpg",
        link: "hydrating-mud-mask.html",
        tags: []
    },

    {
        name: "Hydrating Conditioner",
        price: "A$35.00",
        image: "images/product6.jpg",
        link: "hydrating-conditioner.html",
        tags: []
    },

    {
        name: "Age Defying Elixir",
        price: "A$75.00",
        image: "images/product7.jpg",
        link: "age-defying-elixir.html",
        tags: ["aging", "elixir-serum"]
    },

    {
        name: "Nourishing Dry Body Oil",
        price: "A$40.00",
        image: "images/product8.jpg",
        link: "nourishing-dry-body-oil.html",
        tags: []
    }

 
];

const productsContainer = document.getElementById("products-container");

function renderProducts(productList) {
    productsContainer.innerHTML = "";
    productList.forEach(product => {
        productsContainer.innerHTML += `
            <article class="product-card">
                <a href="${product.link}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>

                </a>
                <div class="product-bottom">
                    <p>${product.price}</p>
                    <button type="button">ADD TO CART</button>
                </div>
            </article>
        `;
    });
}

if (productsContainer) {
    renderProducts(products);
}

const applyBtn = document.querySelector(".apply-btn");
const resetBtn = document.querySelector(".reset-btn");

if (applyBtn && productsContainer) {
    applyBtn.addEventListener("click", () => {
        const checkedFilters = Array.from(
            document.querySelectorAll(".filter-checkbox:checked")
        ).map(checkbox => checkbox.value);
        const filteredProducts = products.filter(product => {
            return checkedFilters.every(filter => product.tags.includes(filter));
        });
        renderProducts(filteredProducts);
    });
}

if (resetBtn && productsContainer) {
    resetBtn.addEventListener("click", () => {
        document.querySelectorAll(".filter-checkbox").forEach(checkbox => {

            checkbox.checked = false;
        });
        renderProducts(products);
    });
}