import { getUserInfo } from "../localStorage";

const Header={
    render:()=>{
        const {name , isAdmin}=getUserInfo();
  
     return `
       <div class="brand">
        <a href="/#/"> <img src="images/logo.png" style="height: 4.6rem;"> <span>KsMart</span></a>
      </div>
      <div>
      ${name ? `<a href ="/#/profile"> ${name} </a>`:`<a href="/#/signin">Sign-In</a>`}
        <a href="/#/cart">Cart</a>
        ${isAdmin?`<a href="/#/dashboard">Dasboard</a>`:''}
      </div>
      `
    },
    after_render:()=>{

    }
}

export default Header;