// Array con las rutas de las imágenes
const images = [
    "gyozas1.jpg",
    "gyozas2.jpg", 
    "gyozas3.jpg"
];

let currentImageIndex = 0;
const imgElement = document.getElementById('gyozaImage');
const currentImageSpan = document.getElementById('currentImage');
const totalImagesSpan = document.getElementById('totalImages');
const dots = document.getElementsByClassName('dot');

// Actualizar el total de imágenes
totalImagesSpan.textContent = images.length;

// Función para cambiar la imagen
function changeImage(direction) {
    currentImageIndex += direction;
    
    // Si llegamos al final, volvemos al principio
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    // Si llegamos al principio y vamos hacia atrás, vamos al final
    else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    // Cambiamos la imagen
    imgElement.src = images[currentImageIndex];
    imgElement.classList.remove('fade');
    void imgElement.offsetWidth; // Trigger reflow
    imgElement.classList.add('fade');
    
    // Actualizar contador
    currentImageSpan.textContent = currentImageIndex + 1;
    
    // Actualizar indicadores
    updateDots();
}

// Función para ir a una imagen específica
function currentSlide(n) {
    currentImageIndex = n - 1;
    changeImage(0);
}

// Función para actualizar los indicadores
function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[currentImageIndex].className += " active";
}

// Función para compartir la página
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Gyozas - Delicias Asiáticas',
            text: '¡Descubre todo sobre las deliciosas gyozas!',
            url: window.location.href
        })
        .catch(console.error);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        alert('¡Copia esta URL para compartir: ' + window.location.href);
    }
}

// Autoplay del carrusel
let slideInterval;

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeImage(1);
    }, 5000); // Cambia cada 5 segundos
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Iniciar el autoplay cuando cargue la página
window.addEventListener('load', function() {
    startAutoSlide();
    
    // Pausar autoplay cuando el usuario interactúa
    const gallery = document.querySelector('.gallery-container');
    gallery.addEventListener('mouseenter', stopAutoSlide);
    gallery.addEventListener('mouseleave', startAutoSlide);
});

// Actualizar el contador inicial
currentImageSpan.textContent = currentImageIndex + 1;
