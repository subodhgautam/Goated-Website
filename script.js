const goat_click_btn = document.getElementById("goat_click_btn")
const balance_span = document.getElementById("balance_span")
const buy_btns = document.querySelectorAll(".buy_btn")
const template = document.getElementById("template")
// const price = document.getElementById("price")
const stat_list = document.getElementById("stat_list")
const nothingness = document.getElementById("nothingness")


// let balance = JSON.parse(localStorage.getItem("balance")) || 0;
let balance = 90000000 
let powerup_quantity = 1

goat_click_btn.addEventListener("click", (e) => {
    e.preventDefault()
    balance += 2;
    updateBalance()
})

buy_btns.forEach(buy_btn => {
    buy_btn.addEventListener("click", (e) => {
        e.preventDefault()

        // stat_list.innerHTML=""    
        let parent_el = e.target.closest("li")
        let powerup_name = parent_el.querySelector("strong").textContent
        let powerup_price = parseInt(parent_el.querySelector(".price").textContent)
        
        // console.log("This is this->",parent_el.querySelector(".price").textContent);
        // console.log("This is this->",powerup_price);    
        // powerup_price=0
        // console.log("setting 0 for debug", powerup_price);

        if (powerup_price <=  balance) {
            console.log("okay");
            balance = balance - powerup_price
            let li = generateStat(powerup_name, powerup_quantity)
            stat_list.appendChild(li)
            powerup_quantity++
            updateBalance()
        }
});
    console.log("out of if");
})

function generateStat(powerup_name, powerup_quantity) {
    let li = template.content.cloneNode(true)
    li.querySelector("strong").textContent = powerup_name
    li.querySelector("small").textContent = powerup_quantity
    nothingness.remove()
    return li
}

function updateBalance() {
    balance_span.textContent = balance
    localStorage.setItem("balance", JSON.stringify(balance))
}

updateBalance()



































function clearALL() {
    localStorage.clear()
    // clearALL()
}