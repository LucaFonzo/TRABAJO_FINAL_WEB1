"use strict"
//Variables
const captchaValue = document.querySelector("span");
const inputCaptcha = document.querySelector('#inputCaptcha');
const btnRefresh = document.querySelector('#btn-refresh');
const btnSend = document.querySelector('#btn-send');
const respuesta = document.querySelector('.respuesta');

const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'l', 'o', 'p', 'q', 'r', 'v', 'w', 'y', 'x', 'z',0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//Funciones
function generateCaptcha() {
  captchaValue.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    let random = caracteres[Math.floor(Math.random() * caracteres.length)]
    captchaValue.innerHTML+= ` ${random}`
  }
};
generateCaptcha();
btnRefresh.addEventListener('click', generateCaptcha);
function checkCaptcha() {
  let inputVal = inputCaptcha.value.split('').join(' ');
  if (inputVal == captchaValue.innerHTML.trimStart()) {
    respuesta.classList.remove('respuesta-incorrecta');
    respuesta.classList.add('respuesta-correcta');
    respuesta.innerHTML = "Enviado Correctamente";
    inputCaptcha.value = "";
    generateCaptcha();
  } else if (inputVal == '') {
    respuesta.classList.remove("respuesta-correcta");
    respuesta.classList.add("respuesta-incorrecta");
    respuesta.innerHTML = "Debe ingresar el captcha para enviar el formulario";
    generateCaptcha();
  }
  else {
    respuesta.classList.remove('respuesta-correcta');
    respuesta.classList.add("respuesta-incorrecta");
    respuesta.innerHTML = "Incorrecto ingrese el captcha nuevamente";
    inputCaptcha.value = "";
    generateCaptcha();
  }
}
btnSend.addEventListener('click', checkCaptcha);
