import {Particle} from "./Particle.js";

class App{
    constructor() {
        this.particles = [];
        this.fireworks = [];
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
        this.init();
        this.animate();
    }

    resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init(){
        for(let i=0; i<10;i++){
            const particle = new Particle({
                x:randomBetween(0,this.canvas.width),
                y:this.canvas.height,
                r:randomBetween(2,3),
                speed:randomBetween(1,2),
                friction:0.99,
                dy:randomBetween(-15,-10),
                dx:0,
                color:`hsl(${randomBetween(0,360)}, 50%, 50%)`,
            })
            this.particles.push(particle);
        }

    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
        this.draw(this.ctx);
    }

    draw(ctx){
        this.update();
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.particles.forEach(p=>{
            p.update();
            p.draw(this.ctx);
        })
        this.fireworks.forEach(f=>{
            f.update();
            f.draw(this.ctx);
        })
    }

    update(){

        this.fireworks.forEach((f,i)=>{
            if(f.opacity <= 0){
                this.fireworks.splice(i,1);
            }
        })

        this.particles.forEach((p,i)=>{
            if(p.opacity <= 0){
                const x = p.x;
                const y = p.y;
                this.particles.splice(i,1);

                for(let i=0; i<100;i++){

                    const deg = randomBetween(0,360);
                    const dx = Math.cos(deg) * randomBetween(1,10);
                    const dy =  Math.sin(deg) * randomBetween(1,10);


                    const particle = new Particle({
                        x,
                        y,
                        r:randomBetween(2,3),
                        speed:0.1,
                        friction:0.99,
                        dy,
                        dx,
                        vy:0.2,
                        color:`hsl(${randomBetween(0,360)}, 50%, 50%)`,
                    })
                    this.fireworks.push(particle);
                }

            }
        })
    }



}

new App();

function randomBetween(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
