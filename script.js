const products = [

    {
        name: "Revital Eyes Firming Gel",
        price: "A$90.00",
        image: "images/product1.jpg",
        link: "revital-eyes-firming-gel.html",
        skin: "Recommended for all skin type",
        description: "A unique formulation of Eyebright Extract and Active Caffeine Complex awakens the skin.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Age Defying Hand Cream",
        price: "A$45.00",
        image: "images/product2.jpg",
        link: "age-defying-hand-cream.html",
        skin: "Recommended for dry, aging skin",
        description: "Silky-soft and quick absorbing, this cream has harnessed the power of Oleuropein.",
        volume: "120 mL",
        tags: []
    },

    {
        name: "Desensitising Elixir",
        price: "A$60.00",
        image: "images/product3.jpg",
        link: "desensitising-elixir.html",
        skin: "Recommended for all skin type",
        description: "A soothing blend with Lavender and Chamomile Essential Oil to calm skin.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Eye Contour Elixir",
        price: "A$60.00",
        image: "images/product4.jpg",
        link: "eye-contour-elixir.html",
        skin: "Recommended for all skin type",
        description: "A superior blend rich in Omega 3 and 6, restores moisture and smoothness around eye.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Hydrating Mud Mask",
        price: "A$75.00",
        image: "images/product5.jpg",
        link: "hydrating-mud-mask.html",
        skin: "Recommended for all skin types",
        description: "An active clay designed to cleanse and hydrate dry and normal skin types.",
        volume: "90 mL",
        tags: []
    },

    {
        name: "Hydrating Conditioner",
        price: "A$35.00",
        image: "images/product6.jpg",
        link: "hydrating-conditioner.html",
        skin: "Recommended for dry, dehydrated skin",
        description: "A nourishing conditioner with Neem Seed Oil and Wheat Protein to assist in hydrating hair.",
        volume: "250 mL",
        tags: []
    },

    {
        name: "Age Defying Elixir",
        price: "A$75.00",
        image: "images/product7.jpg",
        link: "age-defying-elixir.html",
        skin: "Recommended for dry, ageing skin",
        description: "Rejuvenated with luxurious Rose hip, Evening Primrose Oils, Sandalwood & Fennel Essential Oils.",
        volume: "30 mL",
        tags: ["aging", "elixir-serum"]
    },

    {
        name: "Nourishing Dry Body Oil",
        price: "A$40.00",
        image: "images/product8.jpg",
        link: "nourishing-dry-body-oil.html",
        skin: "Recommended for all skin types",
        description: "An exotic tropical blend of Jasmine, Geranium and Patchouli essential oils.",
        volume: "125 mL",
        tags: []
    }

 
];

const productsContainer = document.getElementById("products-container"); // find html with id = products-container

// take list of products and display them on the page
function renderProducts(productList) {
    productsContainer.innerHTML = ""; // wipes container clean
    // dynamic values and adding html dynamically
    productList.forEach(product => {
        productsContainer.innerHTML += ` 
            <article class="product-card">
                <a href="${product.link}"> 
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-info">
                    <div class="product-title-row">
                        <h3>${product.name}</h3>
                        <img 
                            src="images/heart.png"
                            alt="Wishlist"
                            class="heart-icon"
                        >
                    </div>
                    <p class="product-skin">
                        ${product.skin}
                    </p>
                    <p class="product-description">
                        ${product.description}
                    </p>
                    <p class="product-volume">
                        ${product.volume}
                    </p>
                    <div class="product-bottom">
                        <p class="product-price-card">${product.price}</p>
                        <button type="button">
                            ADD TO CART
                        </button> 
                    </div>
                </div>
            </article>
        `;
    });
}

// if the product section exist, display them
if (productsContainer) {
    renderProducts(products);
}

const applyBtn = document.querySelector(".apply-btn");
const resetBtn = document.querySelector(".reset-btn");

// && means logical AND 
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
