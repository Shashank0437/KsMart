import { HomeScreen } from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { hideloading, parseRequestUrl, showloading } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
import RefundScreen from "./screens/RefundScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import Header from "./components/Header.js";
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
    footer.innerHTML = `   <footer class="footer">
    <div class="l-footer">
    <h1>
      <img src="images/logo.png" style="height: 4.6rem;"></h1>
    <p>KsMart is known for its disruption of well-established industries through technological innovation and mass scale.As measured by revenue and market capitalization it isone of the world's most valuable companies. As of 2020, KsMart has the highest global brand valuation.</p>
    </div>
    <ul class="r-footer">
    <li>
      <h2>
    Social</h2>
    <ul class="box">
    <li><a class="linkn" href="#">Facebook</a></li>
    <li><a class="linkn" href="#">Twitter</a></li>
    <li><a class="linkn"  href="#">Pinterest</a></li>
    <li><a class="linkn"  href="#">Dribbble</a></li>
    </ul>
    </li>
    <li class="features">
      <h2>
    Information</h2>
    <ul class="box h-box">
    <li><a class="linkn"  href="#">Blog</a></li>
    <li><a  class="linkn" href="#">Pricing</a></li>
    <li><a  class="linkn" href="#">Sales</a></li>
    <li><a  class="linkn" href="#">Tickets</a></li>
    <li><a  class="linkn" href="#">Certifications</a></li>
    <li><a  class="linkn" href="#">Customer Service</a></li>
    </ul>
    </li>
    <li>
      <h2>
    Legal</h2>
    <ul class="box">
    <li><a  class="linkn" href="#">Privacy Policy</a></li>
    <li><a class="linkn"  href="#">Terms of Use</a></li>
    <li><a  class="linkn" href="#">Contract</a></li>
    </ul>
    </li>
    </ul>
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
