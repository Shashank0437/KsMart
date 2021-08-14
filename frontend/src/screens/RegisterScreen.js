import { register } from '../api';
import { getCartItems, getUserInfo, setUserInfo } from '../localStorage';
import { showMessage, showloading, hideloading } from '../utils';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        if(document.getElementById('passwordr').value  === document.getElementById('repassword').value){
          showloading();
          const data = await register({
            name: document.getElementById('name').value,
            email: document.getElementById('emailr').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('passwordr').value,
            repassword: document.getElementById('repassword').value,
          });
          hideloading();
          if (data.error) {
            showMessage(data.error);
          } else {
            setUserInfo(data);
            if (getCartItems().length != 0) {
              document.location.hash = '/shipping';
            } else {
              document.location.hash = '/';
            }
          }
        }else{
          showMessage("Password not matching!!Re-enter")
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      if (getCartItems().length != 0) {
        document.location.hash = '/shipping';
      } else {
        document.location.hash = '/';
      }
    }
    return `
      <h1 class="text-center login-title my-5"><b style="font-size:4rem"><img src="images/logo.png" style="height:6rem; width:6rem;">Create New Account</b></h1>
      <div class="container login-cont" style="width:40rem;height:56rem">
      <div class="row my-5">
          <div class="account-wall">
              <img src="images/Reg-online.png" alt="" style="width: 14rem;">
              <form action="" class="form-register" id="register-form">
              <input type="name" class="form-control" id="name" placeholder="Enter full name" required name="name"
                      style="margin: 1.5rem 1rem;">
                  <input type="email" class="form-control" id="emailr" placeholder="Enter Email Id" required name="email"
                      style="margin: 1.5rem 1rem;">
                      <input class="form-control" type="text" placeholder="Enter Your Phone" id="phone" value=""
                      name="phone" minlength="10" maxlength="10" style="margin: 1.5rem 1rem;">
                  <input type="password" class="form-control" id="passwordr" placeholder="Enter Password" required name="password"
                      style="margin: 1.5rem 1rem;">
                      <input type="password" class="form-control" id="repassword" placeholder="Confirm Password" required name="repassword"
                      style="margin: 1.5rem 1rem;">
                  <button type="submit" class="btn primary btn-lg btn-block" id="submitid" style="margin: 1.5rem 1rem;">Sign
                      in</button>
                  <a href="#/recover" class="pull-right need-help">Need help</a><span class="clearfix"></span>
              </form><span style="color:white">Already an user ?<span><a href="/#/signin" class="text-center new-account" style="margin: 1rem;">&nbsp;SignIn&nbsp;</a>
          </div>
      </div>
  </div>
      `;
  },
};
export default RegisterScreen;