import { signin } from "../api";
import { getCartItems, getUserInfo, setUserInfo } from "../localStorage";
import { hideloading, showloading, showMessage } from "../utils";


const SignInScreen={
    after_render:()=>{
        document.getElementById("signin-form").addEventListener("submit",async(e)=>{
            e.preventDefault(); //not refresh
            showloading();
            const data = await signin({
                email:document.getElementById("email").value,
                password:document.getElementById("password").value
            });
            hideloading();
            console.log(data);
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data);
                if(getCartItems().length!=0){
                    document.location.hash='/shipping';
                }else{
                    document.location.hash='/';
                }
            }
        })
    },
    render:()=>{
        if(getUserInfo().name){
            if(getCartItems().length!=0){
                document.location.hash='/shipping';
            }else{
                showMessage("Add an item in cart to proceed further!!😁😃");
                document.location.hash='/cart';
            }
        }
        return `<h1 class="text-center login-title my-5"><b style="font-size:4rem"><img src="images/logo.png" style="height:6rem; width:6rem;"> KsMart Login</b></h1>
        <div class="container login-cont" style="width:40rem;height:42rem">
        <div class="row my-5">
            <div class="account-wall">
                <img src="https://th.bing.com/th/id/R.62f8e8853e6bef0c817a88b3f5e83acd?rik=QWKDSA1veTmFXg&riu=http%3a%2f%2fwww.onlineupsidc.com%2fofficeUsers%2fimages%2flogin.png&ehk=xkRasqW1nxMTI3LRDxS0waoZ8uwGlEe2GVXnMkODWlc%3d&risl=&pid=ImgRaw&r=0" alt="" style="width: 14rem;">
                <form action="" class="form-signin" id="signin-form">
                    <input type="email" class="form-control" id="email" placeholder="Email" required name="email"
                        style="margin: 1rem;">
                    <input type="password" class="form-control" id="password" placeholder="Password" required name="password"
                        style="margin: 1rem;">
                    <button type="submit" class="btn primary btn-lg btn-block" id="submitid" style="margin: 1rem;">Sign
                        in</button>
                    <a href="#/recover" class="pull-right need-help">Need help</a><span class="clearfix"></span>
                </form><span style="color:white">New User ?<span><a href="/#/register" class="text-center new-account" style="margin: 1rem;">&nbsp;Create a new Account&nbsp;</a>
            </div>
        </div>
    </div>`
    }
}

export default SignInScreen