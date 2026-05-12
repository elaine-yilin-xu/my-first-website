alert("script is connected");
const products = [
    {
        name: "Age Defying Elixir",
        skin:"Recommended for all aging skin",
        size: "30mL",
        price: "A$75.00",
        image: "images/product7.jpg",
        description: "A powerful blend to rejuvenate and balance stressed skin caused by damaging environments and lifestyle factors.",
        how: "Apply at night, massage into freshly cleaned skin.",
        dosage: "2-3 drops.",
        texture: "Light weight.",
        ingredients: [
            "Rose hip oil",
            "Primrose oil",
            "Rose",
            "Sandalwood",
            "Fennel"
        ]
    }
];

const params = new URLSearchParams(window.location.search);
const productId = params.get("id")
const product = products[productId];

if (product) return {
    document.getElementById("product-name").textContent = 
        product.name;
    
    document.getElementById("product-skin").textContent = 
        product.skin;

    document.getElementById("product-size").textContent = 
        product.size;
    
    document.getElementById("product-price").textContent = 
        product.price;

    document.getElementById("product-how").textContent = 
        product.how;
    
    document.getElementById("product-dosage").textContent = 
        product.dosage;
    
     document.getElementById("product-texture").textContent = 
        product.texture;
    
    document.getElementById("product-image").src = 
        product.image;

}