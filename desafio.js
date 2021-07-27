const categoriaInput = document.getElementById("categoria");
const descripcionInput = document.getElementById("descripcion");
const contenidoTabla = document.getElementById("contenidoTabla");

// Elemento del contenido del modal de detalle
const detalleUsuarioDiv = document.getElementById('modalDetalleNota');

// Elementos del formulario de alta
const categoriaEditadoInput = document.getElementById('categoriaEditado');
const decripcionEditadoInput = document.getElementById('descripcionEditado');



const notasJson = localStorage.getItem('notas');





let notas = JSON.parse(notasJson) || [];

function ID (){
    return '_' + Math.random().toString(36).substr(2, 9);
  };


function AgregarNota(event) {
  event.preventDefault();
  const categoria = categoriaInput.value;
  const descripcion = descripcionInput.value;

  const nuevaNota = {
    categoria: categoria,
    descripcion: descripcion,
    registro: Date.now(),
    id: ID (),

  };
console.log(notas)
  notas.push(nuevaNota);

  mostrarNotas ();

  const notasJson = JSON.stringify(notas);

  localStorage.setItem("notas", notasJson);

  event.target.reset();

}

function mostrarNotas() {

function ArmarFilasDeNotas (nota) {
  const tr = `
  <tr>
  <th scope="row">${nota.categoria}</th>
  <td>${nota.descripcion}</td>
  <td>
  <button onclick="mostrarDetalleNota('${nota.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalleNota">Ver detalle </button>
  <button onclick="cargarModalEditar('${nota.id}')"  class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditarNota">Editar </button>
  <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger">Eliminar </button>
</td>
  </tr>
  `;
  return tr;
}

const contenido = notas.map (ArmarFilasDeNotas);
  contenidoTabla.innerHTML = contenido.join('');
}



function eliminarNota(id) {
  function notasFilter(nota) {
      return nota.id !== id;
  }
  const notasFiltrados = notas.filter(notasFilter);
  notas = notasFiltrados;
  mostrarNotas();
  const notasJson = JSON.stringify(notas);
  localStorage.setItem('notas', notasJson);
}

function mostrarDetalleNota(id) {
  const notaEncontrado = notas.find(function (nota) {
      return nota.id === id;
  });

  const fecha = new Date(notaEncontrado.registro);

  const contenido = `
  <p>Categoría: ${notaEncontrado.categoria}</p>
  <p>Descripción: ${notaEncontrado.descripcion}</p>
  <p>Fecha de registro: ${fecha.toLocaleString()}</p>
  `;
  detalleNotaDiv.innerHTML = contenido;
}

/** Esta función carga los datos del usuario seleccionado,
en los campos del formulario de edición del documento HTML.
@params {id} El id de un usuario.
*/
function cargarModalEditar(id) {
  // Buscar el usuario en el array usando el método find().
  const notaEncontrado = notas.find(function (nota) {
      return nota.id === id;
  });
  categoriaEditadoInput.value = notaEncontrado.categoria;
  decripcionEditadoInput.value = notaEncontrado.descripcion;
  // Actualizar el valor de la variable auxiliar usuarioId, con el id del usuario encontrado.
  notaEditadoId = id;
}

/** Al evento submit del formulario de edición le asignamos esta función,
que actualiza al usuario seleccionado, con los datos ingresados.  */
function editarNota(event) {
  event.preventDefault();
  const categoriaEditado = categoriaEditadoInput.value;
  const descripcionEditado = decripcionEditadoInput.value;
  const notaEditado = { categoria: categoriaEditado, descripcion: descripcionEditado };

  function notasActualizadoMap(nota) {
      if (nota.id === notaEditadoId) {
          // Actualizar el usuario
          return { ...nota, ...notaEditado };
      } else {
          // Retornar el resto de usuarios sin modificar
          return nota;
      }
  }
  const notasActualizado = notas.map(notasActualizadoMap);
  notas = notasActualizado;
  mostrarNotas();
  const notasJson = JSON.stringify(notas);
  localStorage.setItem('notas', notasJson);
}

mostrarNotas();