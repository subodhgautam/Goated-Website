const goat_click_btn = document.getElementById("goat_click_btn")
const balance_span = document.getElementById("balance_span")


let balance = JSON.parse(localStorage.getItem("balance")) || 0 ;

goat_click_btn.addEventListener("click", (e)=>{
    e.preventDefault()
    balance += 2;
    updateBalance()
})

function updateBalance() {
    balance_span.textContent = balance
    localStorage.setItem("balance",JSON.stringify(balance))
}

updateBalance()


















































function clearALL() {
    localStorage.clear()
    // clearALL()
}