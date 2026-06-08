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

        showAddToCartAnimation();
        showAddedButtonState();
    });
}

// js to display cart items
const cartItemsContainer = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

if (cartItemsContainer) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const isSummaryPage = 
        document.querySelector(".checkout-page") ||
        document.querySelector(".payment-success-page");
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    cart.forEach(product => {
        subtotal += product.price * product.quantity;
        cartItemsContainer.innerHTML += `
            <article class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2 class="cart-title">${product.name}</h2>

                    ${isSummaryPage ? `
                        <p class="checkout-cart-volume">
                            ${product.size}
                        </p>

                        <p class="checkout-cart-quantity">
                            Quantity: ${product.quantity}
                        </p>
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
    if (cartSubtotal) {
        cartSubtotal.textContent = `A$${subtotal}.00`;
    }
    const isPaymentSuccessPage = document.querySelector(".payment-success-page");

    if (cartTotal) {
        if (isPaymentSuccessPage) {
            cartTotal.textContent = `A$${subtotal + 10}.00`;
        } else {
            cartTotal.textContent = `A$${subtotal}.00`;
        }
    }

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

// cart animation //
function showAddedButtonState() {
    if (!cartBtn) return;

    cartBtn.textContent = "PRODUCT ADDED ✓";
    cartBtn.classList.add("added");

    setTimeout(() => {
        cartBtn.textContent = "ADD TO CART";
        cartBtn.classList.remove("added");
    }, 1600);
}

function showAddToCartAnimation() {
    const cartIcon = document.querySelector(".cart-icon");

    if (!cartBtn || !cartIcon) return;

    const flyingDot = document.createElement("span");
    flyingDot.classList.add("flying-cart-dot");

    document.body.appendChild(flyingDot);

    const buttonRect = cartBtn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyingDot.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    flyingDot.style.top = `${buttonRect.top + buttonRect.height / 2}px`;

    requestAnimationFrame(() => {
        flyingDot.style.left = `${cartRect.left + cartRect.width / 2}px`;
        flyingDot.style.top = `${cartRect.top + cartRect.height / 2}px`;
        flyingDot.classList.add("active");
    });

    setTimeout(() => {
        flyingDot.remove();
    }, 1400);
}

// clear cart after confirmaton button
const continueShoppingBtn = document.querySelector(".continue-shopping-btn");

if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("cartItems");
        window.location.href = "shop-all.html";
    });
}