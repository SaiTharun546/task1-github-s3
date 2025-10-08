// Age Calculator
const birthInput = document.getElementById("birthdate");
const calcBtn   = document.getElementById("calc-age-btn");
const resultDiv = document.getElementById("age-result");

birthInput.addEventListener("change", () => {
  calcBtn.disabled = !birthInput.value;
  resultDiv.textContent = "";
});

calcBtn.addEventListener("click", () => {
  const dob   = new Date(birthInput.value);
  const today = new Date();
  let years  = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days   = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  resultDiv.textContent = `You are ${years} year(s), ${months} month(s), and ${days} day(s) old.`;
});

// Mini Store
const products     = [
  { id:1,name:"Widget A", price:19.99 },
  { id:2,name:"Widget B", price:29.99 },
  { id:3,name:"Widget C", price:9.99  },
  { id:4,name:"Widget D", price:14.99 }
];
const cart         = [];
const productList  = document.getElementById("product-list");
const cartItems    = document.getElementById("cart-items");
const cartTotal    = document.getElementById("cart-total");
const checkoutBtn  = document.getElementById("checkout-btn");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="/api/placeholder/150/150" alt="${p.name}" />
      <h4>${p.name}</h4>
      <p>$${p.price.toFixed(2)}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  cart.push({ ...prod });
  renderCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item,i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} – $${item.price.toFixed(2)}</span>
      <button class="btn" style="background:#dc3545;"
        onclick="removeFromCart(${i})">Remove</button>
    `;
    cartItems.appendChild(li);
  });
  const total = cart.reduce((sum, itm) => sum + itm.price, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  checkoutBtn.disabled = cart.length === 0;
}

checkoutBtn.addEventListener("click", () => {
  alert(`Checked out ${cart.length} item(s) for $${cart
    .reduce((s,i) => s + i.price, 0)
    .toFixed(2)}!`);
  cart.length = 0;
  renderCart();
});

// Initialize
renderProducts();
renderCart();
