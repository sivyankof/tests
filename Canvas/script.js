const $btn = document.querySelector(`.btn`);
const $textArea = document.querySelector(`.textarea`);
const $canvas = document.getElementById('graph');
const ctx = $canvas.getContext('2d');

$btn.addEventListener('click', setDataCanvas);
ctx.transform(1, 0, 0, -1, 0, $canvas.height);

function setDataCanvas(event) {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    let arrXY = $textArea.value
        .split('\n')
        .filter((val) => val.trim())
        .map((el) => el.split(' '))
        .filter((val) => val.length >= 2 && val[0].trim() && val[1].trim());

    draw(arrXY);
}

function draw(arr) {
    testLine(arr);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';

    ctx.moveTo(0, 0);

    for (i = 0; i < arr.length; i++) {
        const x = arr[i][0];
        const y = arr[i][1];

        console.log('x', x);
        console.log('y', y);

        ctx.fillStyle = 'yellow';
        ctx.fillRect(x - 4, y - 4, 6, 6);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(x - 4, y - 4, 8, 8);

        ctx.strokeStyle = 'red';
        ctx.lineTo(x, y);
    }

    ctx.stroke();
}

function testLine(arr) {
    arr.forEach((el) => {
        if (el[0] >= $canvas.width) {
            arr.map((elem) => {
                elem[0] *= 0.8;
            });

            testLine(arr);
        } else if (el[1] >= $canvas.height) {
            arr.map((elem) => {
                elem[1] *= 0.8;
            });

            testLine(arr);
        }
    });
}
