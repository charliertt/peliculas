document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación completa

            const targetHref = link.getAttribute('href'); // Obtén el href del enlace

            if (targetHref && targetHref !== '#') {
                loadContent(targetHref); // Carga el contenido
            }
        });
    });
});


$(document).ready(function () {
    // Inicializar Parsley en el formulario
    $('#registroForm').parsley();
       $('#loginForm').parsley();

    // Configurar Parsley para que no cierre el modal si falla la validación
    $('#registroForm').parsley().on('form:submit', function () {
        // Si la validación es exitosa, muestra SweetAlert
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Todos los campos son válidos.',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
        }).then(() => {
            // Redirigir a otra página o realizar alguna acción
            window.location.href = "single.html";
        });

        return false; // Evita que el formulario se envíe
    });

    $('#loginForm').parsley().on('form:submit', function () {
        // Si la validación es exitosa, muestra SweetAlert para el login
        Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Has iniciado sesión correctamente.',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
        }).then(() => {
            // Redirigir a otra página (por ejemplo, al dashboard)
            window.location.href = "single.html";
        });

        return false; // Evita que el formulario se envíe
    });



   var modalRegistro = new bootstrap.Modal(document.getElementById('modal_registro'), {
        backdrop: 'static',
        keyboard: false
    });

    var modalLogin = new bootstrap.Modal(document.getElementById('modal_login'), {
        backdrop: 'static',
        keyboard: false
    });
});



function mostrarVistaPrevia(event) {
    const archivo = event.target.files[0]; 
    const vistaPrevia = document.getElementById("vistaPrevia"); 
    const vistaPrevia2 = document.getElementById("vistaPrevia2"); 

    // Si hay un archivo, creamos un objeto URL para mostrarlo
    if (archivo) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            vistaPrevia.src = e.target.result; 
            vistaPrevia.style.display = 'block';
            vistaPrevia2.src = e.target.result; 
            vistaPrevia2.style.display = 'block';
        }

        reader.readAsDataURL(archivo); 
    } else {
        vistaPrevia.style.display = 'none'; 
        vistaPrevia2.style.display = 'none'; 
    }
}




function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data; // Inserta el contenido en un contenedor

            if($('#example').length){
                $('#example').DataTable();
            }
            
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}


