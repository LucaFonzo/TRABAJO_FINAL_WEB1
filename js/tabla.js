"use strict"
//Variables
const formPc = document.querySelector("#form-pc");
const btnFormPc = document.querySelector("#btnFormPC");
const procesadores = document.querySelector("#procesadores");
const tablaPc = document.querySelector("#tabla-pc");
const btnx3 = document.querySelector("#btnx3");
const btnBorrarTodos = document.querySelector('#btn-borrar');
const btnAnterior = document.querySelector('#btnAnterior');
const btnSiguente = document.querySelector('#btnSiguente');
const filtrarDescuento = document.querySelector('#filtrarDescuento');
const filtrarPrecio = document.querySelector('#filtrarPrecio');
const URL_API =
  "https://62b5b66042c6473c4b38869b.mockapi.io/tablaWeb1/datosTabla";
let valoresAlmacenados = [];
let pc = {
  procesador: "",
  motherboard: "",
  gpu: "",
  precio: 500,
};

let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
  obtenerDatos();
  //Eventos
  btnFormPc.addEventListener("click", (e) => {
    e.preventDefault();
    let formDataPc = new FormData(formPc);
    let procesador = formDataPc.get("procesador");
    let motherboard = formDataPc.get("motherboard");
    let gpu = formDataPc.get("gpu");
    let codigo = formDataPc.get("codigo");
    valoresAlmacenados.push(pc);
    enviarDatos(procesador, motherboard, gpu, codigo);
  });

  btnx3.addEventListener("click", (e) => {
    e.preventDefault();
    let formDataPc = new FormData(formPc);
    let procesador = formDataPc.get("procesador");
    let motherboard = formDataPc.get("motherboard");
    let gpu = formDataPc.get("gpu");
    let codigo = formDataPc.get("codigo");
    enviarDatosX3(procesador, motherboard, gpu, codigo);
  });

  filtrarPrecio.addEventListener("change", (e) => {
    if (e.target.value === "50") {
      filtrarPorMayorA50(paginaActual);
    } else if (e.target.value === "49") {
      filtrarPorMenorA50(paginaActual);
    } else {
      borrarHTML();
      obtenerDatos(paginaActual);
    }
  });

  filtrarDescuento.addEventListener("change", (e) => {
    if (e.target.value === "si") {
      filtrarPorSi(paginaActual);
    } else if (e.target.value === "no") {
      filtrarPorNo(paginaActual);
    } else {
      borrarHTML();
      obtenerDatos(paginaActual);
    }
  });

  //Paginacion
  btnSiguente.addEventListener("click", (e) => {
    e.preventDefault();
    if (paginaActual === 10) {
      paginaActual = 1;
      tablaPc.innerHTML = "";
      obtenerDatos(paginaActual);
    } else {
      paginaActual++;
      tablaPc.innerHTML = "";
      obtenerDatos(paginaActual);
    }
  });
  btnAnterior.addEventListener("click", (e) => {
    e.preventDefault();
    if (paginaActual === 1) {
      tablaPc.innerHTML = "";
      paginaActual = 10;
      obtenerDatos(paginaActual);
    } else {
      tablaPc.innerHTML = "";
      paginaActual--;
      obtenerDatos(paginaActual);
    }
  });
  btnBorrarTodos.addEventListener('click', e => {
    e.preventDefault();
      borrarTodos();
  })
})



//Funciones
function agregarElementos(datos) {
  const tr = document.createElement("tr");
  const btnEliminar = document.createElement('button');
  const btnEditar = document.createElement('button');
  btnEliminar.innerHTML = "Eliminar";
  btnEditar.innerHTML = "Editar";
  btnEliminar.classList.add('btn-borrar');
  btnEditar.classList.add('btn-editar');
  const celdaProcesador = document.createElement('td');
  celdaProcesador.innerHTML = `${datos.procesador}`;
  const celdaMother = document.createElement('td');
  celdaMother.innerHTML = `${datos.motherboard}`;
  const celdaGpu = document.createElement('td');
  celdaGpu.innerHTML = `${datos.gpu}`;
  const celdaPrecioTotal = document.createElement('td');
  celdaPrecioTotal.innerHTML = `${datos.precioTotal}`;
  const celdaDescuento = document.createElement("td");
  if (datos.descuento != "") {
  celdaDescuento.innerHTML = `15%`
  tr.classList.add("descuento");
  } else {
  celdaDescuento.innerHTML = `0%`;
  }
  tablaPc.appendChild(tr);
  tr.appendChild(celdaProcesador);
  tr.appendChild(celdaMother);
  tr.appendChild(celdaGpu);
  tr.appendChild(celdaPrecioTotal);
  tr.appendChild(celdaDescuento);
  tr.appendChild(btnEliminar);
  tr.appendChild(btnEditar);

  btnEliminar.addEventListener('click', e => {
    e.preventDefault();
    eliminarIndicado(datos.id,tr);
  })

  btnEditar.addEventListener('click', e => {
    e.preventDefault();
    editarDatos(datos,tr,celdaProcesador,celdaMother,celdaGpu,btnEliminar,btnEditar);
  })
}
function borrarHTML() {
  while (tablaPc.firstChild) {
    tablaPc.removeChild(tablaPc.firstChild);
  }
}

