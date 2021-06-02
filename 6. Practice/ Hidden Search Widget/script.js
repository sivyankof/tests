const daltaTime = 3;
const steps = 100;
document.addEventListener('click', onSearchBtnClick);

function onSearchBtnClick(e) {
    if (e.target.classList.contains('search-btn')) {
        console.log('!!!!');

        let increment = 1;
        let startWidth = 50;
        let startLeft = 0;

        if (e.target.classList.contains('active')) {
            increment = -1;
            startWidth = 200;
            startLeft = 200;

            e.target.classList.remove('active');
        } else {
            e.target.classList.add('active');
        }

        // btnToggle(e.target, increment, startLeft);
        // inputToggle(e.target.previousElementSibling, increment, startWidth);

        elementToggle(e.target, increment, startLeft, 'left');
        elementToggle(e.target.previousElementSibling, increment, startWidth, `width`);

        e.target.previousElementSibling.focus();
    }
}

function elementToggle($element, increment, start, styleName) {
    let counter = 0;
    let differentStyle = start;
    increment = (increment * (200 - 0)) / steps;

    Step();

    function Step() {
        if (counter < steps) {
            if (styleName === `width`) {
                $element.style.width = `${differentStyle }px`;
            }
            if (styleName === `left`) {
                $element.style.left = `${differentStyle}px`;
            }
            differentStyle += increment;
            counter++;
            setTimeout(Step, daltaTime);
        }
    }
}

// function elementToggle($element, increment, styleName, start, end) {
//     // TODO Emplement this
// }

// function inputToggle($input, increment, startWidth, styleName, start, end) {
//     let counter = 0;
//     let width = startWidth;
//     increment = (increment * (200 - 50)) / steps;

//     inputStep();

//     function inputStep() {
//         if (counter < steps) {
//             $input.style.width = `${width}px`;
//             width += increment;
//             counter++;
//             setTimeout(inputStep, daltaTime);
//         }
//     }
// }

// function btnToggle($btn, increment, startLeft) {
//     let counter = 0;
//     let leftPosition = startLeft;
//     increment = (increment * (200 - 0)) / steps;

//     btnStep();

//     function btnStep() {
//         if (counter < steps) {
//             $btn.style.left = `${leftPosition}px`;
//             leftPosition += increment;
//             counter++;
//             setTimeout(btnStep, daltaTime);
//         }
//     }
// }
