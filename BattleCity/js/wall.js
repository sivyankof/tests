class Wall extends Base {
    constructor(...arg) {
        super(arg);

        this.height = 64;
        this.width = 64;
        this.wall = '';
        this.countAnimation = 0;
    }

    //ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА КАРТЫ
    load() {
        for (let y = 0; y < MAP.length; y++) {
            for (let x = 0; x < MAP[y].length; x++) {
                if (MAP[y][x] === 3) {
                    let wall = document.createElement('div');

                    wall.classList.add('game-object', 'game-object__wall');
                    wall.style = `top:${y * this.height}px; left:${x * this.width}px`;

                    $gameMap.appendChild(wall);
                    this.wall = wall;
                }
            }
        }

        VIEW.scoreEmptyImg();
    }

    //УДАЛЕНИЕ СТЕНЫ
    destroyWall(y, x) {
        $gameMap.childNodes.forEach((elem) => {
            if (
                elem.style.top === y * this.height + `px` &&
                elem.style.left === x * this.width + `px`
            ) {
                this.animationsBang(elem);

                setTimeout(() => {
                    elem.remove();
                }, 600); // elem.remove();

                MAP[y][x] = 0;
            }
        });
    }

    //АНИМАЦИЯ ВЗРЫВА
    animationsBang(elem) {
        let arr = ['bang_1', 'bang_2', 'bang_3'];

        let timerID = setTimeout(() => {
            elem.style.backgroundImage = `url("./img/${arr[this.countAnimation]}.png")`;

            this.countAnimation++;
            this.animationsBang(elem);
        }, 200);
        if (this.countAnimation === 2) {
            clearTimeout(timerID);
            this.countAnimation = 0;
        }
    }

    youLose() {
        IS_GAME_OVER = true;
        $gameMap.innerHTML = '';
        $gameMap.style.backgroundImage = `url("./img/game-over.jpg")`;
        $gameMap.style.backgroundPosition = `center`;

        VIEW.btnResetGame();
    }

    youWin() {
        IS_GAME_OVER = true;
        $gameMap.innerHTML = '';
        $gameMap.style.backgroundImage = `url("./img/game-win.png")`;
        $gameMap.style.backgroundPosition = `center`;

        VIEW.btnResetGame();
    }
}
