let cards = document.querySelectorAll(".product");
let addToCartButtons = document.querySelectorAll(".add-to-cart");

for (const button of addToCartButtons) {
    button.addEventListener("click", (event) => {
        let product = createProduct(event);
        addToCart(product);
    });
}

function createProduct(event) {
    let productId = Number(event.target.parentNode.parentNode.getAttribute("data-id"));
    let productImage = event.target.parentNode.parentNode.children[0].getAttribute("src");
    let productName = event.target.parentNode.children[0].innerText;
    let productPrice = event.target.parentNode.children[1].children[0].innerText;
    let productCount = 1;
    let product = {
        productId,
        productImage,
        productName,
        productPrice,
        productCount
    }
    return product;
}

function isProductExsiting(id) {
    for (let product of cartDefault()) {
        if(product.productId === id) {
            return true;
        }
    }
    return false;
}

function cartDefault() {
    let products = JSON.parse(localStorage.getItem("cart"));
    if(products === null) {
        products = [];
    }
    return products;
}

function addToCart(product) {
    let cart = cartDefault();
    let cartTemp = cart;
    if(isProductExsiting(product.productId)){
        cart = [];
        for (let productInCart of cartTemp) {
            if(productInCart.productId === product.productId) {
                productInCart.productCount += 1;
            }
            cart.push(productInCart);
        }
    }
    else {
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}