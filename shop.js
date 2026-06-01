const products = [

    {
        name: "Revital Eyes Firming Gel",
        price: 90,
        image: "images/product1.jpg",
        link: "revital-eyes-firming-gel.html",
        skin: "Recommended for all skin type",
        description: "A unique formulation of Eyebright Extract and Active Caffeine Complex awakens the skin.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Age Defying Hand Cream",
        price: 45,
        image: "images/product2.jpg",
        link: "age-defying-hand-cream.html",
        skin: "Suitable for all skin type",
        description: "Silky-soft and quick absorbing, this cream has harnessed the power of Oleuropein.",
        volume: "120 mL",
        tags: []
    },

    {
        name: "Desensitising Elixir",
        price: 60,
        image: "images/product3.jpg",
        link: "desensitising-elixir.html",
        skin: "Recommended for all skin type",
        description: "A soothing blend with Lavender and Chamomile Essential Oil to calm skin.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Eye Contour Elixir",
        price: 60,
        image: "images/product4.jpg",
        link: "eye-contour-elixir.html",
        skin: "Recommended for all skin type",
        description: "A superior blend rich in Omega 3 and 6, restores moisture and smoothness around eye.",
        volume: "30 mL",
        tags: []
    },

    {
        name: "Hydrating Mud Mask",
        price: 75,
        image: "images/product5.jpg",
        link: "hydrating-mud-mask.html",
        skin: "Recommended for all skin types",
        description: "An active clay designed to cleanse and hydrate dry and normal skin types.",
        volume: "90 mL",
        tags: []
    },

    {
        name: "Hydrating Conditioner",
        price: 35,
        image: "images/product6.jpg",
        link: "hydrating-conditioner.html",
        skin: "Recommended for dry, dehydrated skin",
        description: "A nourishing conditioner with Neem Seed Oil and Wheat Protein to assist in hydrating hair.",
        volume: "250 mL",
        tags: []
    },

    {
        name: "Age Defying Elixir",
        price: 75,
        image: "images/product7.jpg",
        link: "age-defying-elixir.html",
        skin: "Recommended for dry, ageing skin",
        description: "Rejuvenated with luxurious Rose hip, Evening Primrose Oils, Sandalwood & Fennel Essential Oils.",
        volume: "30 mL",
        tags: ["aging", "elixir-serum"]
    },

    {
        name: "Nourishing Dry Body Oil",
        price: 40,
        image: "images/product8.jpg",
        link: "nourishing-dry-body-oil.html",
        skin: "Recommended for all skin types",
        description: "An exotic tropical blend of Jasmine, Geranium and Patchouli essential oils.",
        volume: "125 mL",
        tags: []
    }

 
];

const productsContainer = document.getElementById("products-container"); // find html with id = products-container
const cartCount = document.querySelector(".cart-count");

function updateCartCount() {
    const cart =
        JSON.parse(sessionStorage.getItem("cart")) || [];
    const totalItems = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    if (cartCount && totalItems > 0) {
        cartCount.textContent = `(${totalItems})`;
        cartCount.style.display = "block";
    }

}

updateCartCount();
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
                            src="images/heart.svg"
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
                        <p class="product-price-card">
                        A$${product.price}.00</p>
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

// product cart transition animation
function focusProductCards() {
    const productCards =
        document.querySelectorAll(".product-card");
    const windowCenter = window.innerHeight / 2;

    productCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter =
            rect.top + rect.height / 2;
        const distance =
            Math.abs(windowCenter - cardCenter);
        if (distance < 220) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", focusProductCards);
focusProductCards();
///
const applyBtns = document.querySelectorAll(".apply-btn");
const resetBtns = document.querySelectorAll(".reset-btn");

applyBtns.forEach(button => {
    button.addEventListener("click", () => {

        const checkedFilters = Array.from(
            document.querySelectorAll(".filter-checkbox:checked")
        ).map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product => {
            return checkedFilters.every(filter =>
                product.tags.includes(filter)
            );
        });

        renderProducts(filteredProducts);

        focusProductCards();

        // close mobile filter page after apply
        if (mobileFilterPage && productsSection && mobileFilterBtn) {
            mobileFilterPage.classList.remove("active");
            productsSection.style.display = "";
            mobileFilterBtn.style.display = "";
        }

    });
});

resetBtns.forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-checkbox").forEach(checkbox => {
            checkbox.checked = false;
        });

        renderProducts(products);

        focusProductCards();

    });
});


// search drop down
const searchIcon = document.querySelector(".search-icon");
const searchDropdown = document.querySelector(".search-dropdown");

if(searchIcon&&searchDropdown) {
    searchIcon.addEventListener("click", () => {
        searchDropdown.classList.toggle("active");
    });
}

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("keydown", event => {
        if(event.key === "Enter") {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === "age defying elixir") {
                window.location.href = "age-defying-elixir.html";
            }
        }
    });
}

const mobileFilterBtn = document.querySelector(".mobile-filter-btn");
const mobileFilterPage = document.querySelector(".mobile-filter-page");
const closeFilterBtn = document.querySelector(".close-filter-btn");
const productsSection = document.querySelector(".products");

if (mobileFilterBtn && mobileFilterPage) {
    mobileFilterBtn.addEventListener("click", () => {
        mobileFilterPage.classList.add("active");
        productsSection.style.display = "none";
        mobileFilterBtn.style.display = "none";
    });
}

if (closeFilterBtn && mobileFilterPage) {
    closeFilterBtn.addEventListener("click", () => {
        mobileFilterPage.classList.remove("active");
        productsSection.style.display = "grid";
        mobileFilterBtn.style.display = "block";
    });
}