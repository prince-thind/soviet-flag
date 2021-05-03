const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function ()
{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

let particlesArray = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

function generateParticles(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++)
    {
        particlesArray.push(new Particle(i));
    }
}
canvas.addEventListener('mousemove', generateParticles)
canvas.addEventListener('click', generateParticles)


class Particle
{

    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedy = Math.random() * 4 - 2;
        this.color = 'hsl(' + hue + ',100%,50%)';
    }

    update()
    {
        this.x += this.speedX;
        this.y += this.speedy;
        if (this.size > 0.2)
            this.size -= 0.1;
    }
    draw()
    {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

}

function handleParticles()
{
    for (let i = 0; i < particlesArray.length; i++)
    {
        particlesArray[i].draw();
        particlesArray[i].update();

        for (let j = i; j < particlesArray.length; j++)
        {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80 && distance > 50)
            {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if (particlesArray[i].size <= 0.2)
        {
            particlesArray.splice(i, 1);
            i--;
        }
    }
    hue++;
    if(hue>360*100)
    {
        hue=0;
    }
}
function animate()
{
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();