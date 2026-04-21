const goat_click_btn = document.getElementById("goat_click_btn")
const balance_span = document.getElementById("balance_span")
const buy_btns = document.querySelectorAll(".buy_btn")
const template = document.getElementById("template")
const stat_list = document.getElementById("stat_list")
const nothingness = document.getElementById("nothingness")
const prices = document.querySelectorAll(".price")

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






import { createEffectsLayer, floatText, spawnImage } from "./effects/effects.js"
const effectsLayer = createEffectsLayer()




goat_click_btn.addEventListener("click", (e) => {
    e.preventDefault()

    let x = e.clientX
    let y = e.clientY

    floatText(effectsLayer, {
        x,
        y,
        text: "+2"
    })

    balance += base
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
            }
            else {
                powerups_owned.push(
                    {
                        powerup_name,
                        powerup_quantity
                    }
                )
            }
            updateShop(powerup_name)

            // add click bonuses (POWERUP FOR SSL)
            powerups_owned.forEach(p => {

                let effect = POWERUP_EFFECTS[p.powerup_name]
                if (effect?.type === "click") {
                    base += effect.value * p.powerup_quantity
                }
            })

            // apply multiplier (POWERUP FOR GB)
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

function updateShop(powerup_name) {
    prices.forEach((price) => {
        if (powerup_name === price.closest("li").querySelector("strong").textContent) {
            console.log(price);
            console.log(parseInt(price.textContent));
            price.textContent = Math.floor(parseInt(price.textContent) * 1.15)
        }
    })
}

function generateStat(powerup_name, pq) {
    let li = template.content.cloneNode(true)
    li.querySelector("strong").textContent = powerup_name
    li.querySelector("small").textContent = pq
    if (nothingness) {
        nothingness.remove()
    }
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



// --------------------------- AUTOCLICK POWERUP==============================
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
        spawnImage(effectsLayer, {
            src: "images/goat_on_click_sd.png"
        })
        balance += income
        updateBalance()
    }
}, 1000)



// THINGS USED IN THE DEV. PROCESS

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

// function clearALL() {
//     localStorage.clear()
// }
// clearALL()