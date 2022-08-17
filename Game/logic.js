const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0

        const image = new Image()
        image.src = './assets/spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //THIS IS A RED BOX INSTEAD OF THE SPACESHIP
        c.save()
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
        c.rotate(this.rotation)
        c.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player();
const projectiles = [];

const keys = {
    a: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    projectiles.forEach(projectile => {
        projectile.update()
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case ' ':
            keys.space.pressed = true
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -9
                }
            }))
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowLeft':
            player.velocity.x = -5
            keys.ArrowLeft.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            break
    }
})