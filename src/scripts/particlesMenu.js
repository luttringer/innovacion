
if (window.matchMedia('(max-width: 767px)').matches) { /* no particles on mobile */ } else {

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Seleccionamos el contenedor .cont_menu_navigation
const container = document.querySelector('.cont_menu_navigation');

// Función para ajustar el tamaño del canvas al tamaño de .cont_menu_navigation
function resizeCanvas() {
    const rect = container.getBoundingClientRect(); // Obtener las dimensiones del contenedor
    canvas.width = rect.width;
    canvas.height = rect.height;
}

// Inicialmente, ajusta el tamaño del canvas según el contenedor
resizeCanvas();

// Parámetros configurables
const numParticles = 70;  // Número inicial de partículas
const maxParticles = 100;  // Límite máximo de partículas permitidas
const maxDistance = 100;    // Distancia máxima para conectar partículas
const particleRadius = 1;  // Radio de las partículas
const particleSpeed = 0.5; // Velocidad de las partículas

// Definimos las partículas
const particles = [];

let repelParticles = true;  // Controla si las partículas deben alejarse del mouse

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > canvas.height || this.y < 0) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
    }
}

// Crear partículas
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

// Función para dibujar líneas entre partículas cercanas
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(227, 227, 227, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Función para eliminar las partículas más antiguas cuando se excede el límite
function removeOldParticles() {
    if (particles.length > maxParticles) {
        // Elimina la primera partícula (más antigua) hasta que el número sea menor o igual al límite
        particles.splice(0, particles.length - maxParticles);
    }
}

// Evento para repeler partículas con el mousemove
canvas.addEventListener('mousemove', (event) => {
    if (!repelParticles) return;  // Si está deshabilitada la repulsión, no hacer nada
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    particles.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {  // Si la partícula está cerca del mouse
            const angle = Math.atan2(dy, dx);
            particle.vx = Math.cos(angle) * particleSpeed * 0.5;  // Repulsión
            particle.vy = Math.sin(angle) * particleSpeed * 0.5;
        }
    });
});

// Evento para crear partículas al hacer clic
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Crear tres nuevas partículas con pequeñas variaciones en la posición y velocidad
    for (let i = 0; i < 3; i++) {
        const newParticle = new Particle();
        newParticle.x = mouseX + (Math.random() - 0.5) * 10; // Variación en la posición
        newParticle.y = mouseY + (Math.random() - 0.5) * 10;
        newParticle.vx = (Math.random() - 0.5) * particleSpeed * .5; // Variación en la velocidad
        newParticle.vy = (Math.random() - 0.5) * particleSpeed * .5;
        particles.push(newParticle);
    }

    // Llamar a la función para eliminar partículas si se supera el límite
    removeOldParticles();
});

// Evento para deshabilitar la repulsión con el mouse cuando se hace clic
canvas.addEventListener('mousedown', () => {
    repelParticles = false;  // Deshabilitar repulsión
});

// Evento para habilitar la repulsión con el mouse cuando se suelta el clic
canvas.addEventListener('mouseup', () => {
    repelParticles = true;  // Habilitar repulsión
});

// Animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
}

// Ajustar el tamaño del canvas cuando se cambia el tamaño del contenedor
window.addEventListener('resize', resizeCanvas);

animate();

} // end mobile guard
