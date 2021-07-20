import data from './data.js'
import './lodash.min.js'
import 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js'

const template = (item, index) => {
    return (
        /*html*/
        `
        <button class="flip-card animate__animated" name="card-${item.id}">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    Memoria
                </div>
                <div class="flip-card-back">
                    <img src="animals/${item.image}">
                </div>
            </div>
        </button>
        `
    )
}

const memoria = document.querySelector('#memoria')

const dataComputada = _.shuffle(data).splice(0, 10)
const animals = [...dataComputada, ...dataComputada]

_.shuffle(animals).map((item, index) => {
    memoria.innerHTML += template(item, index)
})

let contador = 0
let current = ''

const cards = document.querySelectorAll('.flip-card')
cards.forEach((card) => {
    
    card.addEventListener('click', function(event) {
        if(!event.currentTarget.hasAttribute('active')) {

            event.currentTarget.setAttribute('active', '')
            contador++
            
            let value = event.currentTarget.attributes.name.value
            if(current === value) {
                console.log('ganaste')
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                      });
                }, 500)
                cards.forEach(item => {
                    if (item.hasAttribute('active')) {
                        setTimeout(() =>{
                            item.classList.add('animate__flash')
                        }, 500)
                        setTimeout(() =>{
                            item.classList.add('animate__zoomOut')
                            item.style.cursor = 'default'
                        }, 1500)
                    }
                });
                contador = 0
                current = ''
            } else {
                current = value
                if(contador == 2) {
                    cards.forEach(item => {
                        setTimeout(() =>{
                            item.removeAttribute('active')
                        }, 1000)
                    })
                    contador = 0
                    current = ''
                }
            }
            
        }
    })
 
});
