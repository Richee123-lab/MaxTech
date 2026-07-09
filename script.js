function welcomeMessage() {
    alert("Welcome to MaxTech Solutions! We are happy to have you here earn like a pro.");
}
function sendMessage() {


    if (name == "") {

        alert("Please enter your name.");

    } else {

        alert("Thank you, " + name + "! We received your message.");

    }

}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
let balance = localStorage.getItem("balance") || 0;


let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let referralElement = document.getElementById("referralCode");

if (currentUser && referralElement) {
    referralElement.textContent = currentUser.referralCode;
}