const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let comets = [];

// Создаём звёзды
function createStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2
        });
    }
}

// Создаём комету
function createComet() {
    comets.push({
        x: -100,
        y: Math.random() * canvas.height * 0.3,  // Верхняя часть экрана
        speedX: Math.random() * 4 + 2,  // Скорость по X
        speedY: Math.random() * 1.5 + 0.5, // Скорость по Y
        length: Math.random() * 150 + 100,  // Длина кометы
        opacity: 1
    });
}

// Рисуем звёзды
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Двигаем звёзды вниз
function moveStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
    });
}

// Рисуем кометы
function drawComets() {
    comets.forEach(comet => {
        ctx.beginPath();
        let gradient = ctx.createLinearGradient(
            comet.x, comet.y, comet.x - comet.length, comet.y - comet.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.length, comet.y - comet.length);
        ctx.stroke();

        // Движение кометы
        comet.x += comet.speedX;
        comet.y += comet.speedY;
        comet.opacity -= 0.005;

        // Удаляем комету, если она исчезла
        if (comet.x > canvas.width || comet.opacity <= 0) {
            comets.splice(comets.indexOf(comet), 1);
        }
    });
}

// Основная анимация
function animate() {
    drawStars();
    drawComets();
    moveStars();
    requestAnimationFrame(animate);
}

// Запускаем всё
createStars();
setInterval(createComet, 1000);  // Раз в 1 секунду
animate();

// Обновляем размеры экрана при изменении окна
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    createStars();
});
