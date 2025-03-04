const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('#sidebar');
const submenus = document.querySelectorAll('.sidebar-link');

// Estado para verificar si el menú principal está expandido
let isSidebarExpanded = false;

// Función para abrir o cerrar el sidebar
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('expand');
    isSidebarExpanded = !isSidebarExpanded; // Cambiar el estado de expansión

    if (isSidebarExpanded) {
        // Restaurar atributos de los submenús al abrir el menú principal
        submenus.forEach(link => {
            link.setAttribute('data-bs-toggle', 'collapse'); // Permitir la funcionalidad de colapsar
            link.setAttribute('aria-expanded', 'false'); // Asegurar que todos los submenús estén cerrados inicialmente
            const target = link.getAttribute('data-bs-target');
            if (target) {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    targetElement.classList.remove('show'); // Cerrar el contenido colapsado
                }
            }
        });
    } else {
        // Cuando la barra lateral está cerrada, eliminar los atributos para evitar interacción
        submenus.forEach(link => {
            link.removeAttribute('data-bs-toggle');
            link.setAttribute('aria-expanded', 'false');

            const target = link.getAttribute('data-bs-target');
            if (target) {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    targetElement.classList.remove('show'); // Cerrar el contenido colapsado
                }
            }
        });
    }
});

// Función para gestionar la apertura de un submenú específico
submenus.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!isSidebarExpanded) {
            // Si el menú no está expandido, expandirlo
            sidebar.classList.add('expand');
            isSidebarExpanded = true;

            // Restaurar atributos de colapso para todos los submenús
            submenus.forEach(menu => {
                menu.setAttribute('data-bs-toggle', 'collapse');
                menu.setAttribute('aria-expanded', 'false'); // Cerrar los submenús inicialmente
            });

            // Permitir que el submenú actual se despliegue después de expandir la barra lateral
            setTimeout(() => {
                link.setAttribute('data-bs-toggle', 'collapse');
            }, 300); // Tiempo de espera para que la barra lateral termine de expandirse
        }

        // Asegurar que todos los demás submenús estén cerrados
        submenus.forEach(otherLink => {
            if (otherLink !== link) {
                otherLink.setAttribute('aria-expanded', 'false');
                const target = otherLink.getAttribute('data-bs-target');
                if (target) {
                    const targetElement = document.querySelector(target);
                    if (targetElement) {
                        targetElement.classList.remove('show');
                    }
                }
            }
        });
    });
});


document.getElementById('inicioLink').addEventListener('click', function (event) {
    event.preventDefault();
  
    if (window.location.pathname !== 'Dashboard.html') {
      
        document.body.style.transition = 'transform 0.3s ease-out'; 
        document.body.style.transform = 'translateX(-100%)'; 

        
        setTimeout(function() {
            window.location.href = 'Dashboard.html'; 
        }, 300); 
    } else {
        
        console.log("Ya estás en la página de inicio.");
    }
});


// Código existente...

// Manejar el clic en el enlace de logout
document.querySelector('.sidebar-footer a[href="Login.html"]').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    window.location.href = 'Login.html'; // Redirige a la página de login
});



