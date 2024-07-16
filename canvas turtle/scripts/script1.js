const bottomLayer = document.getElementById("bottomLayer");
const bottomLayerctx = bottomLayer.getContext("2d");
bottomLayer.width = window.innerWidth;
bottomLayer.height = window.innerHeight;
const layer2 = document.getElementById("layertwo");
const layer2ctx = layer2.getContext("2d");
layer2.width = window.innerWidth;
layer2.height = window.innerHeight;

let objects = []

class Turtle {
    constructor(layer, tag, size, hidden = false, x = undefined, y = undefined, fillColor = "white", strokeColor = fillColor, shape = "circle", doFill = true, strokeSize = 1) {
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.tag = tag
        this.shape = shape
        this.xSpeed = 0
        this.ySpeed = 0
        this.layer = layer
        this.x = x
        this.y = y
        this.size = size
        this.doFill = doFill
        this.isHidden = hidden
        this.strokeSize = strokeSize
        this.shrinking = true
    }

    shape(shape = null) {
        if (!this.shape == null) {this.shape = shape}
        else{return this.shape}
    }

    speed(xSpeed = undefined, ySpeed = undefined) {
        if (xSpeed == undefined && ySpeed == undefined) {return [this.xSpeed, this.ySpeed]}
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
    }

    update() {
        this.x += this.xSpeed
        this.y += this.ySpeed

        this.strokeSize = this.size/10
        // if (this.size < 0) {
        //     this.x = bottomLayer.width/2 + (Math.random() * 200) - 100; this.y = bottomLayer.height/2 + (Math.random() * 200) - 100
        //     this.size = 10
        //     this.strokeColor = "rgb("+Math.random() * 255+","+ Math.random() * 255+","+ Math.random() * 255+')';
        //     this.fillColor = "rgb("+Math.random() * 255+","+ Math.random() * 255+","+ Math.random() * 255+')';
        // }
        if(Math.round(Math.random() * 80000 + 1) == 54 && this.isHidden == false) {this.layer = layer2; console.log(this)}

        if (this.shrinking == true) {
        this.size -= 0.05
        }
    }

    draw() {
        if(this.shape == "circle" && this.isHidden == false && this.layer == layer2) {
            this.strokeColor = "rgb("+Math.random() * 255+","+ Math.random() * 255+","+ Math.random() * 255+')';
            this.fillColor = "rgb("+Math.random() * 255+","+ Math.random() * 255+","+ Math.random() * 255+')';
            createCircle(this.layer, this.x, this.y, this.size, this.doFill, this.fillColor, this.strokeColor, this.strokeSize)
        }
    }
}

window.addEventListener("resize", function() {
    bottomLayer.width = window.innerWidth;
    bottomLayer.height = window.innerHeight;   
    layer2.width = window.innerWidth;
    layer2.height = window.innerHeight;   
});

function createCircle(layer, x, y, radius, doFill = true, fillColor, strokeColor = fillColor, strokeSize = 1) {
    if (radius < 0.01) {return}
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

for (i = 0; i<100000; i++){objects.push(new Turtle(bottomLayer, "test", Math.random() * 21 + 15, false, bottomLayer.width/2 + (Math.random() * 200) - 100, bottomLayer.height/2 + (Math.random() * 200) - 100, "white", "blue", "circle", false, 50/4))}

function animate() {
    bottomLayerctx.clearRect(0, 0, bottomLayer.width, bottomLayer.height);
    handleTurtles();
    requestAnimationFrame(animate);
}

function handleTurtles() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
        objects[i].draw();
    }
}


for (i = 0; i < objects.length; i++) {
objects[i].speed((Math.random() * 4) - 2, (Math.random() * 4) - 2);
}
console.log(objects[0].speed())

animate()