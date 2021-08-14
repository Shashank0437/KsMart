import { parseRequestUrl, rerender } from '../utils.js';
import { getProduct } from '../api.js';
import { getCartItems, setCartItems } from '../localStorage.js';
import ProductScreen from './ProductScreen.js';

const addToCart = (item, force = false) => {   //here item is received as an object
    let cartItems = getCartItems();              //getCartItems gives javascript  Array stored object [{},{},{}]
    const existItem = cartItems.find((x) => x.product === item.product);  //x(key) is one of the objects of getCartItems[{},{},{}] 
       if (existItem) {                            //x.product is id of xth product
         if (force) {
           cartItems = cartItems.map((x) =>
             (x.product === existItem.product) ? item : x
          );
         }
        }
       else {
        cartItems = [...cartItems, item];
      }
      console.log('setting items');
      setCartItems(cartItems);
      if (force) {
        rerender(CartScreen);
      }
};
const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
    rerender(CartScreen);
};
const CartScreen = {
      after_render: async () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach((qtySelect) => {
          qtySelect.addEventListener('change', (e) => {
            const item = getCartItems().find((x) => x.product === qtySelect.id);
            addToCart({ ...item, qty: Number(e.target.value) }, true);
          });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
          deleteButton.addEventListener('click', () => {
            removeFromCart(deleteButton.id);
          });
        });
        document.getElementById("checkout-button").addEventListener("click",()=>{
           document.location.hash='/signin';
        })
      },
    render: async (id) => {
        if (id) {
            const product = await getProduct(id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty:1,
            });
        }
        const cartItems = getCartItems();
        return `
    <div class="cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h1> Shopping Cart </h1>
            <div id="alertbar"></div>
            <div>
            Price
            </div>
        </li>
        <div class="alertmessage"></div>
        ${cartItems.length === 0
                ? '<div>Cart is empty. <b style="font-size:4rem;"><a href="/#/">&nbsp;&nbsp;<img src="images/logo.png" style="height: 6rem;">&nbsp;&nbsp;Go Shopping</a></b></div>'
                : cartItems
                    .map(
                        (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="${`/#/product/${item.product}`}">${item.name}</a>
                    </div>
                    <div>
                        Qty:
                      <select class="qty-select"
                      value="${item.qty}"
                      id="${item.product}">
                      ${[...Array(item.countInStock).keys()].map((x) =>
                            item.qty === x + 1
                                ? `<option value="${x + 1}" selected  >${x + 1
                                }</option>`
                                : `<option value="${x + 1}"  >${x + 1}</option>`
                        )}
                    </select>                       
                      <button
                        type="button"
                        class="delete-button"
                        id="${item.product}"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="cart-price">₹${item.price}</div>
                </li>`
                    )
                    .join('\n')
            }
      </ul>
    </div>
    <div class="cart-action">
      <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         ₹${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button id="checkout-button" class="primary fw" >
        Proceed to Checkout
      </button>
    </div>
  </div>
  <div class="refund" style="background;"><a href="/#/refund">Easy Refunds Available</a></div>
  `;
    },
};

export default CartScreen;