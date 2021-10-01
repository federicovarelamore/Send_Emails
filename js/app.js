// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos del form
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners (){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}




// Funciones
function iniciarApp(){
    // deshabilitar el envio
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e){

    if(e.target.value.length > 0 ){

        // Elimina el alerta de error
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500', 'font-bold');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500', 'font-bold' );
        mostrarError('Todos los campos son obligatorios');
    }

    
    if(e.target.type === 'email'){

        if(er.test(e.target.value)){
             // Elimina el alerta de error
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500', 'font-bold');
        }else{
            e.target.classList.remove('border', 'border-green-500', 'font-bold');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        iniciarApp();
    }

}


function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'text-red-500', 'p-3', 'mt-5' , 'text-center','font-bold', 'uppercase', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de 3 segundos se oculta el spinner y se muestra el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';
        
        // Mensaje de se envió correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('bg-green-500', 'uppercase','text-center','font-bold','text-white','my-10','p-3');

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Elimina el mensaje de aviso
            resetearFormulario();
        }, 1500);

    }, 3000);
}


function resetearFormulario(){
    formulario.reset();

    iniciarApp();
    email.classList.remove('border', 'border-green-500');
    mensaje.classList.remove('border','border-green-500');
    asunto.classList.remove('border', 'border-green-500');

}
