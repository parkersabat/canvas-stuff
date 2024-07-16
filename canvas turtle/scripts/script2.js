const layer1 = document.getElementById("layer1");
const layer1ctx = layer1.getContext("2d");
layer1.width = window.innerWidth;
layer1.height = window.innerHeight;
const particles = document.getElementById("particals");
const particlesctx = particles.getContext("2d");
particles.width = window.innerWidth;
particles.height = window.innerHeight;

const particlesArray = []

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("resize", function() {
    layer1.width = window.innerWidth;
    layer1.height = window.innerHeight;  
    particles.width = window.innerWidth;
    particles.height = window.innerHeight;  
});

function createCircle(layer, x, y, radius, fillColor, strokeColor = fillColor, strokeSize = 1, doFill = true) {
    let context = layer.getContext('2d');
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeSize;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.stroke();
    if (doFill) {
        context.fill();
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * particles.width;
        this.y = Math.random() * particles.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        createCircle(particles, this.x, this.y, 10, "white", "white", 5, false);
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

init();


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function animate() {
    particlesctx.clearRect(0, 0, particles.width, particles.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();
