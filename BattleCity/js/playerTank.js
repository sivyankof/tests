class PlayerTank extends Tank {
    constructor(y, x, ...arg) {
        super(arg);

        this.startY = y;
        this.startX = x;
        this.y = y;
        this.x = x;

        this.img = new Image(this.width, this.height);
        this.route = 0;
        this.nextStepFree = true;
        this.createBullet = false;
    }

    init() {
        this.img.classList = 'game-object__player-tank';
        this.img.src = './img/Tank_Player.gif';
        this.img.style.top = `${this.y * this.height}px`;
        this.img.style.left = `${this.x * this.width}px`;

        $gameMap.appendChild(this.img);
    }

    //НАЧАЛО ДВИЖЕНИЯ
    move(event) {
        if (this.nextStepFree) {
            switch (event.code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                    event.preventDefault();
                    this.direction(event.code);
            }
            this.nextStepFree = false;
            setTimeout(() => (this.nextStepFree = true), 600);
        }
    }
    //ЗАПУСК РАКЕТЫ
    bull(event) {
        switch (event.code) {
            case 'Space':
                event.preventDefault();

                if (this.createBullet) {
                    if (this.bullet.destroyed) {
                        this.createBullet = false;

                        delete this.bullet;
                    }
                } else if (!this.createBullet) {
                    this.bullet = new Bullet(this.img, this.route, this.y, this.x);
                    this.bullet.create();

                    this.createBullet = true;
                }
        }
    }

    //ОПРЕДЕЛЕНИЕ ДИВЖЕНИЯ НА КАРТЕ
    direction(randomDirection) {
        let copyMap = MAP;

        switch (randomDirection) {
            case 'ArrowUp':
                if (
                    this.y * this.height > 0 &&
                    MAP[this.y - 1][this.x] !== MAP_LEGEND.WALL &&
                    MAP[this.y - 1][this.x] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    copyMap[this.y][this.x] = 0;
                    this.y -= 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.PLAYER_BASE;
                    MAP = copyMap;

                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 0;
                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 0;
                }
                break;

            case 'ArrowRight':
                if (
                    this.x * this.width < $gameMap.clientWidth - this.width &&
                    MAP[this.y][this.x + 1] !== MAP_LEGEND.WALL &&
                    MAP[this.y][this.x + 1] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    copyMap[this.y][this.x] = 0;
                    this.x += 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.PLAYER_BASE;
                    MAP = copyMap;

                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 1;
                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 1;
                }

                break;
            case 'ArrowDown':
                if (
                    this.y * this.height + this.height <=
                        $gameMap.clientHeight - this.height &&
                    MAP[this.y + 1][this.x] !== MAP_LEGEND.WALL &&
                    MAP[this.y + 1][this.x] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    copyMap[this.y][this.x] = 0;
                    this.y += 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.PLAYER_BASE;
                    MAP = copyMap;

                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 2;
                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 2;
                }
                break;
            case 'ArrowLeft':
                if (
                    this.x * this.width > 0 &&
                    MAP[this.y][this.x - 1] !== MAP_LEGEND.WALL &&
                    MAP[this.y][this.x - 1] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    copyMap[this.y][this.x] = 0;
                    this.x -= 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.PLAYER_BASE;
                    MAP = copyMap;

                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 3;
                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.route = 3;
                }
                break;
        }
    }

    //УНИЧТОЖЕНИЕ ТАНКА
    destroyed() {
        let score = $deadPlayer.textContent;
        score = +score - 1;
        $deadPlayer.innerHTML = score;

        this.img.scr = '';
        VIEW.animationsBang(this.img);

        setTimeout(() => {
            MAP[this.startY][this.startX] = 1;

            this.img.src = `./img/Tank_Player.gif`;
            this.y = this.startY;
            this.x = this.startX;

            VIEW.viewMove('TOP', this.img, this.y, this.x);
        }, 600);
    }
}
