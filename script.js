document.addEventListener('DOMContentLoaded', () => {

    //-------------------------------------
    // LÓGICA DO BOTÃO DE TEMA (DIA/NOITE)
    //-------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema salvo
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    };

    // Adiciona o evento de clique ao botão
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Salva a preferência do usuário no localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Aplica o tema salvo quando a página carrega
    applySavedTheme();


    //---------------------------------------------------
    // LÓGICA DO MENU DE NAVEGAÇÃO ATIVO (SCROLL)
    //---------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const changeNavOnScroll = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Verifica se a seção está visível na tela (com uma margem)
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Adiciona a classe 'active' ao link correspondente à seção atual
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // Adiciona o evento de scroll na janela
    window.addEventListener('scroll', changeNavOnScroll);

});
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const intervalTime = 4000; // tempo que cada slide fica visível
let interval;

function startAutoplay() {
    interval = setInterval(() => showSlide(index + 1), intervalTime);
}

// mostra slide e faz loop contínuo
function showSlide(i) {
    slides.style.transition = "transform 0.5s";
    index = i;
    slides.style.transform = `translateX(${-index * 100}%)`;

    // se for a cópia da primeira imagem
    if (index === images.length - 1) {
        // espera o tempo normal + transição
        setTimeout(() => {
            slides.style.transition = "none"; // remove animação
            index = 0;
            slides.style.transform = `translateX(${-index * 100}%)`;
        }, intervalTime); // igual ao tempo de exibição das outras imagens
    }
}

prevBtn.addEventListener("click", () => {
    clearInterval(interval); // parar autoplay ao clicar
    if (index === 0) {
        slides.style.transition = "none";
        index = images.length - 1;
        slides.style.transform = `translateX(${-index * 100}%)`;
        setTimeout(() => showSlide(index - 1), 20);
    } else {
        showSlide(index - 1);
    }
    startAutoplay(); // reinicia autoplay
});

nextBtn.addEventListener("click", () => {
    clearInterval(interval);
    showSlide(index + 1);
    startAutoplay();
});

// iniciar autoplay
startAutoplay();
