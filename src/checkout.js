let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    let itemsList = basket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      return `${item}x${search.name}=$${search.price*item}, `;
      
    }).join('');

    // Calculate the total amount
    let totalAmount = basket.reduce((total, x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      return total + (search.price * item);
    }, 0);

    label.innerHTML = `
      <h2 style="margin-top: 100px;"  >Your Order</h2>
      <h3>
        name   <input name="name" type="text" placeholder="David Ng" required><br>
        
        
        
        </span>
        </a>
      
        <p>remarks*<span style="color: white;">_______________</span></p>
        <textarea name="remarks" type="text" "placeholder="optional" cols="28" rows="5"></textarea><br>
        <input name="items" type="hidden" value="${itemsList}">
        <ul>${itemsList}</ul>
        amount<input name="amount" value="$ ${totalAmount}"><br></h3>
        <br>
        <button type="submit">SUBMIT QUOTES</button></h3><br>
        <b>remarks*</b><i> to put receipt naming convention:</i> (replace text in [ ] with given data) <br>
   e.g.Outlet-20240313-FSA123456-DavidNg-YueFei-$168-PaymentMode<br>
  <a style="color:blue;">type: Outlet7-[yyyymmdd]-FSA123456-DavidNg-[YourName]-$[${totalAmount}]-PayNow</a>
        
      
    `;
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2 style="margin-top: 100px;" >Cart is Empty</h2>
      
        <button class="HomeBtn" onclick="hinder"><a href="index.html"/>Back to home</button>
      </a>
    `;
  }
};

generateCartItems();

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

  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    let generateCartItems = () => {
      if (basket.length !== 0) {
        let itemsList = basket.map((x) => {
          let { id, item } = x;
          let search = shopItemsData.find((y) => y.id === id) || {};
          return `
            <li>
              <span>${search.name}</span> - <span>${item}</span>
            </li>
          `;
        }).join('');
   
  } else return;
};
  }}
TotalAmount()
