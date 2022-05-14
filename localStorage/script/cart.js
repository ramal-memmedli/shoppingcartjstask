let cartBody = document.querySelector(".cart-body");
let totalPrice = document.querySelector(".total-price");
let removeButtons = document.getElementsByClassName("remove-product");
let checkoutButton = document.querySelector(".checkout");

checkoutButton.addEventListener("click", () => {
  let checkoutCart = [];
  localStorage.setItem("cart", JSON.stringify(checkoutCart));
  insertProductsIntoHTML();
});

function insertProductsIntoHTML() {
  cartBody.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length === 0) {
    let innerHTML = `<h4 class="text-center mt-3">Cart is empty</h4>`;
    cartBody.innerHTML = innerHTML;
    totalPrice.innerHTML = `<strong>$0</strong>`;
  } else {
    let totalPriceOfProducts = 0;
    for (const product of cart) {
      totalPriceOfProducts += (product.productCount * product.productPrice);

      let productTableRow = document.createElement("tr");
      productTableRow.setAttribute("data-target", `${product.productId}`);

      let productDetailsBoxInHTML = document.createElement("td");
      productDetailsBoxInHTML.className = "p-4";

      let productDetailsInHTML = document.createElement("div");
      productDetailsInHTML.className = "media align-items-center";

      let productImageInHTML = document.createElement("img");
      productImageInHTML.className = "d-block ui-w-40 ui-bordered mr-4";
      productImageInHTML.setAttribute("src", `${product.productImage}`);

      let productMediaBody = document.createElement("div");
      productMediaBody.className = "media-body";

      let productNameInHTML = document.createElement("a");
      productNameInHTML.className = "d-block text-dark";
      productNameInHTML.innerHTML = product.productName;

      let productPriceInHTML = document.createElement("td");
      productPriceInHTML.className = "text-right font-weight-semibold align-middle p-4";
      productPriceInHTML.innerHTML = `$${product.productPrice}`;

      let productQuantityBox = document.createElement("td");
      productQuantityBox.className = "align-middle p-4 text-center";

      let productDecreaseBtnInHTML = document.createElement("button");
      productDecreaseBtnInHTML.className = "btn btn-primary decrease-count mx-2";
      productDecreaseBtnInHTML.innerHTML = "-";

      let productCountInHTML = document.createElement("span");
      productCountInHTML.innerHTML = product.productCount;

      let productIncreaseBtnInHTML = document.createElement("button");
      productIncreaseBtnInHTML.className = "btn btn-primary increase-count mx-2";
      productIncreaseBtnInHTML.innerHTML = "+";

      let productTotalPriceInHTML = document.createElement("td");
      productTotalPriceInHTML.className = "text-right font-weight-semibold align-middle p-4";
      productTotalPriceInHTML.innerHTML = `$${product.productCount * product.productPrice}`;

      let productRemoveBtnInHTML = document.createElement("a");
      productRemoveBtnInHTML.className = "shop-tooltip close float-none text-danger remove-product";
      productRemoveBtnInHTML.setAttribute("data-original-title", "Remove");
      productRemoveBtnInHTML.innerHTML = "x";

      let productRemoveBtnBoxInHTML = document.createElement("td");
      productRemoveBtnBoxInHTML.className = "text-center align-middle px-0";

      productRemoveBtnBoxInHTML.appendChild(productRemoveBtnInHTML);
      productTableRow.appendChild(productDetailsBoxInHTML);
      productTableRow.appendChild(productPriceInHTML);
      productTableRow.appendChild(productQuantityBox);
      productTableRow.appendChild(productTotalPriceInHTML);
      productTableRow.appendChild(productRemoveBtnBoxInHTML);
      productDetailsBoxInHTML.appendChild(productDetailsInHTML);
      productDetailsInHTML.appendChild(productImageInHTML);
      productDetailsInHTML.appendChild(productMediaBody);
      productMediaBody.appendChild(productNameInHTML);
      productQuantityBox.appendChild(productDecreaseBtnInHTML);
      productQuantityBox.appendChild(productCountInHTML);
      productQuantityBox.appendChild(productIncreaseBtnInHTML);
      productRemoveBtnBoxInHTML.appendChild(productRemoveBtnInHTML);
      cartBody.appendChild(productTableRow);
    }

    for (let removeButton of removeButtons) {
      removeButton.addEventListener("click", (event) => {
        id = Number(event.target.parentNode.parentNode.getAttribute("data-target"));
        removeProductFromCart(id);
        insertProductsIntoHTML();
      });
    }

    let decreaseCountButtons = document.querySelectorAll(".decrease-count");
    let increaseCountButtons = document.querySelectorAll(".increase-count");

    for (const decreaseCountBtn of decreaseCountButtons) {
      decreaseCountBtn.addEventListener("click", (event) => {
        let id = Number(event.target.parentNode.parentNode.getAttribute("data-target"));
        decreaseProductCount(id);
        insertProductsIntoHTML();
      });
    }

    for (const increaseCountBtn of increaseCountButtons) {
      increaseCountBtn.addEventListener("click", (event) => {
        let id = Number(event.target.parentNode.parentNode.getAttribute("data-target"));
        increaseProductCount(id);
        insertProductsIntoHTML();
      });
    }
    totalPrice.innerHTML = `<strong>$${totalPriceOfProducts}</strong>`;
  }
}

function removeProductFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let productIndex = cart.findIndex(product => product.productId === id);
  cart.splice(productIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseProductCount(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let productIndex = cart.findIndex(product => product.productId === id);
  if (cart[productIndex].productCount > 1) {
    cart[productIndex].productCount -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

function increaseProductCount(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let productIndex = cart.findIndex(product => product.productId === id);
  cart[productIndex].productCount += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("load", () => {
  insertProductsIntoHTML();
});