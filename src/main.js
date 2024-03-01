let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, title, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return ` <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <para>${title}</para>
        <div class="description" style="display:none">
        ${desc}</div>
        <a href="#" onclick="toggleMe(event, 'product-id-${id}')", style="color:red;">description...</a>

        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

function toggleMe(event, productId){
  event.preventDefault();
  var description = document.getElementById(productId).querySelector('.description');
  if(description.style.display === "none"){
    description.style.display = "block";
  } else {
    description.style.display = "none";
  }
}



  // invoke pdf file of japanese alphabets for reference material
function termsConditions(){
  const waranty = document.getElementById('pdf');
  
  waranty.innerHTML =`<button style="border-color: transparent; background-color: transparent;" onclick="termsConditions()"><a href="https://blog.mckeen.sg/p/warranty.html" target="_blank" style="color:black; border-color: transparent; background-color: transparent;">Warranty Policy</button>
  <br>
  <button style="border-color: transparent; background-color: transparent;" onclick="termsConditions()"><a href="https://blog.mckeen.sg/p/privacy.html" target="_blank" style="color:black; border-color: transparent; background-color: transparent;">Privacy</button>
  <br>
  <button style="border-color: transparent; background-color: transparent;" onclick="termsConditions()"><a href="https://blog.mckeen.sg/p/terms.html" target="_blank" style="color:black; border-color: transparent; background-color: transparent;">Terms</button>

  `;
  
};
termsConditions();