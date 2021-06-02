const $inputs = document.querySelectorAll('.form-input');

document.addEventListener('focus', onInputFocus, true);
document.addEventListener('blur', onInputBlur, true);

$inputs.forEach(($input) => {
    if ($input.dataset.validators) {
        $input.validators = createInputValidators($input);
    }
});

function onInputFocus(e) {
    if (e.target.classList.contains('form-input')) {
        const $container = e.target.closest('.form-group');
        if ($container && !$container.classList.contains('focused')) {
            $container.classList.add('focused');
        }
    }
}

function onInputBlur(e) {
    if (e.target.classList.contains('form-input')) {
        const $container = e.target.closest('.form-group');

        if (!!$container && $container.classList.contains('focused') && e.target.value.length === 0) {
            $container.classList.remove('focused');
        }
    }
}

function createInputValidators($input) {
    const validators = [];

    $input.dataset.validators.split(',').map((validator) => {
        const validatorStr = validator.trim();
        const name = validatorStr.split('(')[0];
        const param = validatorStr.split(/[()]/)[1];
        
        validators.push({
            name,
            param,
        });
    });

    return validators;
}
