const celulas = document.querySelectorAll('[data-celulas]')
const cor = document.querySelector('[data-seletor-cores]')
const borracha = document.querySelector('[data-borracha]')
const deleteAll = document.querySelector('[data-delete]')
const coresRecentes = document.querySelectorAll('[data-cores-recentes]')
const coresRecentesUm = document.querySelector('[data-cores-recentes-um]')
const coresRecentesDois = document.querySelector('[data-cores-recentes-dois]')
const coresRecentesTres = document.querySelector('[data-cores-recentes-tres]')
const coresRecentesQuatro = document.querySelector('[data-cores-recentes-quatro]')
const coresRecentesCinco = document.querySelector('[data-cores-recentes-cinco]')
const tamanhoElemento = document.querySelector('[data-tamanho]')
const painelDesenho = document.querySelector('[data-painel-desenho]')
const richard = document.querySelector('[data-richard]')
let tamanho = tamanhoElemento.value
let draw

function popularPainelDesenho(tamanho) {
    painelDesenho.style.setProperty('--tamanho', tamanho)
    
    for (let i = 0; i < tamanho * tamanho; i++) {
        const div = document.createElement('div')
        div.classList.add('celulas')
        painelDesenho.appendChild(div)
        
        div.addEventListener('mouseover', () => {
            if(!draw) return
            
            div.style.backgroundColor = cor.value
            atualizarCoresRecentes()
        })

        div.addEventListener('mousedown', () => {
            
            div.style.backgroundColor = cor.value
            atualizarCoresRecentes()
        })
    }
}

window.addEventListener('mousedown', () => {
    draw = true
})

window.addEventListener('mouseup', () => {
    draw = false
})

function reset() {
    painelDesenho.innerHTML = ''

    popularPainelDesenho(tamanho)
}

deleteAll.addEventListener('click', () => {
    const apagarDesenho = confirm('Deseja mesmo apagar todo o desenho?')

    if (apagarDesenho) reset()
})

tamanhoElemento.addEventListener('keyup', () => {
    tamanho = tamanhoElemento.value
    reset()
})

popularPainelDesenho(tamanho)

cor.addEventListener('change', () => {
    if (cor.value != '#A647FF') {
        richard.style.color = cor.value
    }

}, false)

borracha.addEventListener('click', () => {
    cor.value = '#777777'
})


for (const corRecente of coresRecentes) {
    corRecente.addEventListener('click', () => {
        cor.value = rgbParaHexArray(corRecente.style.backgroundColor)

        if (cor.value != 'A647FF') {
            richard.style.color = cor.value
        }
    })
}


function atualizarCoresRecentes() {
    let corAtualIgualAlgumaCorRecente
    corAtualIgualAlgumaCorRecente =
        hexParaRgb(cor.value) == coresRecentesUm.style.backgroundColor ||
        hexParaRgb(cor.value) == coresRecentesDois.style.backgroundColor ||
        hexParaRgb(cor.value) == coresRecentesTres.style.backgroundColor ||
        hexParaRgb(cor.value) == coresRecentesQuatro.style.backgroundColor ||
        hexParaRgb(cor.value) == coresRecentesCinco.style.backgroundColor

    if (corAtualIgualAlgumaCorRecente) return

    const corAtualIgualCorDeFundo = cor.value == '#777777'
    if (corAtualIgualCorDeFundo) return


    if (coresRecentesUm.style.backgroundColor === '') {
        coresRecentesUm.style.backgroundColor = cor.value
    } else if (coresRecentesDois.style.backgroundColor === '') {
        coresRecentesDois.style.backgroundColor = coresRecentesUm.style.backgroundColor
        coresRecentesUm.style.backgroundColor = cor.value
    } else if (coresRecentesTres.style.backgroundColor === '') {
        coresRecentesTres.style.backgroundColor = coresRecentesDois.style.backgroundColor
        coresRecentesDois.style.backgroundColor = coresRecentesUm.style.backgroundColor
        coresRecentesUm.style.backgroundColor = cor.value
    } else if (coresRecentesQuatro.style.backgroundColor === '') {
        coresRecentesQuatro.style.backgroundColor = coresRecentesTres.style.backgroundColor
        coresRecentesTres.style.backgroundColor = coresRecentesDois.style.backgroundColor
        coresRecentesDois.style.backgroundColor = coresRecentesUm.style.backgroundColor
        coresRecentesUm.style.backgroundColor = cor.value
    } else {
        coresRecentesCinco.style.backgroundColor = coresRecentesQuatro.style.backgroundColor
        coresRecentesQuatro.style.backgroundColor = coresRecentesTres.style.backgroundColor
        coresRecentesTres.style.backgroundColor = coresRecentesDois.style.backgroundColor
        coresRecentesDois.style.backgroundColor = coresRecentesUm.style.backgroundColor
        coresRecentesUm.style.backgroundColor = cor.value
    }
}

function hexParaRgb(hex) {
    const arrayRbg = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

    return `rgb(${arrayRbg[0]}, ${arrayRbg[1]}, ${arrayRbg[2]})`
}


function rgbParaHex(r, g, b) {
    return "#" + componentParaHex(r) + componentParaHex(g) + componentParaHex(b);
}

function componentParaHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbParaHexArray(rgb) {
    const _rgb = rgb
        .substring(3)
        .replace('(', '')
        .replace(')', '')
        .replace(',', '')
        .replace(',', '')
        .split(' ')

    const hex = rgbParaHex(+_rgb[0], +_rgb[1], +_rgb[2])

    return hex
}
