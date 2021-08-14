import { getUserInfo,getShipping, setShipping } from '../localStorage';
import CheckoutSteps from './CheckOutSteps';

const ShippingScreen = {
    after_render: () => {

        document
            .getElementById('shipping-form')
            .addEventListener('submit', async (e) => {
               e.preventDefault();
               setShipping({
                   address:document.getElementById('address').value,
                   city:document.getElementById('city').value,
                   postalCode:document.getElementById('postalCode').value,
                   country:document.getElementById('country').value,
               })
               document.location.hash='/payment'; 
            });
    },
    render: async () => {
        const { name} = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }

        const { address, city, postalCode, country } = getShipping();
        // const orders = await getMyOrders();
        return `
    
    <h1 class="text-center login-title" style=" margin-bottom:2rem;"><b style="font-size:3rem;"><img src="images/logo.png" style="height:4rem; width:4rem;"> Shipping </b></h1>

    <div>
    ${CheckoutSteps.render({ step1: true, step2: true })}
    </div>

    <div class="container login-cont shipping-form" style="width:41rem;height:42rem">
      <div class="row my-5">
        <div class="account-wall">
            <form action="" class="form-signin" id="shipping-form">
            <label for="address"  style="margin: 0rem 4rem;" >Address</label>
             <textarea type="text" rows="2" class="form-control" id="address" required name="address" value="${address}"style="margin: 1rem 4rem;"></textarea>
             <label for="city"   style="margin: 0rem 4rem;" >City</label>
             <input type="text" class="form-control" id="city" required name="city" value="${city}" style="margin: 1rem 4rem;">
             <label for="postalCode"   style="margin: 0rem 4rem;"  >Pin Code</label>
             <input type="text" class="form-control" id="postalCode" required name="name" value="${postalCode} "style="margin: 1rem 4rem;">
             <label for="country"   style="margin: 0rem 4rem;"   >Country</label>
             <input type="text" class="form-control" id="country" required name="name" value="${country} "style="margin: 1rem 4rem;">
                <button type="submit" class="primary shipcon" id="submitids" style="margin:1.5rem 4rem; width:35rem">Continue</button>
            </form>
        </div>
    </div>
</div>    
    `;
    },
};
export default ShippingScreen;