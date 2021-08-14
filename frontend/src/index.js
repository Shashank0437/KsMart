import { HomeScreen } from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { hideloading, parseRequestUrl, showloading } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
import RefundScreen from "./screens/RefundScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import Header from "./components/header.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";

const routes = {
  "/": HomeScreen,
  "/product/:id/edit": ProductEditScreen,
  "/product/:id": ProductScreen,
  "/order/:id": OrderScreen,
  "/cart": CartScreen,
  "/refund": RefundScreen,
  "/signin": SignInScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder": PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrderListScreen
}

const router = async () => {
  showloading();
  const request = parseRequestUrl();
  //console.log(request);
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const main = document.getElementById('main-container');
  const banner = document.getElementById('banner');
  const advert = document.getElementById('advert');
  const header = document.getElementById('header_container');
  const footer = document.getElementById('footercontrol');
  header.innerHTML = await Header.render();
  if (document.location.hash === '#/dashboard' || document.location.hash === '#/productlist' || document.location.hash === '#/profile' || document.location.hash === '#/orderlist') {
    $(".grid-container")[0].style.height = "5rem";
    footer.innerHTML = "";

  } else {
    $(".grid-container")[0].style.height = "";
    footer.innerHTML = `  <footer id="footer" class="section footer">
        <div class=" container">
          <div class="footer-container">
            <div class="footer-center">
              <h3>EXTRAS</h3>
              <a href="#">Brands</a>
              <a href="#">Gift Certificates</a>
            </div>
            <div class="footer-center">
              <h3>INFORMATION</h3>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Contact Us</a>
            </div>
            <div class="footer-center">
              <h3>MY ACCOUNT</h3>
              <a href="#">My Account</a>
              <a href="#">Returns</a>
            </div>
            <div class="footer-center">
              <h3>CONTACT US</h3>
              <div>
                <span>
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                42 Dream House, Dreammy street, 7131 Dreamville, USA
              </div>
              <div>
                <span>
                  <i class="far fa-envelope"></i>
                </span>
                company@gmail.com
              </div>
              <div>
                <span>
                  <i class="fas fa-phone"></i>
                </span>
                456-456-4512
              </div>
              <div class="payment-methods">
              </div>
            </div>
          </div>
        </div>
      </footer>`;
  }

  await Header.after_render();
  if (screen === HomeScreen) {
    main.innerHTML = await (await HomeScreen.render()).homeproduct;
    banner.innerHTML = await (await HomeScreen.render()).homebanner;
    advert.innerHTML = await (await HomeScreen.render()).homeadvert;

  } else {
    main.innerHTML = await screen.render();
    banner.innerHTML = "";
    advert.innerHTML = "";
    if (screen.after_render)
      await screen.after_render();
  }
  hideloading();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router)
