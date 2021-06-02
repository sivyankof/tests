const $form = document.getElementById('userEditForm');
const fileUploadInput = new FileUploadInput();

document.addEventListener('submit', onFromSubmit);

function onFromSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (validateForm(e.target)) {
        // formData.append('file', fileUploadInput.droppedFiles[0]);
        console.log('form submit');
    } else {
        console.log('form is not valid');
    }
}

function validateForm($form) {
    const $inputs = $form.querySelectorAll('.form-input');
    let isFormValid = true;

    $inputs.forEach(($input) => {
        const isInputValid = validateInput($input);

        if (!isInputValid) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function validateInput($input) {
    const $container = $input.closest('.form-group');
    const value = $input.value;

    let inputMessage = 'valid';

    if ($input.dataset.validators) {
        // console.log( validator.param)
        $input.validators.forEach((validator) => {
            $container.classList.remove(`error--${validator.name}`);

            if (VALIDATOR[validator.name](value, validator.param)) {
                inputMessage = `error--${validator.name}`;
            }

            // if (CHECKPASS[validator.name](value, validator.param)) {
            //     inputMessage = `error--${validator.name}`;
            // }

        });
    }

    if (inputMessage !== 'valid') {
        $container.classList.add('has-error');
        $container.classList.add(inputMessage);
    } else {
        $container.classList.remove('has-error');
    }

    return inputMessage === 'valid';
}
