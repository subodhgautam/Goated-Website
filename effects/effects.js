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
        color: "#00ff88",              // bright neon green (visible on white)
        fontWeight: "900",
        fontSize: "22px",              // bigger
        textShadow: "0 0 8px rgba(0,0,0,0.7)", // contrast boost
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
    })

    el.animate([
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        { opacity: 1, transform: "translate(-50%, -80px) scale(1.2)" },
        { opacity: 0, transform: "translate(-50%, -160px) scale(0.9)" }
    ], {
        duration: 1400,   // slower
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
    })

    layer.appendChild(el)
    setTimeout(() => el.remove(), 1400)
}

export function spawnImage(layer, { src }) {
    const img = document.createElement("img")
    img.src = src

    Object.assign(img.style, {
        position: "absolute",
        left: Math.random() * (window.innerWidth - 80) + "px",
        top: Math.random() * (window.innerHeight - 80) + "px",
        width: "40px",   // bigger
        filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))", // visibility boost
        pointerEvents: "none"
    })

    img.animate([
        { opacity: 0, transform: "scale(0.6) rotate(-10deg)" },
        { opacity: 1, transform: "scale(1.1) rotate(5deg)" },
        { opacity: 1, transform: "scale(1) rotate(0deg)" },
        { opacity: 0, transform: "scale(1.3) translateY(-60px)" }
    ], {
        duration: 1800,   // slower → noticeable
        easing: "ease-out"
    })

    layer.appendChild(img)
    setTimeout(() => img.remove(), 1800)
}