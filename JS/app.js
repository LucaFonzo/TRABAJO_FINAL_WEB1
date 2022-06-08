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

const valoresTabla = [];
const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'l', 'o', 'p', 'q', 'r', 'v', 'w', 'y', 'x', 'z',0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//Eventos
function iniciarApp() {
  //Refresh captcha
  btnRefresh.addEventListener("click", generateCaptcha);
  //Enviar captcha
  btnSend.addEventListener("click", checkCaptcha);
  //Generar Captcha al cargar
  generateCaptcha();
}
//Funciones
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
btnFormPc.addEventListener('click', (e) => {
  e.preventDefault()
  let formDataPc = new FormData(formPc);
  let procesador = formDataPc.get("procesador");
  let motherboard = formDataPc.get("motherboard");
  let gpu = formDataPc.get("gpu");
  let ram1 = formDataPc.get("ram1");
  let ram2 = formDataPc.get("ram2");
  let gabinete = formDataPc.get("gabinete");
  let pc = {
    procesador: procesador,
    motherboard: motherboard,
    gpu: gpu,
    slot1: ram1,
    slot2: ram2,
    gabinete: gabinete,
    precio: 500,
  };
  valoresTabla.push(pc);
  agregarElementos(pc);
})
btnx3.addEventListener('click', (e) => {
  e.preventDefault()
  let formDataPc = new FormData(formPc);
  let procesador = formDataPc.get("procesador");
  let motherboard = formDataPc.get("motherboard");
  let gpu = formDataPc.get("gpu");
  let ram1 = formDataPc.get("ram1");
  let ram2 = formDataPc.get("ram2");
  let gabinete = formDataPc.get("gabinete");
  let pc = {
    procesador: procesador,
    motherboard: motherboard,
    gpu: gpu,
    slot1: ram1,
    slot2: ram2,
    gabinete: gabinete,
    precio: 500,
  };
  console.log(valoresTabla)
  for (let i = 0; i <= 3; i++) {
    valoresTabla.push(pc);
    agregarElementos(pc);
  }
  e.preventDefault()
})
function agregarElementos(pc) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
  <td>
  ${pc.procesador}
  </td>
  <td>
  ${pc.motherboard}
  </td>
  <td>
  ${pc.gpu}
  </td>
  <td>
  ${pc.slot1}
  </td>
  <td>
  ${pc.slot2}
  </td>
  <td>
  ${pc.gabinete}
  </td>
  <td>
  ${pc.precio}
  </td>
  `;
  tablaPc.appendChild(tr)
}
btnBorrarTodo.addEventListener('click', e => {
  e.preventDefault();
  borrarHTML()
})
function borrarHTML() {
  while (tablaPc.firstChild) {
    tablaPc.removeChild(tablaPc.firstChild);
}
}