//GET
async function obtenerDatos(paginaActual = 1) {
  try {
    let queryParams = `?page=${paginaActual}&limit=10`;
    let response = await fetch(`${URL_API}/${queryParams}`); //GET URL_API
    let json = await response.json(); // texto json a objeto
    if (response.ok) {
        for (const datos of json) {
          agregarElementos(datos);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//POST
async function enviarDatos(procesador, mother, gpu, descuento) {
  let pc = {
    procesador: procesador,
    motherboard: mother,
    gpu: gpu,
    descuento: descuento,
  };
  try {
    let response = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pc),
    });
    if (response.status === 201) {
      borrarHTML();
      obtenerDatos()
    }
  } catch (error) {
    console.log(error);
  }
}
async function enviarDatosX3(procesador, mother, gpu, descuento) {
  let pc = {
    procesador: procesador,
    motherboard: mother,
    gpu: gpu,
    descuento: descuento,
  };
  try {
    for (let i = 0; i < 3; i++) {
      let response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pc),
      })
    }
    borrarHTML();
    obtenerDatos();
  } catch (error) {
    console.log(error)
  }
}

//DELETE
async function eliminarIndicado(id,tr) {
  try {
    let res = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
    });
    if (res.status == '200') {
      tr.parentNode.removeChild(tr);
    }
  } catch (error) {
    console.log(error);
  }
}

async function borrarTodos() {
  let response = await fetch(URL_API);
  let json = await response.json();
  try {
      for (const datos of json) {
        let r = await fetch(`${URL_API}/${datos.id}`, {
          method: "DELETE"
        })
        if (r.ok) {
          borrarHTML();
        }
    }
  } catch (error) {
    console.log(error)
  }
}

//PUT
function editarDatos(datos,tr, celdaProcesador, celdaMother, celdaGpu, btnEliminar, btnEditar) {
  const btnAceptar = document.createElement('button');
  const btnCancelar = document.createElement('button');
  btnAceptar.innerHTML = 'Aceptar';
  btnCancelar.innerHTML = 'Cancelar';
  celdaProcesador.innerHTML = `<input type="text">`;
  celdaMother.innerHTML = `<input type="text">`;
  celdaGpu.innerHTML = `<input type="text">`;
  let valorProcesador = datos.procesador;
  let valorMother = datos.mother;
  let valorGpu = datos.gpu;
  tr.removeChild(btnEliminar);
  tr.removeChild(btnEditar);
  tr.appendChild(btnAceptar);
  tr.appendChild(btnCancelar);
  celdaProcesador.addEventListener("change", (e) => {
    valorProcesador = e.target.value;
  });

  celdaMother.addEventListener("change", (e) => {
    valorMother = e.target.value;
  });

  celdaGpu.addEventListener("change", (e) => {
    valorGpu = e.target.value;
  });
  btnAceptar.addEventListener("click", (e) => {
    e.preventDefault();
    tr.removeChild(btnAceptar);
    tr.removeChild(btnCancelar);
    cambiarValores(tr,valorProcesador,valorMother,valorGpu,datos,celdaProcesador,celdaMother,celdaGpu,btnEliminar,btnEditar);
  });
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    cancelarCambio();
  });
};

function cancelarCambio() {
  borrarHTML()
  obtenerDatos()
}

async function cambiarValores(tr, valorProcesador, valorMother, valorGpu, datos, celdaProcesador, celdaMother, celdaGpu, btnEliminar, btnEditar) {

  let pc = {
    procesador: valorProcesador,
    motherboard: valorMother,
    gpu: valorGpu,
    precioTotal: datos.precioTotal,
    descuento: datos.descuento,
  };

  try {
    let response = await fetch(`${URL_API}/${datos.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pc),
    });
    if (response.status === 200) {
      celdaProcesador.innerHTML = `${pc.procesador}`;
      celdaMother.innerHTML = `${pc.motherboard}`;
      celdaGpu.innerHTML = `${pc.gpu}`;
      tr.appendChild(btnEliminar);
      tr.appendChild(btnEditar)
    }
  } catch (error) {
    console.log(error);
  }
}

//Filtros
async function filtrarPorNo(paginaActual) {
  let queryParam = `?page=${paginaActual}&limit=10`
  let response = await fetch(`${URL_API}${queryParam}`);
  let json = await response.json();
  try {
    if (response.ok) {
      let arregloAImprimir = json.filter((x) => { // filter retorna un arreglo con los elementos que cumple la condicion
        return x.descuento == "";
      });
      borrarHTML();
      for (const datos of arregloAImprimir) {
        agregarElementos(datos);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function filtrarPorSi(paginaActual) {
  let queryParam = `?page=${paginaActual}&limit=10`
  let response = await fetch(`${URL_API}${queryParam}`);
  let json = await response.json()
  try {
    if (response.ok) {
      let arregloAImprimir = json.filter( x => {
        return x.descuento != '';
      })
      borrarHTML();
      for (const datos of arregloAImprimir) {
        agregarElementos(datos)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function filtrarPorMayorA50(paginaActual) {
  try {
    let queryParam = `?page=${paginaActual}&limit=10`
    let response = await fetch(`${URL_API}${queryParam}`);
    let json = await response.json();
    if (response.ok) {
      let arregloAImprimir = json.filter(x => {
        return x.precioTotal >= 50
      })
      borrarHTML()
      for (const datos of arregloAImprimir) {
        agregarElementos(datos)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function filtrarPorMenorA50(paginaActual) {
  try {
    let queryParam = `?page=${paginaActual}&limit=10`;
    let response = await fetch(`${URL_API}${queryParam}`);
    let json = await response.json();
    if (response.ok) {
      let arregloAImprimir = json.filter((x) => {
        return x.precioTotal < 50;
      });
      borrarHTML();
      for (const datos of arregloAImprimir) {
        agregarElementos(datos);
      }
    }
  } catch (error) {
    console.log(error);
  }
}