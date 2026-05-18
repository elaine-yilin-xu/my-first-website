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

// refreshes cart if user reload page //

if(
    window.performance.getEntriesByType("navigation")[0].type === "reload"
) {

    sessionStorage.removeItem("cartItems");
}

// cart count //
const cartBtn = document.querySelector(".product-cart-btn");
const cartCount = document.querySelector(".cart-count");

let cartItems = Number(sessionStorage.getItem("cartItems")) || 0;
if (cartCount && cartItems > 0 ) {
    cartCount.textContent = `(${cartItems})`;
    cartCount.style.display = "block";
}
if (cartBtn && cartCount) {
    cartBtn.addEventListener("click", () => {
        cartItems++;

        sessionStorage.setItem("cartItems", cartItems);

        cartCount.textContent = `(${cartItems})`;
        cartCount.style.display = "block";
    });
}

// save product into cart // 
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
function updateCartCount() {
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

if (cartBtn) {
    cartBtn.addEventListener("click", () => {

        const productId = cartBtn.dataset.id;
        const existingProduct = cart.find( item => item.id === productId
        );
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            const product = {
                id: productId,
                name: cartBtn.dataset.name,
                price: Number(cartBtn.dataset.price),
                size: cartBtn.dataset.size,
                image: cartBtn.dataset.image,
                description: cartBtn.dataset.description,
                quantity: 1
            };
            cart.push(product);
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });
}

// js to display cart items
const cartItemsContainer = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

if (cartItemsContainer) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const isCheckoutPage = document.querySelector(".checkout-page");
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    cart.forEach(product => {
        subtotal += product.price * product.quantity;
        cartItemsContainer.innerHTML += `
            <article class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2 class="cart-title">${product.name}</h2>

                    ${isCheckoutPage ? `
                        <p class="checkout-cart-volume">
                            ${product.size}
                        </p>

                        <p class="checkout-cart-quantity">
                            Quantity: ${product.quantity}
                        </P>
                    ` : ""}

                    <p class="cart-volume">${product.size}</p>
                    <p class="cart-description">${product.description || ""}</p>

                    <p class="cart-price">
                        A$${product.price * product.quantity}.00
                    </p>

                    <div class="cart-item-actions">
                        <button class="cart-minus" data-id="${product.id}">-</button>
                        <span class="cart-quantity">${product.quantity}</span>
                        <button class="cart-plus" data-id="${product.id}">+</button>
                        
                        <div class="stock-label">
                            <span class="stock-dot"></span>
                            <span class="stock-text">In stock</span>
                        </div>

                        <button class="cart-delete" data-id="${product.id}">
                            <img src="images/bin.svg" alt="Remove item">
                        </button>
                    </div>

                </div>
            </article>
        `;
    });

    // subtotal logic
    cartSubtotal.textContent = `A$${subtotal}.00`;
    cartTotal.textContent = `A$${subtotal}.00`;

    // button logic 
    document.querySelectorAll(".cart-plus").forEach(button => {
        button.addEventListener("click", () => {
            const product = cart.find(item => item.id === button.dataset.id);

            if (product) {
                product.quantity++;
                sessionStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        });
    });

    document.querySelectorAll(".cart-minus").forEach(button => {
        button.addEventListener("click", () => {
            const product = cart.find(item => item.id === button.dataset.id);

            if (product && product.quantity > 1) {
                product.quantity--;
                sessionStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        });
    });

    document.querySelectorAll(".cart-delete").forEach(button => {
        button.addEventListener("click", () => {
            cart = cart.filter(item => item.id !== button.dataset.id);

            sessionStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
}




// shipping input //
const shippingAddressInput = document.getElementById("shipping-address");
const proceedBtn = document.querySelector(".proceed-btn");

if (shippingAddressInput) {
    const savedAddress = sessionStorage.getItem("shippingAddress");

    if (savedAddress) {
        shippingAddressInput.value = savedAddress; 
    }
    shippingAddressInput.addEventListener("input", () => {
        sessionStorage.setItem("shippingAddress", shippingAddressInput.value);
    });
}

if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
        if (shippingAddressInput && shippingAddressInput.value.trim() === "") {
            alert("Please enter your shipping address.");
            return;
        }

        window.location.href = "checkout.html";
    });
}

const confirmedAddress = document.getElementById("confirmed-address");
if (confirmedAddress) {
    confirmedAddress.textContent = sessionStorage.getItem("shippingAddress") || "No address entered";
}

const confirmBtn = document.querySelector(".confirm-btn");

if(confirmBtn) {
    confirmBtn.addEventListener("click", () => {
        window.location.href = "payment-success.html";
    });
}


// checkout logic //

const shippingOptions = document.querySelectorAll('input[name="shipping"]');
function updateCheckoutTotal() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let subtotal = 0;
    cart.forEach(product => {
        subtotal += product.price * product.quantity;
    });
    const selectedShipping =
        document.querySelector('input[name="shipping"]:checked');
    
    let shippingCost = 0;

    if (selectedShipping) {
        if (selectedShipping.value === "delivery") {
            shippingCost = 10;
        }

        if (selectedShipping.value === "pickup") {
            shippingCost = 0;
        }
    }
    if (cartSubtotal) {
        cartSubtotal.textContent = `A$${subtotal}.00`;
    }
    if(cartTotal) {
        cartTotal.textContent = `A$${subtotal + shippingCost}.00`;
    }

    const shippingLabel = document.getElementById("shipping-label");
    const shippingPrice = document.getElementById("shipping-cost");

    if (shippingLabel && shippingPrice) {

        if (selectedShipping && selectedShipping.value === "delivery") {
            shippingLabel.textContent = "Standard shipping";
            shippingPrice.textContent = "A$10.00";
        } else if (
            selectedShipping &&
            selectedShipping.value === "pickup"
        ) {
            shippingLabel.textContent = "Collect in store";
            shippingPrice.textContent = "FREE";

        } else {
            shippingLabel.textContent = "Shipping";
            shippingPrice.textContent = "Select option";
        }       
    }
}
shippingOptions.forEach(option => {
    option.addEventListener("change", () => {
        updateCheckoutTotal();
    });
});
updateCheckoutTotal();
  