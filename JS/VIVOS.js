/**
 * vivos.js - Funcionalidades para la página de Seres Vivos
 * MODIFICADO para incluir Fauna Marina y Flora Marina
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vivoCards = document.querySelectorAll('.vivo-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Inicializar contador de tarjetas visibles
    let visibleCards = 8; // Mostrar 8 inicialmente
    const cardsPerLoad = 4;
    
    // ============================================
    // FUNCIONALIDAD DE FILTRADO - MODIFICADA
    // ============================================
    
    // Aplicar filtro al hacer clic en los botones
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro seleccionado
            const filterValue = this.getAttribute('data-filter');
            
            // Aplicar filtro a las tarjetas
            applyFilter(filterValue);
            
            // Resetear contador de tarjetas visibles
            visibleCards = 8;
            updateCardVisibility();
            
            // Scroll suave hacia las tarjetas
            document.querySelector('.vivos-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Función para aplicar filtro - MODIFICADA
    function applyFilter(filter) {
        vivoCards.forEach(card => {
            // Mostrar todas las tarjetas si el filtro es "all"
            if (filter === 'all') {
                card.style.display = 'flex';
                return;
            }
            
            // Obtener las categorías de la tarjeta
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            // Lógica especial para fauna y flora marina
            if (filter === 'fauna-marina') {
                // Mostrar solo fauna marina
                if (cardCategories.includes('fauna-marina')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else if (filter === 'flora-marina') {
                // Mostrar solo flora marina
                if (cardCategories.includes('flora-marina')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else if (filter === 'fauna') {
                // Mostrar solo fauna terrestre (excluyendo marina)
                if (cardCategories.includes('fauna') && !cardCategories.includes('fauna-marina')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else if (filter === 'flora') {
                // Mostrar solo flora terrestre (excluyendo marina)
                if (cardCategories.includes('flora') && !cardCategories.includes('flora-marina')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            } else {
                // Para otros filtros (endemicos, peligro)
                if (cardCategories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // ============================================
    // FUNCIONALIDAD DE "CARGAR MÁS"
    // ============================================
    
    // Inicializar visibilidad de tarjetas
    updateCardVisibility();
    
    // Evento para el botón "Cargar más"
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Incrementar contador de tarjetas visibles
            visibleCards += cardsPerLoad;
            
            // Actualizar visibilidad
            updateCardVisibility();
            
            // Ocultar botón si no hay más tarjetas para mostrar
            const totalVisibleCards = Array.from(vivoCards).filter(card => 
                card.style.display !== 'none'
            ).length;
            
            if (visibleCards >= totalVisibleCards) {
                loadMoreBtn.style.display = 'none';
                // Cambiar texto del botón
                loadMoreBtn.innerHTML = '<span>Todas las especies cargadas</span><i class="fas fa-check"></i>';
            }
            
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
    
    // Función para actualizar visibilidad de tarjetas
    function updateCardVisibility() {
        // Obtener tarjetas visibles según el filtro actual
        const visibleFilteredCards = Array.from(vivoCards).filter(card => 
            card.style.display !== 'none'
        );
        
        // Mostrar/ocultar tarjetas según el contador
        visibleFilteredCards.forEach((card, index) => {
            if (index < visibleCards) {
                card.style.display = 'flex';
                // Animación de entrada
                card.style.animation = 'cardEnter 0.6s ease-out backwards';
                card.style.animationDelay = `${Math.min(index * 0.1, 1.0)}s`;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Ocultar botón si no hay más tarjetas para mostrar
        if (visibleCards >= visibleFilteredCards.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
            loadMoreBtn.innerHTML = '<span>Todas las especies cargadas</span><i class="fas fa-check"></i>';
        } else if (loadMoreBtn) {
            loadMoreBtn.style.display = 'flex';
            loadMoreBtn.innerHTML = '<span>Ver más especies</span><i class="fas fa-chevron-down"></i>';
        }
    }
    
    // ============================================
    // ANIMACIONES ADICIONALES
    // ============================================
    
    // Añadir efecto de hover a las tarjetas
    vivoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir efecto sutil de elevación
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(76, 175, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaurar posición original
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Click en tarjeta
        card.addEventListener('click', function(e) {
            // No hacer nada si se hace clic en un enlace
            if (!e.target.closest('.vivo-link')) {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // ============================================
    // EFECTO DE SCROLL SUAVE
    // ============================================
    
    // Seleccionar todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si el enlace es solo "#", no hacer nada
            if (this.getAttribute('href') === '#') return;
            
            // Prevenir comportamiento por defecto
            e.preventDefault();
            
            // Obtener el destino
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Si existe el elemento, hacer scroll suave
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMACIÓN DE ENTRADA PARA ELEMENTOS
    // ============================================
    
    // Configurar Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Efecto de aparición
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas
    vivoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // ============================================
    // INTERACTIVIDAD PARA BOTONES DE ACCIÓN
    // ============================================
    
    // Botones de CTA
    const ctaButtons = document.querySelectorAll('.action-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Si es un enlace interno, ya manejado arriba
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                return;
            }
            
            // Efecto visual al hacer clic
            this.style.transform = 'scale(0.95)';
            
            // Restaurar después de 150ms
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Mostrar mensaje de acción
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Crear mensaje temporal
                const message = document.createElement('div');
                message.className = 'action-message';
                message.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>¡Acción registrada! Pronto te contactaremos.</span>
                `;
                message.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #4CAF50, #2E7D32);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s forwards;
                `;
                
                document.body.appendChild(message);
                
                // Eliminar mensaje después de 3 segundos
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 3000);
            }
        });
    });
    
    // ============================================
    // FILTRO ACTIVO POR DEFECTO
    // ============================================
    
    // Activar filtro "Todos" por defecto
    const defaultFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.click();
    }
    
    // ============================================
    // ESTILOS DINÁMICOS
    // ============================================
    
    // Añadir estilos para la animación del mensaje
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .action-message i {
            font-size: 1.5rem;
        }
        
        .vivo-card.expanded {
            transform: scale(1.05) !important;
            z-index: 10;
        }
        
        /* Animación para filtros activos */
        .filter-btn.active {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
            100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // CONTADOR DE ESPECIES
    // ============================================
    
    // Actualizar contador de especies visibles
    function updateSpeciesCounter() {
        const visibleCount = Array.from(vivoCards).filter(card => 
            card.style.display !== 'none' && card.style.display !== 'none'
        ).length;
        
        // Crear o actualizar contador
        let counter = document.querySelector('.species-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'species-counter';
            counter.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 0.9rem;
                z-index: 100;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
            `;
            document.body.appendChild(counter);
        }
        
        counter.textContent = `${visibleCount} especies mostradas`;
    }
    
    // Observar cambios en la visibilidad de tarjetas
    const visibilityObserver = new MutationObserver(updateSpeciesCounter);
    vivoCards.forEach(card => {
        visibilityObserver.observe(card, { 
            attributes: true, 
            attributeFilter: ['style'] 
        });
    });
    
    // Inicializar contador
    setTimeout(updateSpeciesCounter, 100);
});