// Contador regressivo
function atualizarContador() {
    const dataLancamento = new Date("2025-08-08T00:00:00");
    const agora = new Date();
    const diferenca = dataLancamento - agora;

    if (diferenca <= 0) {
        document.getElementById("contador").innerText = "LANÇADO!";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    document.getElementById("contador").innerText =
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Inicializar contador
setInterval(atualizarContador, 1000);
atualizarContador();

// Carrossel de imagens
let slideAtual = 0;
const slides = document.querySelectorAll('.carrossel-container');

function mostrarSlide(n) {
    // Esconder todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Calcular índice do slide
    slideAtual = (n + slides.length) % slides.length;
    
    // Mostrar slide atual
    slides[slideAtual].classList.add('active');
}

function moverCarrossel(direcao) {
    mostrarSlide(slideAtual + direcao);
}

// Auto-play do carrossel
function autoPlay() {
    moverCarrossel(1);
}

// Inicializar carrossel
function inicializarCarrossel() {
    if (slides.length > 0) {
        mostrarSlide(0);
        // Auto-play a cada 5 segundos
        setInterval(autoPlay, 5000);
    }
}

// Função para adicionar efeitos de scroll suave
function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar animações de entrada
function animacoesEntrada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observar todas as seções
    const secoes = document.querySelectorAll('section');
    secoes.forEach(secao => {
        secao.style.opacity = '0';
        secao.style.transform = 'translateY(50px)';
        secao.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(secao);
    });
}

// Função para adicionar efeito parallax no hero
function efeitoParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Função para adicionar contador de caracteres animado
function animarContador() {
    const contador = document.getElementById('contador');
    if (contador) {
        contador.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        contador.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Função para adicionar efeito de digitação no título
function efeitoDigitacao() {
    const titulo = document.querySelector('.hero-content h2');
    if (titulo) {
        const texto = titulo.textContent;
        titulo.textContent = '';
        titulo.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < texto.length) {
                titulo.textContent += texto.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                titulo.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Função para adicionar validação de formulário (se houver)
function validarFormulario() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar validação específica
            alert('Formulário enviado com sucesso!');
        });
    });
}

// Função para adicionar modo escuro (opcional)
function toggleModoEscuro() {
    const body = document.body;
    const botaoModo = document.createElement('button');
    botaoModo.textContent = '🌙';
    botaoModo.className = 'modo-escuro-btn';
    botaoModo.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: #1e3c72;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(botaoModo);
    
    botaoModo.addEventListener('click', () => {
        body.classList.toggle('modo-escuro');
        botaoModo.textContent = body.classList.contains('modo-escuro') ? '☀️' : '🌙';
    });
}

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrossel();
    scrollSuave();
    animacoesEntrada();
    efeitoParallax();
    animarContador();
    efeitoDigitacao();
    validarFormulario();
    toggleModoEscuro();
    
    // Adicionar CSS para modo escuro
    const estiloModoEscuro = document.createElement('style');
    estiloModoEscuro.textContent = `
        .modo-escuro {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
            color: #fff !important;
        }
        
        .modo-escuro .sobre,
        .modo-escuro .fusca-aviao,
        .modo-escuro .galeria {
            background: rgba(255,255,255,0.1) !important;
            color: #fff !important;
        }
        
        .modo-escuro section h2 {
            color: #fff !important;
        }
        
        .modo-escuro .legenda {
            color: #ccc !important;
        }
    `;
    document.head.appendChild(estiloModoEscuro);
});

// Função para adicionar notificação de cookies (opcional)
function notificacaoCookies() {
    if (!localStorage.getItem('cookiesAceitos')) {
        const notificacao = document.createElement('div');
        notificacao.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: #1e3c72;
                color: white;
                padding: 1rem;
                border-radius: 10px;
                z-index: 1000;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span>Este site usa cookies para melhorar sua experiência.</span>
                <button onclick="aceitarCookies()" style="
                    background: white;
                    color: #1e3c72;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Aceitar</button>
            </div>
        `;
        document.body.appendChild(notificacao);
    }
}

function aceitarCookies() {
    localStorage.setItem('cookiesAceitos', 'true');
    document.querySelector('[style*="position: fixed"]').remove();
}

// Inicializar notificação de cookies
setTimeout(notificacaoCookies, 2000);
