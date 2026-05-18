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

// hiding payment panel when not selected // 
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardDetailsPanel = document.querySelector(".card-details-panel");
const confirmBtn = document.querySelector(".confirm-btn");

paymentOptions.forEach(option => {
    option.addEventListener("change", () => {
        if (option.value === "card") {
            cardDetailsPanel.classList.add("active");
        }
        if (option.value === "applepay") {
            cardDetailsPanel.classList.remove("active");
        }
    });
});

if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
        window.location.href = "payment-success.html";
    });
}