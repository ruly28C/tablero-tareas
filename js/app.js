// Tablero de tareas - lógica principal
// Las tareas se guardan en el navegador (localStorage).

const formulario = document.getElementById('formulario');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');

let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function render() {
  lista.innerHTML = '';

  tareas.forEach((tarea, i) => {
    const li = document.createElement('li');
    if (tarea.hecha) li.classList.add('completada');

    const span = document.createElement('span');
    span.textContent = tarea.texto;
    span.addEventListener('click', () => {
      tareas[i].hecha = !tareas[i].hecha;
      guardar();
      render();
    });

    const borrar = document.createElement('button');
    borrar.textContent = 'X';
    borrar.className = 'borrar';
    borrar.addEventListener('click', () => {
      tareas.splice(i, 1);
      guardar();
      render();
    });

    li.appendChild(span);
    li.appendChild(borrar);
    lista.appendChild(li);
  });

  // Avisa a otras partes de la app que la lista cambió
  document.dispatchEvent(new Event('tareas:cambio'));
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  tareas.push({ texto: texto.value.trim(), hecha: false });
  texto.value = '';
  guardar();
  render();
});

render();



// ===== Zona A: contador de pendientes (sesión 2) =====



// ===== Zona B: limpiar completadas (sesión 2) =====
document.getElementById('limpiar').addEventListener('click', () => {
  tareas = tareas.filter(t => !t.hecha);
  guardar();
  render();
});



// ===== Zona C: tema oscuro (sesión 2) =====

