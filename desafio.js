const categoriaInput = document.getElementById('categoria');
const descripcionInput = document.getElementById('descripcion');
const contenidoTabla = document.getElementById('contenidoTabla')
const notas = [];

function AgregarNota(event) {
    event.preventDefault();
    const categoria = categoriaInput.value;
    const descripcion = descripcionInput.value;

    const nuevaNota = {
        categoria: categoria,
        descripcion: descripcion
    };

    notas.push(nuevaNota);
    event.target.reset();
    mostrarNotas()
}



function mostrarNotas() {
    const contenido = notas.map(function (nota) {
        const tr = `
    <tr>
    <th scope="row">${nota.categoria}</th>
    <td>${nota.descripcion}</td>
    <td><button class="btn btn-warning">Editar</button></td>
    </tr>
    `;
        return tr;
    });
    contenidoTabla.innerHTML = contenido.join('');
}

