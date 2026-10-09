# Sesión 2 – Colaborar y administrar el proyecto

**Objetivo:** un repositorio de equipo donde cada quien agregó una función en su rama, revisada por un compañero y fusionada con pull request; un conflicto resuelto; issues, README completo y un release publicado en GitHub Pages.

## Roles del equipo

| Rol | Qué hace |
|---|---|
| **A** | Dueño del repositorio del equipo (usa su `tablero-tareas` de la sesión 1). Función: contador de pendientes. |
| **B** | Función: botón "Limpiar completadas". |
| **C** | Función: tema oscuro. |

## 1. Repositorio del equipo

**A:** en su repositorio, **Settings → Collaborators → Add people** → agrega los usuarios de B y C.

**B y C:** acepten la invitación (llega al correo y a https://github.com/notifications) y clonen el repositorio de A en una carpeta aparte:

```
cd Documentos
git clone https://github.com/USUARIO-A/tablero-tareas.git tablero-equipo
cd tablero-equipo
code .
```

Hasta ahora cada quien tenía su repositorio. Hoy hay **un solo repositorio y tres computadoras**.

## 2. Issues: una por función

**A:** pestaña **Issues → New issue**. Crea tres y asigna cada una (Assignees):

- `#1` Contador de tareas pendientes → A
- `#2` Botón limpiar completadas → B
- `#3` Tema oscuro → C

La issue es la tarea. En proyectos reales aquí vive la lista de pendientes del equipo.

## 3. Cada quien su rama y su función

```
git switch -c contador        # A
git switch -c limpiar         # B
git switch -c tema-oscuro     # C
```

Pega tu fragmento (están al final de esta guía) en los lugares marcados **Zona A / Zona B / Zona C** de `index.html`, `js/app.js` y `css/estilos.css`. Guarda y prueba en el navegador.

```
git add .
git commit -m "Agrego contador de pendientes"
git push -u origin contador
```

(B y C igual, con su rama y su mensaje.)

## 4. Pull request con revisión

1. Crea el pull request. En la descripción escribe `Closes #1` (con tu número de issue).
2. A la derecha, en **Reviewers**, pon a un compañero: A revisa a B, B revisa a C, C revisa a A.
3. **El revisor:** pestaña **Files changed** → deja un comentario en una línea (el signo + que aparece al pasar el mouse) → **Review changes → Approve → Submit review**.
4. **El autor:** **Merge pull request → Confirm merge**. La issue se cierra sola.
5. **Todos:**

```
git switch main
git pull
```

Abre `index.html`: ya están las tres funciones, hechas por tres personas.

## 5. Conflicto a propósito

Los tres van a cambiar **la misma línea** de `index.html`. Cada quien, en una rama nueva:

```
git switch main
git pull
git switch -c mi-nombre
```

En `index.html`, dentro de `<ul id="integrantes">`, reemplaza `<li>Agrega tu nombre aquí</li>` por `<li>Tu Nombre</li>`. Guarda.

```
git add index.html
git commit -m "Agrego mi nombre al equipo"
git push -u origin mi-nombre
```

Creen los tres pull requests. El primero se fusiona normal. El segundo dice **"This branch has conflicts that must be resolved"**. Un conflicto no es un error: es Git preguntando "cambiaron la misma línea, ¿con cuál me quedo?".

1. Clic en **Resolve conflicts**.
2. Verás algo así:

   ```
   <<<<<<< mi-nombre
   <li>Nombre de B</li>
   =======
   <li>Nombre de A</li>
   >>>>>>> main
   ```

3. Deja las dos líneas `<li>` y borra las tres líneas con `<<<<<<<`, `=======` y `>>>>>>>`.
4. **Mark as resolved → Commit merge → Merge pull request**.

El tercero igual. Al final en `main` deben quedar los tres nombres.

Para resolverlo desde tu computadora (es lo mismo, pero en VS Code):

```
git switch mi-nombre
git pull origin main
```

VS Code marca el archivo en conflicto. Edítalo, quita las marcas, deja las líneas que quieres conservar, y luego:

```
git add index.html
git commit -m "Resuelvo conflicto en la lista de integrantes"
git push
```

## 6. README del proyecto

**A**, en `main`: actualiza `README.md` con los tres integrantes, las funciones agregadas (y quién hizo cada una) y la liga de la página publicada (la obtienes en el paso 7). Commit y push.

El README es la portada del proyecto. Junto con el historial de commits y los pull requests, es la evidencia de quién hizo qué.

## 7. Release y publicación

**A:**

1. En la página del repositorio, columna derecha, **Releases → Create a new release** (o "Draft a new release").
2. **Choose a tag** → escribe `v1.0.0` → **Create new tag: v1.0.0 on publish**.
3. Release title: `Versión 1.0`. Clic en **Generate release notes** (GitHub escribe las notas con los pull requests) → **Publish release**.
4. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, carpeta `/ (root)` → Save**.
5. En uno o dos minutos aparece la liga arriba: `https://USUARIO-A.github.io/tablero-tareas/`. Ábranla: ahí está su app, publicada, con las tres funciones.

Peguen la liga en el chat.

## Lo que sigue (panorama)

- **Actions:** pestaña Actions del repositorio. En cada pull request corrió una revisión automática (`.github/workflows/revisar.yml`). Eso es un *pipeline*: en proyectos reales ahí se corren las pruebas y se despliega (CI/CD).
- **Jira:** la rama y el pull request se ligan a la tarea de Jira y la mueven de columna solos, igual que `Closes #1` cerró la issue.
- **Herramientas con IA:** GitHub Copilot en VS Code (sugiere código y mensajes de commit), GitKraken (Git visual). Todo lo que hicieron hoy es lo que esas herramientas automatizan: hay que entenderlo para usarlas bien.
- **Trabajo real:** nadie sube directo a `main` (ramas protegidas); todo entra por pull request con revisión.

---

## Fragmentos

### A: contador de pendientes

`index.html`, donde dice `<!-- Zona A: contador -->`:

```html
<p id="contador">0 tareas pendientes</p>
```

`js/app.js`, en la **Zona A**:

```js
function actualizarContador() {
  const pendientes = tareas.filter(t => !t.hecha).length;
  document.getElementById('contador').textContent = pendientes + ' tareas pendientes';
}
document.addEventListener('tareas:cambio', actualizarContador);
actualizarContador();
```

### B: limpiar completadas

`index.html`, donde dice `<!-- Zona B: botón limpiar -->`:

```html
<button id="limpiar" type="button">Limpiar completadas</button>
```

`js/app.js`, en la **Zona B**:

```js
document.getElementById('limpiar').addEventListener('click', () => {
  tareas = tareas.filter(t => !t.hecha);
  guardar();
  render();
});
```

### C: tema oscuro

`index.html`, donde dice `<!-- Zona C: botón de tema -->`:

```html
<button id="tema" type="button">Tema oscuro</button>
```

`css/estilos.css`, al final del archivo:

```css
body.oscuro {
  background: #1e1e1e;
  color: #eee;
}

body.oscuro #lista li {
  background: #2b2b2b;
}

body.oscuro footer {
  color: #aaa;
  border-color: #444;
}
```

`js/app.js`, en la **Zona C**:

```js
const botonTema = document.getElementById('tema');
if (localStorage.getItem('tema') === 'oscuro') document.body.classList.add('oscuro');
botonTema.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  localStorage.setItem('tema', document.body.classList.contains('oscuro') ? 'oscuro' : 'claro');
});
```
