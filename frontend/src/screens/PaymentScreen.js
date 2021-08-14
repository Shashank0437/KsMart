import { getUserInfo, setPayment } from '../localStorage';
import CheckoutSteps from './CheckOutSteps';

const PaymentScreen = {
    after_render: () => {
        document
            .getElementById('payment-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                const paymentMethod=document.querySelector('input[name="payment-method"]:checked').value
                setPayment({paymentMethod})
                document.location.hash = '/placeorder';
            });
    },
    render: async () => {
        const { name } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }

        return `
    
    <h1 class="text-center login-title" style=" margin-bottom:2rem;"><b style="font-size:3rem;"><img src="images/logo.png" style="height:4rem; width:4rem;"> Payment </b></h1>

    <div>
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
    </div>

    <div class="container payment login-cont" style="width:40rem;height:34rem">
      <div class="row my-5">
        <div class="account-wall">
            <form action="" class="form-signin" id="payment-form">
               <h1 id="payheader"> <b>Select Payment Method </b></h1>
                <div>
                <input type="radio" name="payment-method" id="paypal" value="Paypal" checked >
                <label for="paypal" ><img src="images/paypal.png" style="height:3rem; width:16rem;"></label>
                </div>
                <div>
                <input type="radio" name="payment-method" id="stripe" value="Stripe"  >
                <label for="stripe" ><img src="images/stripe.png" style="height:4rem; width:12rem;"></label>
                </div>
                <div>
                <input type="radio" name="payment-method" id="paytm" value="Paytm"  >
                <label for="paytm" ><img src="images/paytm.png" style="height:3rem; width:12rem;"></label>
                </div>
                <button type="submit" class="btn btn-primary" id="paynow" >Continue</button>
            </form>
        </div>
    </div>
</div>    
    `;
    },
};
export default PaymentScreen;