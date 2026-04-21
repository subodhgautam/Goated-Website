const goat_click_btn = document.getElementById("goat_click_btn")
const balance_span = document.getElementById("balance_span")
const buy_btns = document.querySelectorAll(".buy_btn")
const template = document.getElementById("template")
const stat_list = document.getElementById("stat_list")
const nothingness = document.getElementById("nothingness")

const defaults = {
    balance: 0,
    powerups: []
}

const POWERUP_EFFECTS = {
    "Sturdy Salt Lick": { type: "click", value: 1 },
    "Grazing Goatling": { type: "passive", value: 1 },
    "Mountain Climber": { type: "passive", value: 5 },
    "Golden Bell": { type: "multiplier", value: 2 }
}


// let balance = JSON.parse(localStorage.getItem("balance")) || 0;
let userinfo = JSON.parse(localStorage.getItem("gameSave")) || defaults
let balance = userinfo.balance || 0
let powerups_owned = userinfo.powerups || []
let powerup_quantity = 1
let base = 1


goat_click_btn.addEventListener("click", (e) => {
    e.preventDefault()

   
    console.log("Base",base);
    
    balance += base
    console.log("Balance",balance);
    
    // balance += 1;
    updateBalance()
})

buy_btns.forEach(buy_btn => {
    buy_btn.addEventListener("click", (e) => {
        e.preventDefault()

        let parent_el = e.target.closest("li")
        let powerup_name = parent_el.querySelector("strong").textContent
        let powerup_price = parseInt(parent_el.querySelector(".price").textContent)

        // yedi balance pugey balla aru kura garni natra nikal bhai
        if (powerup_price <= balance) {
            // console.log("balance pugyo, paisa katt..");
            balance = balance - powerup_price



            let afno_powerup = powerups_owned.find(p => p.powerup_name == powerup_name)
            if (afno_powerup) {
                afno_powerup.powerup_quantity++
                // console.log(current_powerup_quantity);

                // console.log("after increment", afno_powerup.powerup_quantity);
                // let li = generateStat(powerup_name, afno_powerup.powerup_quantity)
                // console.log("after append final log", afno_powerup.powerup_quantity);
            }

            else {
                // let li = generateStat(powerup_name, powerup_quantity)
                powerups_owned.push(
                    {
                        powerup_name,
                        powerup_quantity
                    }
                )
            }

 // add click bonuses
    powerups_owned.forEach(p => {
        let effect = POWERUP_EFFECTS[p.powerup_name]

        if (effect?.type === "click") {
            base += effect.value * p.powerup_quantity
        }
    })

    // apply multiplier
    powerups_owned.forEach(p => {
        let effect = POWERUP_EFFECTS[p.powerup_name]

        if (effect?.type === "multiplier") {
            base *= Math.pow(effect.value, p.powerup_quantity)
        }
    })





            updateBalance()
        }
    });
    console.log("out of if");
})

function generateStat(powerup_name, pq) {
    // console.log("quantity received", pq);

    let li = template.content.cloneNode(true)
    li.querySelector("strong").textContent = powerup_name
    li.querySelector("small").textContent = pq
    if (nothingness) {
        nothingness.remove()
    }
    // console.log("the li returned ", li);

    return li
}

function updateBalance() {
    balance_span.textContent = balance
    // console.log("inside the update balance, the powerups_owned", powerups_owned);

    userinfo = {
        balance,
        powerups: powerups_owned
    }
    localStorage.setItem("gameSave", JSON.stringify(userinfo))
    updateStats()
}

function updateStats() {
    stat_list.innerHTML = ""
    powerups_owned.forEach((powerup_info_obj) => {
        let li = generateStat(powerup_info_obj.powerup_name, powerup_info_obj.powerup_quantity)
        stat_list.appendChild(li)

    })
}



updateBalance()



// --------------------------- POWERUPS ==============================
// AUTO CLICKER

// setInterval(() => {
//     // This runs every 1000ms
//     const goats = itemsOwned.find((i) => i.name === "Cat");
//     if (catOwned) {
//         // If you own cats
//         for (let i = 0; i < catOwned.amount; i++) {
//             buttonClick();
//         }
//     }
// }, 1000);


setInterval(() => {
    let income = 0

    powerups_owned.forEach(p => {
        let effect = POWERUP_EFFECTS[p.powerup_name]

        if (effect?.type === "passive") {
            income += effect.value * p.powerup_quantity
        }
    })

    // apply multiplier
    powerups_owned.forEach(p => {
        let effect = POWERUP_EFFECTS[p.powerup_name]

        if (effect?.type === "multiplier") {
            income *= Math.pow(effect.value, p.powerup_quantity)
        }
    })

    if (income > 0) {
        balance += income
        updateBalance()
    }
}, 1000)


















// DESIGN FOR LOCAL STORAGE
// let userinfo = {
//     balance,
//     powerups: [
//         {
//             powerup_name,
//             powerup_quantity
//         }
//     ]
// }










function clearALL() {
    localStorage.clear()
}
// clearALL()