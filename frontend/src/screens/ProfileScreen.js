import { getMyOrders, update } from '../api';
import { clearUser, getUserInfo, setUserInfo } from '../localStorage';
import { hideloading, showloading, showMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });

    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showloading();
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('emailr').value,
          phone: document.getElementById('phone').value,
          password: document.getElementById('passwordr').value,
        });
        console.log("data is here" + data);

        hideloading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
  render: async () => {
    const { name, email, phone } = getUserInfo();
    console.log(phone);

    if (!name) {
      document.location.hash = '/';
    }
    const orders = await getMyOrders();
    console.log(orders);
    
    return `
    <h1 class="text-center login-title my-5"><b style="font-size:4rem ; color:tomato" >${name} Profile</b></h1>
    <div class="profile">
    <div class="profile-info">
    <div class=" login-cont" style="width:40rem;height:50rem; margin-left:0.5rem">
    <div class="row my-5">
        <div class="account-wall">
            <img src="https://th.bing.com/th/id/R.62f8e8853e6bef0c817a88b3f5e83acd?rik=QWKDSA1veTmFXg&riu=http%3a%2f%2fwww.onlineupsidc.com%2fofficeUsers%2fimages%2flogin.png&ehk=xkRasqW1nxMTI3LRDxS0waoZ8uwGlEe2GVXnMkODWlc%3d&risl=&pid=ImgRaw&r=0" alt="" style="width: 14rem;">
            <form action="" class="form-signin" id="profile-form">
            <input type="name" class="form-control" id="name" required name="name" value=${name}
                      style="margin: 1.5rem 4rem;">
                <input type="email" class="form-control" id="emailr" placeholder="Email" required value="${email}" name="email"
                    style="margin:1.5rem 4rem;">
                    <input class="form-control" type="text"  id="phone" value="${phone}"
                      name="phone" minlength="10" maxlength="10" style="margin: 1.5rem 4rem;">
                <input type="password" class="form-control" id="passwordr" placeholder="Password" name="password"
                    style="margin:1.5rem 4rem;">
                <button type="submit" class="primary" id="submitid" style="margin:1rem 4rem;">Update</button>
                <button type="button" class="primary" id="signout-button" style="margin:1rem 4rem;">SignOut</button>
            </form>
        </div>
    </div>
</div>    
    </div>
    <div class="profile-orders">
    <table>
    <thead>
    <tr>
       <th>ORDER ID</th>
       <th>ODATE</th>
       <th>TOTAL</th>
       <th>PAID</th>
       <th>DELIVERED</th>
       <th>ACTIONS</th>
     </tr>
     </thead>
     <tbody>
     ${orders.length===0 ? `<tr><td colspan="6">No Order found.</tr>`:
                           orders.map((order)=>
                             `
                             <tr class=${order.paidAt === undefined ? `notPaid` : `paid`}>
                             <td>${order._id}</td>
                             <td>${order.createdAt}</td>
                             <td>${order.totalPrice}</td>
                             <td>${order.paidAt?order.paidAt : `Not Paid`}</td>
                             <td>${order.deliveredAt?order.deliveredAt : `Not delivered`}</td>
                             <td><a class="details" href="/#/order/${order._id}">DETAILS</a></td>
                             `
                           ).join('\n')}
     </tbody>
     </table>  
    </div>
    </div>
    `;
  },
};
export default ProfileScreen;