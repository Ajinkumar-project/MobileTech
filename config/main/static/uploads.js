function activepage(pageId, linkId) {
    let pages = document.querySelectorAll('.page');

    pages.forEach(function(p){
        p.classList.remove('active')
    })
    document.getElementById(pageId).classList.add('active');

    let links = document.querySelectorAll('.tab');
    links.forEach(link => link.classList.remove('activeTab'));
    document.getElementById(linkId).classList.add('activeTab');
}
const cursor = document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let x = mouseX;
let y = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
document.querySelectorAll("h1,h2,h3,p,a,button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("grow");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
    });
});

function animate() {
    x += (mouseX - x) * 0.15;
    y += (mouseY - y) * 0.15;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    requestAnimationFrame(animate);
}

animate();
