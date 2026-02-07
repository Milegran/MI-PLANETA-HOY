// ===================================
// CICLOS - FUNCIONALIDAD DEL MENÚ
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener todos los botones del menú de ciclos
    const ciclosMenuLinks = document.querySelectorAll('.ciclos-menu-link');
    const ciclosContent = document.querySelectorAll('.ciclos-content');
    const ciclosSubmenuItems = document.querySelectorAll('.ciclos-submenu a');
    const ciclosDropdownBtn = document.querySelector('.ciclos-dropdown-btn');
    const hasSubmenuItem = document.querySelector('.ciclos-menu-item.has-submenu');

    /**
     * Función para mostrar el contenido de un ciclo
     * @param {string} cicloId - El ID del ciclo a mostrar
     */
    function showCiclo(cicloId) {
        // Ocultar todos los contenidos
        ciclosContent.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remover clase active de todos los botones
        ciclosMenuLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar el contenido seleccionado
        const selectedContent = document.getElementById(cicloId);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Marcar el botón como activo
        const activeButton = document.querySelector(`[data-ciclo="${cicloId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    /**
     * Event listeners para los botones del menú
     */
    ciclosMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es un botón desplegable, no mostrar contenido
            if (this.classList.contains('ciclos-dropdown-btn')) {
                // Simplemente permitir que se abra el submenu
                return;
            }
            
            e.preventDefault();
            const cicloId = this.getAttribute('data-ciclo');
            if (cicloId) {
                showCiclo(cicloId);
            }
        });
    });

    /**
     * Event listeners para los items del submenu de carbono
     */
    ciclosSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const cicloId = this.getAttribute('data-ciclo');
            if (cicloId) {
                showCiclo(cicloId);
                
                // Cerrar el submenu después de seleccionar (en mobile)
                if (window.innerWidth < 768 && hasSubmenuItem) {
                    hasSubmenuItem.classList.remove('active');
                }
            }
        });
    });

    /**
     * Manejar el clic en el botón desplegable del carbono en móvil
     */
    if (ciclosDropdownBtn) {
        ciclosDropdownBtn.addEventListener('click', function(e) {
            // En desktop, solo permitir el hover
            // En mobile, toggle la clase active para mostrar/ocultar submenu
            if (window.innerWidth < 768) {
                e.preventDefault();
                hasSubmenuItem.classList.toggle('active');
            }
        });
    }

    /**
     * Cerrar el submenu cuando se hace clic fuera en mobile
     */
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            // Si no es un clic dentro del menú de ciclos
            if (!e.target.closest('.ciclos-menu-item.has-submenu')) {
                if (hasSubmenuItem) {
                    hasSubmenuItem.classList.remove('active');
                }
            }
        }
    });

    /**
     * Mostrar la página principal por defecto
     */
    showCiclo('principal');

    /**
     * Manejar cambios de ventana para mobile/desktop
     */
    window.addEventListener('resize', function() {
        // Si vuelve a desktop, remover clase active del submenu
        if (window.innerWidth >= 768) {
            if (hasSubmenuItem) {
                hasSubmenuItem.classList.remove('active');
            }
        }
    });
});
