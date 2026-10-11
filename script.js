document.addEventListener("DOMContentLoaded", () => {

    /* 
       1. MENÚ RESPONSIVO*/

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
            });
        });
    }


    /* 
       2. FALLBACK PARA LA FOTO DE PERFIL
        */

    const profilePhoto = document.getElementById("profile-photo");
    const photoFallback = document.getElementById("photo-fallback");

    if (profilePhoto && photoFallback) {
        profilePhoto.addEventListener("error", () => {
            profilePhoto.style.display = "none";
            photoFallback.style.display = "grid";
        });

        if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
            profilePhoto.style.display = "none";
            photoFallback.style.display = "grid";
        }
    }


    /* 
       3. ANIMACIÓN DE ENTRADA AL HACER SCROLL
       */

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }


    /* 
       4. AÑO AUTOMÁTICO EN EL FOOTER
       = */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /*
       5. FORMULARIO DEMOSTRATIVO
        */

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = "Completa todos los campos.";
                return;
            }

            formStatus.textContent =
                `Gracias, ${name}. El formulario está listo para conectarse a un servicio de correo.`;

            contactForm.reset();
        });
    }

});
