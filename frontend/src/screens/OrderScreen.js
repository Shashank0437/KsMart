import { deliverorder, getOrder, getPayPalClientId, payorder } from '../api';
import { getUserInfo } from '../localStorage';
import { hideloading, parseRequestUrl, rerender, showloading, showMessage } from '../utils';

let order = null;

const addPaypalSdk = async (totalPrice) => {
  const clientId = await getPayPalClientId();
  if (!window.paypal) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.onload = () => handlePayment(totalPrice);
    script.async = true;
    document.body.appendChild(script);
    console.log(totalPrice);
  } else {
    console.log(totalPrice);
    handlePayment(totalPrice);
  }
};


const handlePayment = (totalPrice) => {
  paypal.Buttons({
    commit: true,
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: 0.1,
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(async()=> {
            showloading();
            await payorder(parseRequestUrl().id, {
              orderID: data.orderID,
              payerID: data.payerID,
              paymentID: data.paymentID,
            });
            hideloading();
            showMessage('Payment Was Successfully.', () => {
              rerender(OrderScreen);
            });
        });
    }
}).render('#paypal-button');
}



const OrderScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    if(document.getElementById('deliver-order-button')!==null){
    document.getElementById('deliver-order-button')
    .addEventListener('click',async()=>{
      showloading();
    await deliverorder(request.id);
    hideloading();
    showMessage('Order🎁🎁 Delivered👍👍✌');
    rerender(OrderScreen);
    })
  }
  },
  render: async () => {
    const {isAdmin}=getUserInfo();
    const request = parseRequestUrl();
    const { _id, shipping, payment, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, isDelivered, deliveredAt, isPaid, paidAt } = await getOrder(request.id);
    if (!isPaid) {
      console.log(isPaid);
      addPaypalSdk(totalPrice);
    }
    return `
      <div>
      <div>
   <h1><b style="margin:2rem; color:maroon;">Order Id: ${_id}</b></h1>
      </div>
        <div class="order">
          <div class="order-info">
            <div>
              <h2>Shipping</h2>
              <div>
              ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
              ${shipping.country}
              </div>
              ${isDelivered ? `<div class="success">Delivered at ${deliveredAt}</div>` :
        `<div class="error">Item Not Delivered</div>`}
            </div>
            <div>
              <h2>Payment</h2>
              <div>
                Payment Method : ${payment.paymentMethod}
              </div>
              ${isPaid ? `<div class="success">Paid at ${paidAt}</div>` :
        `<div class="error">Not Paid</div>`}
            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h2>Shopping Cart</h2>
                  <div>Price</div>
                </li>
                ${orderItems
        .map(
          (item) => `
                  <li>
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Qty: ${item.qty} </div>
                    </div>
                    <div class="cart-price"> ₹${item.price}</div>
                  </li>
                  `
        )
        .join('\n')}
              </ul>
            </div>
          </div>
          <div class="order-action">
             <ul>
                  <li>
                    <h2>Order Summary</h2>
                   </li>
                   <li><div>Items</div><div>₹${itemsPrice}</div></li>
                   <li><div>Shipping</div><div>₹${shippingPrice}</div></li>
                   <li><div>GST</div><div>₹${taxPrice}</div></li>
                   <li class="total"><div>Order Total</div><div>₹${totalPrice}</div></li>
                   <li><div id="paypal-button" style="width:100%"></div></li>
                   <li>
                   ${
                     isPaid && !isDelivered && isAdmin?
                     ` <button id="deliver-order-button" class="primary deliver" >Deliver Order <i class="fa fa-shipping-fast"></i></button>`:``
                   }
                   </li>
                   <li>
          </div>
        </div>
      </div>
      `;
  },
};
export default OrderScreen;