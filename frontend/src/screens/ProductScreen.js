import { hideloading, parseRequestUrl, showloading } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/Rating.js';
import CartScreen from './CartScreen.js';

const ProductScreen = {
   after_render: () => {
    const request = parseRequestUrl();
    let status=document.getElementById('addtoCartStatus');
    if(status.innerText=="In Stock"){
    document.getElementById('add-button').addEventListener('click', () => {
      CartScreen.render(request.id);
      deletealert("Product added to cart");
    });
    }
   },
  render: async () => {
    const request = parseRequestUrl();
    showloading();
    const product =await getProduct(request.id);
    if(product.error){
      return `<div>${product.error}</div`;
    }
    hideloading();
    return `
    <div>
      <div class="back-to-result">
        <a href="/#">Back to result</a>
      </div>
      <div class="details">
           <div class="details-image">
              <img class="zoom" src="${product.image}" alt="product" />
           </div>
           <div class="details-info">
              <ul>
                <li>
                  <h1 style="font-size:3rem"><b>${product.name}</b></h1>
                </li>
                <li class="product-rating">
                ${Rating.render({
                  value: product.rating,
                  text: `${product.numREviews} reviews`,
                })}
                </li>
                <li>
                  <h1>Price: <b>₹${product.price}</b></h1>
                </li>
                <br>
                <br>
                <li>
                  <b>Description:</b>
                  <div>
                    ${product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div class="details-action">
            <div id="alertbar"></div>
              <ul>
                <li>
                  Price: ₹${product.price}
                </li>
                <li>
                  Status:  
                   ${product.countInStock > 0 ? `<span class="success" id="addtoCartStatus">In Stock</span>` : `<span class="error">Unavailable</span>`}
                </li>              
                <li>
                <button
                id="add-button"
                class="primary"
                >
                Add to Cart
                </button>
                </li>
              </ul>
            </div>
            
          </div>
        `;
  },
};


function deletealert(displayMessage, index) {
  let del_message = document.getElementById('alertbar');
  del_message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" style="z-index:20;position: relative;width:100%">
                  <strong>Messge:</strong> ${displayMessage}
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="align-content: center;">
                  <span aria-hidden="true">×</span>
                  </button>
              </div>`;
  setTimeout(function () {
      del_message.innerHTML = ``;
  }, 4000);
}

export default ProductScreen;