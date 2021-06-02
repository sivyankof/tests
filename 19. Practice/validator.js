const VALIDATOR = {
    'requiered': (value) => !!(value.length === 0),
    'min-length': (value, param) => !!(value.length < param),
    'max-length': (value, param) => !!(value.length > param),
    'point': (value, param) => !!(value.indexOf(param) === -1),
    'email': (value, param) => !!(value.indexOf(param) === -1),
    'check-password': (value) => !checkPass(value),
};

function checkPass(values) {
    let pass = document.querySelector(`input[name=password]`).value;
    return values == pass ? true : false;
}
