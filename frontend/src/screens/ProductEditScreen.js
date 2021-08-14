import { hideloading, parseRequestUrl, showloading, showMessage } from '../utils';
  import { getProduct, updateProduct, uploadProductImage} from '../api';
  
  const ProductEditScreen = {
    after_render: () => {
      const request = parseRequestUrl();
      document
        .getElementById('edit-product-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showloading();
          const data = await updateProduct({
            _id: request.id,
            name: document.getElementById('newname').value,
            price: document.getElementById('price').value,
            image: document.getElementById('image').value,
            brand: document.getElementById('brand').value,
            category: document.getElementById('category').value,
            countInStock: document.getElementById('countInStock').value,
            description: document.getElementById('description').value,
          });
          hideloading();
          if (data.error) {
            showMessage(data.error);
          } else {
            document.location.hash = '/productlist';
          }
        });
      document
        .getElementById('image-file')
        .addEventListener('change', async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
          showloading();
          const data = await uploadProductImage(formData);
          hideloading();
          if (data.error) {
            showMessage(data.error);
          } else {
            showMessage('Image uploaded successfully.');
            document.getElementById('image').value = data.image;
          }
        });
    },
    render: async () => {
      const request = parseRequestUrl();
      const product = await getProduct(request.id);
      return `

      <h1 class="text-center login-title my-5"><b style="font-size:4rem">Edit Product ${product._id.substring(0, 10)}</b></h1>
      
      <div class="container edit-cont" style="width:56rem;height:56rem">
      <div class="row my-5">
          <div class="account-wall">
              <form action="" class="form-register" id="edit-product-form">
              <div>
          <a href="/#/productlist" style="margin-left:2rem">Back to products</a>
          </div>
          <br>
              <label for="name"  style="margin: 0rem 2rem;" >Name</label>
              <input type="text" name="name" value="${
                product.name
              }" id="newname" style="margin: 0.5rem 2rem;"/>
              <label for="price"  style="margin: 0rem 2rem;" >Price</label>
              <input type="number" name="price" value="${
                product.price
              }" id="price" style="margin: 0.5rem 2rem;"/>
              <label for="image"  style="margin: 0rem 2rem;" >Image (680 x 830)</label>
              <input type="text" name="image" value="${
                product.image
              }" id="image" style="width: 34.5rem;">
              <input type="file" name="image-file" id="image-file"  style="margin-left: 17.5rem;margin-right: 4rem;">
              <label for="brand"  style="margin: 0rem 2rem;" >Brand</label>
              <input type="text" name="brand" value="${
                product.brand
              }" id="brand" style="margin: 0.5rem 2rem;"/>
              <label for="countInStock"  style="margin: 0rem 2rem;" >Count In Stock</label>
              <input type="number" name="countInStock" value="${
                product.countInStock
              }" id="countInStock" style="margin: 0.5rem 2rem;"/>
              <label for="category"  style="margin: 0rem 2rem;" >Category</label>
              <input type="text" name="category" value="${
                product.category
              }" id="category" style="margin: 0.5rem 2rem;"/>
              <label for="description"  style="margin: 0rem 2rem;" >Description</label>
              <input type="text" name="description" value="${
                product.description
              }" id="description" style="margin: 0.5rem 2rem;"/>
                  <button type="submit" class="btn primary btn-lg btn-block" id="submitid" style="margin:2rem; width:92%;" >Update</button>
              </form>
          </div>
      </div>
  </div>

      `;
    },
  };
  export default ProductEditScreen;