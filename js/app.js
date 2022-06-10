"use strict"
//Variables
const captchaValue = document.querySelector("span");
const inputCaptcha = document.querySelector('#inputCaptcha');
const btnRefresh = document.querySelector('#btn-refresh');
const btnSend = document.querySelector('#btn-send');
const respuesta = document.querySelector('.respuesta');
const mobileItem = document.querySelector('#mobile-item');
const mobileNav = document.querySelector('.hidden-mobile-nav')
const formPc = document.querySelector("#form-pc");
const btnFormPc = document.querySelector("#btnFormPC");
const procesadores = document.querySelector("#procesadores");
const tablaPc = document.querySelector("#tabla-pc");
const btnx3 = document.querySelector('#btnx3');
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");

let valoresAlmacenados = [];
const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'l', 'o', 'p', 'q', 'r', 'v', 'w', 'y', 'x', 'z',0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//Eventos
//Refresh captcha
document.addEventListener('DOMContentLoaded', iniciarApp);
function iniciarApp() {
  btnRefresh.addEventListener("click", generateCaptcha);
  //Enviar captcha
  btnSend.addEventListener("click", checkCaptcha);
  //Generar Captcha al cargar
  generateCaptcha();
}
//Funciones
//Captcha
function generateCaptcha() {
  captchaValue.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    let random = caracteres[Math.floor(Math.random() * caracteres.length)]
    captchaValue.innerHTML+= ` ${random}`
  }
};
function checkCaptcha(e) {
  e.preventDefault();
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
//Mostrar Nav
function showNav() {
  if (mobileNav.classList.contains('hidden-mobile-nav')) {
    mobileNav.classList.remove('hidden-mobile-nav')
    mobileNav.classList.add('show-mobile-nav')
  } else {
    mobileNav.classList.remove('show-mobile-nav')
    mobileNav.classList.add('hidden-mobile-nav')
  }
}
  //Mostrar Nav Mobile
  mobileItem.addEventListener("click", showNav);
//Tabla dinamica
let pc = {
  procesador: '',
  motherboard: '',
  gpu: '',
  precio: 500,
};
btnFormPc.addEventListener('click', e => {
  e.preventDefault()
  let formDataPc = new FormData(formPc);
  pc.procesador = formDataPc.get("procesador");
  pc.motherboard = formDataPc.get("motherboard");
  pc.gpu = formDataPc.get("gpu");
  let codigo = formDataPc.get("codigo");
  valoresAlmacenados.push(pc);
  agregarElementos(pc, codigo);
})
btnx3.addEventListener('click', e => {
  e.preventDefault()
  let formDataPc = new FormData(formPc);
  pc.procesador = formDataPc.get("procesador");
  pc.motherboard = formDataPc.get("motherboard");
  pc.gpu = formDataPc.get("gpu");
  let codigo = formDataPc.get("codigo");
  for (let i = 0; i < 3; i++) {
    valoresAlmacenados.push(pc);
    agregarElementos(pc,codigo);
  }
})
function agregarElementos(pc,codigo) {
  const tr = document.createElement('tr');
  if (codigo != '') {
    tr.innerHTML = `
  <td>${pc.procesador}</td>
  <td>${pc.motherboard}</td>
  <td>${pc.gpu}</td>
  <td>${pc.precio}</td>
  <td>15%</td>
  `;
    tr.classList.add('descuento');
  } else {
    tr.innerHTML = `
  <td>${pc.procesador}</td>
  <td>${pc.motherboard}</td>
  <td>${pc.gpu}</td>
  <td>${pc.precio}</td>
  <td>0%</td>
  `;
  }
  tablaPc.appendChild(tr)
}
btnBorrarTodo.addEventListener('click', e => {
  e.preventDefault();
  valoresAlmacenados = [];
  borrarHTML()
})
function borrarHTML() {
  while (tablaPc.firstChild) {
    tablaPc.removeChild(tablaPc.firstChild);
}
}