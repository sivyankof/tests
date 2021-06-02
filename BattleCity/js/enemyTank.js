class EnemyTank extends Tank {
    constructor(y, x, ...arg) {
        super(arg);

        this.startY = y;
        this.startX = x;

        this.y = y;
        this.x = x;

        this.img = new Image(this.width, this.height);

        this.directionСlear = true;
        this.route = Math.floor(Math.random() * (4 - 0)) + 0;

        this.countStepDirection = 0;
        this.createBullet = false;
        this.dead = false;
    }

    init() {
        this.img.classList = 'game-object__enemy-tank';
        this.img.src = './img/Tank_Enemy.gif';
        this.img.style.top = `${this.y * this.height}px`;
        this.img.style.left = `${this.x * this.width}px`;

        $gameMap.appendChild(this.img);
    }

    //НАЧАЛО ДВИЖЕНИЯ
    move() {
        if (!this.dead) {
            const directions = ['TOP', 'RIGHT', 'DOWN', 'LEFT'];

            if (!this.directionСlear) {
                const randomDirection = Math.floor(Math.random() * (4 - 0)) + 0;

                this.route = randomDirection;

                this.direction(directions[randomDirection]);
                this.bull();
            } else {
                this.directionСlear = true;

                this.direction(directions[this.route]);
                this.bull();
            }
        }
    }

    //ЗАПУСК РАКЕТЫ
    bull() {
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

    //ОПРЕДЕЛЕНИЕ ДВИЖЕНИЕ НА КАРТЕ
    direction(randomDirection) {
        let copyMap = MAP;

        switch (randomDirection) {
            case 'TOP':
                if (
                    this.y * this.height > 0 &&
                    this.countStepDirection <= 4 &&
                    MAP[this.y - 1][this.x] !== MAP_LEGEND.WALL &&
                    MAP[this.y - 1][this.x] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    this.countStepDirection++;

                    copyMap[this.y][this.x] = 0;
                    this.y -= 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.ENEMY_BASE;
                    MAP = copyMap;

                    this.directionСlear = true;
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.countStepDirection = 0;
                    this.directionСlear = false;
                }

                break;

            case 'RIGHT':
                if (
                    this.x * this.width < $gameMap.clientWidth - this.width &&
                    this.countStepDirection <= 4 &&
                    MAP[this.y][this.x + 1] !== MAP_LEGEND.WALL &&
                    MAP[this.y][this.x + 1] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    this.countStepDirection++;

                    copyMap[this.y][this.x] = 0;
                    this.x += 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.ENEMY_BASE;
                    MAP = copyMap;

                    this.directionСlear = true;
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.countStepDirection = 0;
                    this.directionСlear = false;
                }

                break;

            case 'DOWN':
                if (
                    this.y * this.height + this.height <=
                        $gameMap.clientHeight - this.height &&
                    this.countStepDirection <= 4 &&
                    MAP[this.y + 1][this.x] !== MAP_LEGEND.WALL &&
                    MAP[this.y + 1][this.x] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    this.countStepDirection++;

                    copyMap[this.y][this.x] = 0;
                    this.y += 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.ENEMY_BASE;
                    MAP = copyMap;

                    this.directionСlear = true;
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.countStepDirection = 0;
                    this.directionСlear = false;
                }
                break;

            case 'LEFT':
                if (
                    this.x * this.width > 0 &&
                    this.countStepDirection <= 4 &&
                    MAP[this.y][this.x - 1] !== MAP_LEGEND.WALL &&
                    MAP[this.y][this.x - 1] !==
                        (MAP_LEGEND.ENEMY_BASE || MAP_LEGEND.PLAYER_BASE)
                ) {
                    this.countStepDirection++;

                    copyMap[this.y][this.x] = 0;
                    this.x -= 1;
                    copyMap[this.y][this.x] = MAP_LEGEND.ENEMY_BASE;
                    MAP = copyMap;

                    this.directionСlear = true;
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    return MAP;
                } else {
                    VIEW.viewMove(randomDirection, this.img, this.y, this.x);

                    this.countStepDirection = 0;
                    this.directionСlear = false;
                }
                break;
        }
    }

    //УНИЧТОЖЕНИЕ ТАНКА
    destroyedEmpty() {
        this.dead = true;
        this.img.scr = '';

        VIEW.popKillEnpty();
        VIEW.animationsBang(this.img);

        setTimeout(() => {
            VIEW.animationsBigBang(this.y, this.x);
        }, 200);

        setTimeout(() => {
            this.dead = false;
            
            $gameMap.querySelector('#bigBang').remove();

            this.img.src = `./img/Tank_Enemy.gif`;

            MAP[this.y][this.x] = 0;
            this.y = this.startY;
            this.x = this.startX;

            VIEW.viewMove('TOP', this.img, this.y, this.x);
        }, 600);
    }
}
