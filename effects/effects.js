export function createEffectsLayer() {
    let layer = document.createElement("div")
    layer.id = "effects_layer"

    Object.assign(layer.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
    })

    document.body.appendChild(layer)
    return layer
}

export function floatText(layer, { x, y, text }) {
    const el = document.createElement("div")
    el.textContent = text

    Object.assign(el.style, {
        position: "absolute",
        left: x + "px",
        top: y + "px",
        color: "gold",
        fontWeight: "bold",
        transform: "translate(-50%, -50%)"
    })

    el.animate([
        { opacity: 1, transform: "translate(-50%, -50%)" },
        { opacity: 0, transform: "translate(-50%, -120px)" }
    ], {
        duration: 800,
        easing: "ease-out"
    })

    layer.appendChild(el)
    setTimeout(() => el.remove(), 800)
}


export function spawnImage(layer, { src }) {
    const img = document.createElement("img")
    img.src = src

    Object.assign(img.style, {
        position: "absolute",
        left: Math.random() * window.innerWidth + "px",
        top: Math.random() * window.innerHeight + "px",
        width: "40px"
    })

    img.animate([
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(1.5)" }
    ], {
        duration: 800,
        easing: "ease-out"
    })

    layer.appendChild(img)
    setTimeout(() => img.remove(), 800)
}