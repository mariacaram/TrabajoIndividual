function buscarnotas(event) {
    event.preventDefault();
    const busquedaInput = document.getElementById('busqueda');
    console.log(busquedaInput.value);
    function notasFilter(notas) {
        return notas.categoria.includes(busquedaInput.value);
    }
    const notasFiltrados = notas.filter(notasFilter);
    notas = notasFiltrados

    mostrarNotas()
}


