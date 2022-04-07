const products = [
    {
      id: 0,
      name: "Creatine",
      imgSrc: "./assets/images/creatine.png",
      price: 189,
      description:
        "Double your gains with our creatine. This supplement will help you have more muscle gains.",
    },
    {
      id: 1,
      name: "L Carnitine",
      imgSrc: "./assets/images/carnitine.png",
      price: 249,
      description:
        "L Carnitine helps your body burn stored fat and turn it into energy.",
    },
    {
      id: 2,
      name: "Amino",
      imgSrc: "./assets/images/amino.png",
      price: 199,
      description:
        "Amino acids are basic componets in the body that are also a source of energy.",
    },
    {
      id: 3,
      name: "L Glutamine",
      imgSrc: "./assets/images/glutamine.png",
      price: 225,
      description:
        "L Glutamine is the most important amino acid for muscles. They will your muscle recover faster.",
    },
    {
      id: 4,
      name: "L Arginine",
      imgSrc: "./assets/images/arginine.png",
      price: 299,
      description:
        "L Arginine is an important amino acid that helps with chemical balance.",
      
    },
    {
      id: 5,
      name: "BCAA",
      imgSrc: "./assets/images/bcaa.png",
      price: 339,
      description:
        "BCCA contains 3 essencial amino acids to help retain muscle mass and burn fat.",
      
    },
  ];

  //select elements
  const productItems = document.querySelector("#products__list");
  const cartItems = document.querySelector("#products__cart");

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


  //cart array for cart section
  let cart = [];

  //add to cart function
  function addToCart (id){
      if(cart.some((item) => item.id === id)){
        alert('product already in cart')
      }else{
        const item = products.find((product)=> product.id === id);
        cart.push({
            ...item,
            numberofUnits:1
        });
      }
      
     updateCart(); 
  }
  // update cart function 
  function updateCart(){
      renderCartItems();
      //updateTotal();
  }
  function renderCartItems(){
    cartItems.innerHTML = "";//clears items
      cart.forEach((item)=>{
          cartItems.innerHTML += `
            <div class="products__row">
                <div class="products__row__quantity">
                    <div class="minusButton">-</div>
                    <div class="qNumber">${item.numberofUnits}</div>
                    <div class="plusButton">+</div>
                </div>
                <div class="products__row__item">
                    <img id="itemImage" src="${item.imgSrc}" alt="${item.name}">
                </div>
                <div class="products__row__price">$${item.price}</div>
            </div>
          `
      })
  }