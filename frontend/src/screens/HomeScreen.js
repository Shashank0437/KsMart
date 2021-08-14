import { getProducts } from '../api.js';
import Rating from '../components/Rating.js';

export const HomeScreen = {
  render: async () => {
    const products=await getProducts();
    if (products.error) {
        return `<div class="error">${products.error}</div>`;
    }
    return {
      homeproduct: `<ul class="products">
      ${products.map((product) =>
        `<li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/${product._id}">
            ${product.name}
          </a>
        </div>
        <div class="product-rating">
        ${Rating.render({value:product.rating,text:product.numREviews+' reviews'})}
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          ₹${product.price}
        </div>
        </div>
      </li> `
      ).join('\n')}
    `,
      homebanner: ` <div id="carouselExampleIndicators" class="carousel slide col-11 mx-auto" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="images/6.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/2.jpg" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/7.jpg" alt="7th slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/3.png" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/4.jpg" alt="fourth slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/5.jpg" alt="fifth slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <section class="section promotion">
    <div class="title">
        <h2>Shop Collections</h2>
        <span>Select from the premium product and save plenty money</span>
    </div>
    <div class="promotion-layout container">
        <div class="promotion-item">
            <img src="./images/promo1.jpg" alt="" />
            <div class="promotion-content">
                <h3>FOR MEN</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>

        <div class="promotion-item">
            <img src="./images/promo2.jpg" alt="" />
            <div class="promotion-content">
                <h3>CASUAL SHOES</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>

        <div class="promotion-item">
            <img src="./images/promo3.jpg" alt="" />
            <div class="promotion-content">
                <h3>FOR WOMEN</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>

        <div class="promotion-item">
            <img src="./images/promo4.jpg" alt="" />
            <div class="promotion-content">
                <h3>LEATHER BELTS</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>

        <div class="promotion-item">
            <img src="./images/promo5.jpg" alt="" />
            <div class="promotion-content">
                <h3>DESIGNER BAGS</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>
        <div class="promotion-item">
            <img src="./images/promo6.jpg" alt="" />
            <div class="promotion-content">
                <h3>WATCHES</h3>
                <a href="">SHOP NOW</a>
            </div>
        </div>
    </div>
</section>`,
    homeadvert:`<div class="advert-layout container">
    <div class="item ">
      <img src="./images/promo7.jpg" alt="">
      <div class="content left">
        <span>Exclusive Sales</span>
        <h3>Spring Collections</h3>
        <a href="">View Collection</a>
      </div>
    </div>
    <div class="item">
      <img src="./images/promo8.jpg" alt="">
      <div class="content  right">
        <span>New Trending</span>
        <h3>Designer Bags</h3>
        <a href="">Shop Now </a>
      </div>
    </div>
    <br>
  </div>`
    };
    
    
  },
};
