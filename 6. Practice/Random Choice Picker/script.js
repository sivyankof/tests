
const $choiseInput = document.getElementById('choises-input')
const $choiseList = document.getElementById('choises-list')

$choiseInput.focus()

document.addEventListener('keyup', onChoiseInput)

function onChoiseInput(e) {
    if (e.target.classList.contains('choises-input')) {
        console.log($choiseInput.value, e.key)
       
        createChoises($choiseInput.value)

        if (e.key === 'Enter' && $choiseInput.value.trim().length > 0) {
            $choiseInput.value = ''

            randomSelect()
        }
    }
}

function createChoises(text) {
    $choiseList.innerHTML = ''
    // split join
    // ' kbkh ' -> 'kbkh'
    // '         ' -> ''
   // console.log(text.split(','))
    text
        .split(',')
        .filter( choise => choise.trim().length > 0)
        .forEach(createChoise);
}

function createChoise(choise) {
    const $element = document.createElement('li');
    $element.classList.add('choises-list-item');
    $element.textContent = choise
    $choiseList.append($element)
}


function randomSelect() {
    const times = 30;
    let counter = 0;

    const interval = setInterval(() => {
        const randomChoise = pickRandomChouise()
        // document.querySelector('.choises-list-item--chosen')
        //     .classList.remove('choises-list-item--chosen')
        
        randomChoise.classList.add('choises-list-item--chosen')

        counter++
        
        if (counter < times) {
            setTimeout(() => {
                randomChoise.classList.remove('choises-list-item--chosen')
            }, 100);
        }
        
        if (counter >= times) {
            clearInterval(interval)
        }

    }, 100);
}

function pickRandomChouise() {
    const $choises = document.querySelectorAll('.choises-list-item')
    const randomNumber = Math.floor( Math.random() * $choises.length )

    return $choises[randomNumber]
}