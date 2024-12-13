import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {setInner} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

if (getCookie("login") === "") {
    redirect("https://itung.in.my.id/dashboard/");
}

getJSON(
    "https://asia-southeast2-awangga.cloudfunctions.net/itungin/data/user",
    "login",
    getCookie("login"),
    responseFunction
);

function responseFunction(result) {
    if (result.status === 200) {
        const { name, email, phonenumber } = result.data;

        // Display data on the page
        setInner("content", `Nama: ${name}<br>Email: ${email}<br>Nomor Telepon: ${phonenumber}`);

        // Save data to localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhoneNumber", phonenumber);
    } else {
        // If user not found, fallback to another endpoint or handle error
        setInner("content", "Silakan daftar dahulu ke Itungin.");
        redirect("https://itung.in.my.id/");
    }
}


function apiResponse(result){
    if (result.status===200){
        setInner("content","Selamat datang "+result.data.data.fullname);
        redirect("/testi");
        console.log(result);
    }
    else{
        setInner("content","Selamat Datang");
        redirect("https://itung.in.my.id/dashboard/");  
       //redirect("https://wa.me/pamongdesa?text=bantuan+operator");
    }
}
