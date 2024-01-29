import {GlowParticle} from "./glowparticle.js";

const COLORS = [
    {r: 45, g: 74, b: 227},
    {r: 250, g: 255, b: 89},
    {r: 255, g: 104, b: 248},
    {r: 44, g: 209, b: 252},
    {r: 54, g: 233, b: 84},
];

class App {
    constructor() {
        this.canvas = document.getElementById('maincanvas');
        this.ctx = this.canvas.getContext('2d');

        this.totalParticles = 25;
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;


        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.ctx.globalCompositeOperation = 'saturation';

        this.createParticles();
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor]
            );

            if (++curColor >= COLORS.length) {
                curColor = 0
            }

            this.particles[i] = item;
        }
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            this.particles[i].animate(this.ctx, this.stageWidth, this.stageHeight);
        }

        this.ctx.font = '70px Rubik Mono One';
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = "left";
        this.ctx.fillText('2024 COCO', 50, 100);
        this.ctx.fillText('LEAGUE OF LEGEND', 50, 200);
        this.ctx.fillText('FRIENDLY MATCH', 50, 300);
        this.ctx.fillText('MATCH 2. IRENE CUP', 50, 400);
    }
}

window.onload = () => {
    new App();
};