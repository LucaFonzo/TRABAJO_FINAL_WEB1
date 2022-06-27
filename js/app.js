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
const URL_API ="https://62b5b66042c6473c4b38869b.mockapi.io/tablaWeb1/datosTabla";
let  id = 0;
let valoresAlmacenados = [];
const caracteres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'l', 'o', 'p', 'q', 'r', 'v', 'w', 'y', 'x', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
document.addEventListener('DOMContentLoaded', iniciarApp);
function iniciarApp() {
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
  let procesador = formDataPc.get("procesador");
  let motherboard = formDataPc.get("motherboard");
  let gpu = formDataPc.get("gpu");
  let codigo = formDataPc.get("codigo");
  valoresAlmacenados.push(pc);
  enviarDatos(procesador,motherboard,gpu,codigo)
})
btnx3.addEventListener('click', e => {
  e.preventDefault()
  let formDataPc = new FormData(formPc);
  let procesador = formDataPc.get("procesador");
  let motherboard = formDataPc.get("motherboard");
  let gpu = formDataPc.get("gpu");
  let codigo = formDataPc.get("codigo");
  for (let i = 0; i < 3; i++) {
    valoresAlmacenados.push(pc);
    enviarDatos(procesador, motherboard, gpu, codigo);
  }
})
function agregarElementos(datos) {
  const tr = document.createElement('tr');
  if (datos.descuento != '') {
    tr.innerHTML = `
  <td>${datos.procesador}</td>
  <td>${datos.motherboard}</td>
  <td>${datos.gpu}</td>
  <td>${datos.precioTotal}</td>
  <td>15%</td>
  <td><button class="btn-borrar"><i class="fa-solid fa-trash-can"></i></button><button class="btn-editar"><i class="fa-solid fa-pen-to-square"></i></button></td>
  `;
    tr.classList.add('descuento');
  } else {
    tr.innerHTML = `
  <td>${datos.procesador}</td>
  <td>${datos.motherboard}</td>
  <td>${datos.gpu}</td>
  <td>${datos.precioTotal}</td>
  <td>0% </td>
  <td><button class="btn-borrar"><i class="fa-solid fa-trash-can"></i></button><button class="btn-editar"><i class="fa-solid fa-pen-to-square"></i></button></td>
  `;
  }
  tablaPc.appendChild(tr)
}
btnBorrarTodo.addEventListener('click', e => {
  e.preventDefault();
  borrarDatos()
})
function borrarHTML() {
  while (tablaPc.firstChild) {
    tablaPc.removeChild(tablaPc.firstChild);
}
}
async function obtenerDatos() {
  try {
    let response = await fetch(URL_API); //GET URL_API
    let json = await response.json(); // texto json a objeto
    for (const datos of json) {
      agregarElementos(datos)
      id = datos.id
    }
  } catch (error) {
    console.log(error)
  }
}
obtenerDatos()
async function enviarDatos(procesador, mother, gpu, descuento) {
  let pc = {
    procesador: procesador,
    motherboard: mother,
    gpu: gpu,
    precioTotal: 500,
    descuento: descuento
  }
  try {
    let response = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pc)
    });
    if (response.status === 201) {
      agregarElementos(pc)
    }
  } catch (error) {
    console.log(error)
  }
}
async function modificarDatos(procesador, mother, gpu, descuento) {
  let pc = {
    procesador: procesador,
    motherboard: mother,
    gpu: gpu,
    precioTotal: 500,
    descuento: descuento,
  };
  try {
    let response = await fetch(URL_API, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pc),
    });
    if (response.status === 200) {
      agregarElementos(pc);
    }
  } catch (error) {
    console.log(error);
  }
}
async function borrarDatos() {
    try {
      let response = await fetch(`${URL_API} + ${pc.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        
      }
    } catch (error) {
      console.log(error);
    }
}