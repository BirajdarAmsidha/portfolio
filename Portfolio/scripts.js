// AOS Scroll Animation
AOS.init({
    duration: 1200,
    once: true
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hero floating particles (optional using canvas)
const hero = document.querySelector('.hero');
const canvas = document.createElement('canvas');
hero.appendChild(canvas);
canvas.width = hero.offsetWidth;
canvas.height = hero.offsetHeight;
const ctx = canvas.getContext('2d');

let particles = [];
for(let i=0;i<80;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5
    });
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0 || p.x>canvas.width) p.dx*=-1;
        if(p.y<0 || p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
});


// Animate circular skills
document.querySelectorAll('.skill-circle').forEach(circle => {
    const percent = circle.dataset.percent;
    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "120");
    svg.setAttribute("height", "120");

    const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bgCircle.setAttribute("r", radius);
    bgCircle.setAttribute("cx", 60);
    bgCircle.setAttribute("cy", 60);
    bgCircle.setAttribute("stroke", "rgba(255,255,255,0.3)");
    bgCircle.setAttribute("stroke-width", "8");
    svg.appendChild(bgCircle);

    const fgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fgCircle.setAttribute("r", radius);
    fgCircle.setAttribute("cx", 60);
    fgCircle.setAttribute("cy", 60);
    fgCircle.setAttribute("stroke", "#fff");
    fgCircle.setAttribute("stroke-width", "8");
    fgCircle.setAttribute("stroke-dasharray", circumference);
    fgCircle.setAttribute("stroke-dashoffset", circumference);
    fgCircle.setAttribute("stroke-linecap", "round");
    svg.appendChild(fgCircle);

    circle.appendChild(svg);

    let offset = circumference - (percent / 100) * circumference;
    fgCircle.style.transition = 'stroke-dashoffset 1.5s ease';
    setTimeout(() => {
        fgCircle.style.strokeDashoffset = offset;
    }, 200);
});
