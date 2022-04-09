

// array of objects that include all of the information for each product item
const products = [
    {
      id: 0,
      instock:4,
      name: "Creatine",
      imgSrc: "./assets/images/creatine.png",
      price: 189,
      description:
        "Double your gains with our creatine. This supplement will help you have more muscle gains.",
    },
    {
      id: 1,
      instock: 7,
      name: "L Carnitine",
      imgSrc: "./assets/images/carnitine.png",
      price: 249,
      description:
        "L Carnitine helps your body burn stored fat and turn it into energy.",
    },
    {
      id: 2,
      instock: 8,
      name: "Amino",
      imgSrc: "./assets/images/amino.png",
      price: 199,
      description:
        "Amino acids are basic componets in the body that are also a source of energy.",
    },
    {
      id: 3,
      instock: 7,
      name: "L Glutamine",
      imgSrc: "./assets/images/glutamine.png",
      price: 225,
      description:
        "L Glutamine is the most important amino acid for muscles. They will your muscle recover faster.",
    },
    {
      id: 4,
      instock: 9,
      name: "L Arginine",
      imgSrc: "./assets/images/arginine.png",
      price: 299,
      description:
        "L Arginine is an important amino acid that helps with chemical balance.",
      
    },
    {
      id: 5,
      instock:6,
      name: "BCAA",
      imgSrc: "./assets/images/bcaa.png",
      price: 339,
      description:
        "BCCA contains 3 essencial amino acids to help retain muscle mass and burn fat.",
      
    },
  ];

//===========================================================================================
  //selected  elements from HTML
  const productItems = document.querySelector("#products__list");
  const cartItems = document.querySelector("#products__cart");
  const totalInCart = document.querySelector(".totalPrice");
  
//===========================================================================================
  //function to render products
  function renderItems(){
      products.forEach((product) =>{
          productItems.innerHTML += `
          <div class="item">
          <div class="productName">${product.name}</div>
          <div class="productPic"><img src="${product.imgSrc}" alt="creatine"></div>
          <div class="productPrice">$${product.price}</div>
          <div class="productDescription">${product.description}</div>
          <div class="productCart" onclick="addToCart(${product.id})"><img id="cart" src="./assets/images/cart.png"></div>
      </div>
          `
      })
  }
  renderItems();
//===========================================================================================
  //cart array for cart section
  let cart = JSON.parse(localStorage.getItem("CART")) || [];
  updateCart();

//===========================================================================================
  //add to cart function
  function addToCart (id){
      if(cart.some((item) => item.id === id)){
        changeUnits('plus',id);
      }else{
        const item = products.find((product)=> product.id === id);
        cart.push({
            ...item,
            numberOfUnits:1,
        });
      }
      
     updateCart(); 
  }
//===========================================================================================
  // update cart function 
  function updateCart(){
      renderCartItems();
      renderTotal();
      localStorage.setItem("CART",JSON.stringify(cart));
  }

//===========================================================================================
// function to render total price and items
  function renderTotal(){
      let totalPrice = 0;
      let totalItems = 0;

      cart.forEach((item) =>{
          totalPrice += item.price * item.numberOfUnits;
          totalItems += item.numberOfUnits;
      })
      totalInCart.innerHTML =`
      <div class="products__total"> Total : $${totalPrice.toLocaleString()} <img onclick="eraseAll()" class="deleteAll" src="./assets/images/deleteAll.png"> </div>
      <h6>${totalItems}</h6>
      `
  }

//===========================================================================================
// function to render items to cart
  function renderCartItems(){
    cartItems.innerHTML = "";//clears items
      cart.forEach((item)=>{
          cartItems.innerHTML += `
            <div class="products__row">
                <div class="products__delete" onclick="removeItem(${item.id})">
                <img id="products__delete" src="./assets/images/delete.png" alt="">
                </div>
                <div class="products__row__quantity">
                    <div class="minusButton" onclick="changeUnits('minus',${item.id})">-</div>
                    <div class="qNumber">${item.numberOfUnits}</div>
                    <div class="plusButton" onclick="changeUnits('plus',${item.id})">+</div>
                </div>
                <div class="products__row__item">
                    <img id="itemImage" src="${item.imgSrc}" alt="${item.name}">
                </div>
                <div class="products__row__price">$${item.price}</div>
            </div>
          `
      })
  }

//===========================================================================================
//function to remove items from cart
    function removeItem(id) {
       cart = cart.filter((item) => item.id !==id);       

        updateCart();
      }

//===========================================================================================
// function that will change units with + and - sign
  function changeUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
    
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.instock) {
          numberOfUnits++;
        }
      }
  
      return {
        ...item,
        numberOfUnits,
      };
    });
  
    updateCart();
  }

//===========================================================================================
  //function that clears all local storage
  function eraseAll(){    
    localStorage.clear();
    cart = [];
    updateCart();
  }
  
