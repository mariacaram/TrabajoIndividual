function buscarUsuario(event) {
    event.preventDefault();
    const busquedaInput = document.getElementById('busqueda');
    console.log(busquedaInput.value);
    function notasFilter(nota) {
        return nota.categoria.includes(busquedaInput.value);
    }
    const notasFiltrados = notas.filter(notasFilter);

}
