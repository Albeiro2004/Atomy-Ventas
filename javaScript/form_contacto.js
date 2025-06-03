    function iniform() {
            const form = document.getElementById('formulario-contacto');
            const submitBtn = form.querySelector('.btn-submit');
            const spinner = submitBtn.querySelector('.spinner-border');
            const btnText = submitBtn.querySelector('.btn-text');
            const successMessage = document.getElementById('successMessage');
            const mensajeTextarea = document.getElementById('mensaje');
            const charCount = document.getElementById('charCount');

            // Contador de caracteres
            mensajeTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                charCount.textContent = currentLength;
                
                if (currentLength > 450) {
                    charCount.style.color = '#dc3545';
                } else if (currentLength > 400) {
                    charCount.style.color = '#ffc107';
                } else {
                    charCount.style.color = '#6c757d';
                }
            });

            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', validateField);
                input.addEventListener('input', function() {
                    if (this.classList.contains('is-invalid')) {
                        validateField.call(this);
                    }
                });
            });

            function validateField() {
                const field = this;
                let isValid = true;

                // Limpiar estados previos
                field.classList.remove('is-valid', 'is-invalid');

                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                } else if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(field.value);
                }

                // Aplicar clase de validación
                field.classList.add(isValid ? 'is-valid' : 'is-invalid');
                
                return isValid;
            }

            // Manejo del envío del formulario
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Validar todos los campos
                let formIsValid = true;
                inputs.forEach(input => {
                    if (!validateField.call(input)) {
                        formIsValid = false;
                    }
                });

                if (!formIsValid) {
                    return;
                }

                // Mostrar estado de carga
                submitBtn.disabled = true;
                btnText.style.opacity = '0.7';
                spinner.style.display = 'inline-block';

                // Simular envío (aquí conectarías con tu backend)
                try {
                    await simulateFormSubmission();
                    
                    // Mostrar mensaje de éxito
                    successMessage.style.display = 'block';
                    form.style.display = 'none';
                    
                    // Opcional: reiniciar formulario después de unos segundos
                    setTimeout(() => {
                        form.reset();
                        inputs.forEach(input => {
                            input.classList.remove('is-valid', 'is-invalid');
                        });
                        charCount.textContent = '0';
                        successMessage.style.display = 'none';
                        form.style.display = 'block';
                    }, 5000);
                    
                } catch (error) {
                    alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
                } finally {
                    // Restaurar estado del botón
                    submitBtn.disabled = false;
                    btnText.style.opacity = '1';
                    spinner.style.display = 'none';
                }
            });

            // Función para simular el envío del formulario
            function simulateFormSubmission() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });
            }
    }