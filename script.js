let cart = [];

let shipping = 0;

let selectedFlower = {};

/* LOGIN */

function login(){

  let user =
  document.getElementById("username").value;

  let pass =
  document.getElementById("password").value;

  if(user !== "" && pass !== ""){

    document.getElementById("loginPage")
    .classList.remove("active");

    document.getElementById("homePage")
    .classList.add("active");

  }

  else{

    alert("Please enter username and password");

  }

}

/* LOGOUT */

function logout(){

  location.reload();

}

/* HOME */

function goHome(){

  document.querySelectorAll(".page")
  .forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById("homePage")
  .classList.add("active");

}

/* OPEN CART */

function openCart(){

  document.querySelectorAll(".page")
  .forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById("cartPage")
  .classList.add("active");

  updateCart();

}

/* OPEN DETAILS PAGE */

function openDetails(name,price,image){

  selectedFlower = {
    name:name,
    price:price,
    image:image
  };

  document.querySelectorAll(".page")
  .forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById("detailsPage")
  .classList.add("active");

  document.getElementById("flowerName")
  .innerText = name;

  document.getElementById("flowerImage")
  .src = image;

}

/* FINAL ADD TO CART */

function finalAddToCart(){

  let color =
  document.getElementById("flowerColor").value;

  let type =
  document.getElementById("flowerType").value;

  let qty =
  parseInt(document.getElementById("flowerQty").value);

  let finalName =
  `${selectedFlower.name} (${color} - ${type})`;

  let existing =
  cart.find(item => item.name === finalName);

  if(existing){

    existing.qty += qty;

  }

  else{

    cart.push({
      name:finalName,
      price:selectedFlower.price,
      qty:qty
    });

  }

  updateCart();

  goHome();

}

/* UPDATE CART */

function updateCart(){

  let list =
  document.getElementById("orderList");

  let subtotal = 0;

  list.innerHTML = "";

  cart.forEach((item,index)=>{

    let itemTotal =
    item.price * item.qty;

    subtotal += itemTotal;

    let li =
    document.createElement("li");

    li.innerHTML = `

      <div>
        ${item.name}
      </div>

      <div>

        <button onclick="decreaseQty(${index})">
          -
        </button>

        ${item.qty}

        <button onclick="increaseQty(${index})">
          +
        </button>

        <button onclick="removeItem(${index})">
          ❌
        </button>

      </div>

      <div>
        ${itemTotal} EGP
      </div>

    `;

    list.appendChild(li);

  });

  let total =
  subtotal + shipping;

  document.getElementById("subtotal")
  .innerText = subtotal;

  document.getElementById("shippingFee")
  .innerText = shipping;

  document.getElementById("totalPrice")
  .innerText = total;

  document.getElementById("cartCount")
  .innerText = cart.length;

}

/* QUANTITY */

function increaseQty(index){

  cart[index].qty++;

  updateCart();

}

function decreaseQty(index){

  if(cart[index].qty > 1){

    cart[index].qty--;

  }

  else{

    cart.splice(index,1);

  }

  updateCart();

}

/* REMOVE ITEM */

function removeItem(index){

  cart.splice(index,1);

  updateCart();

}

/* SHIPPING */

function updateShipping(){

  let city =
  document.getElementById("citySelect").value;

  if(city === "cairo"){

    shipping = 30;

  }

  else if(city === "giza"){

    shipping = 40;

  }

  else if(city === "alex"){

    shipping = 60;

  }

  else if(city === "other"){

    shipping = 80;

  }

  else{

    shipping = 0;

  }

  updateCart();

}

/* PAYMENT */

function showCard(){

  let method =
  document.getElementById("paymentMethod").value;

  let cardForm =
  document.getElementById("cardForm");

  if(method === "card"){

    cardForm.classList.remove("hidden");

  }

  else{

    cardForm.classList.add("hidden");

  }

}

/* CONFIRM ORDER */

function confirmOrder(){

  document.getElementById("cartPage")
  .classList.remove("active");

  document.getElementById("successPage")
  .classList.add("active");

  startTracking();

}

/* TRACKING */

function startTracking(){

  let status =
  document.getElementById("orderStatus");

  setTimeout(()=>{

    status.innerText =
    "Status: Preparing 🌸";

  },2000);

  setTimeout(()=>{

    status.innerText =
    "Status: On The Way 🚚";

  },4000);

  setTimeout(()=>{

    status.innerText =
    "Status: Delivered 🎉";

  },7000);

}

/* DOWNLOAD INVOICE */

function downloadInvoice(){

  let text =
  "🌸 Blossom Boutique Invoice 🌸\n\n";

  cart.forEach(item=>{

    text +=
    `${item.name} x${item.qty}
    = ${item.price * item.qty} EGP\n`;

  });

  let subtotal = 0;

  cart.forEach(item=>{

    subtotal +=
    item.price * item.qty;

  });

  let total =
  subtotal + shipping;

  text +=
  `\nShipping: ${shipping} EGP`;

  text +=
  `\nTotal: ${total} EGP`;

  let blob =
  new Blob([text], {type:"text/plain"});

  let link =
  document.createElement("a");

  link.href =
  URL.createObjectURL(blob);

  link.download =
  "invoice.txt";

  link.click();

}