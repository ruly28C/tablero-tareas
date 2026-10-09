# Sesión 1 – Del Drive al repositorio

**Objetivo:** al terminar tienes tu propio repositorio en GitHub con un proyecto funcionando, un cambio hecho en una rama y fusionado con pull request, y un README en Markdown.

Trabaja todo desde la terminal integrada de VS Code (menú Terminal → Nueva terminal). Cuando termines un paso, pon ✅ en el chat.

## 1. Crea tu repositorio desde la plantilla

1. Entra a https://github.com/ruly282/taller-git-base
2. Clic en el botón verde **Use this template** → **Create a new repository**.
3. Repository name: `tablero-tareas`. Visibilidad: **Public**. Clic en **Create repository**.

Plan B: si no ves el botón, descarga el ZIP (Code → Download ZIP), crea un repositorio vacío llamado `tablero-tareas` y copia los archivos dentro después de clonarlo.

## 2. Clónalo a tu computadora

En tu repositorio, botón verde **Code** → copia la URL (HTTPS).

```
cd Documentos
git clone https://github.com/TU-USUARIO/tablero-tareas.git
cd tablero-tareas
code .
```

`clone` baja una copia completa del repositorio con toda su historia. La carpeta oculta `.git` es donde Git guarda esa historia: no se toca.

## 3. Abre el proyecto

Abre `index.html` en tu navegador (doble clic en el archivo). Agrega una tarea, márcala como hecha, bórrala. Eso es lo que vamos a versionar.

## 4. Tu primer commit

Edita `README.md`: en la sección **Equipo** cambia `(agrega tu nombre)` por tu nombre. Guarda.

```
git status
git add README.md
git commit -m "Agrego mi nombre al README"
git push
```

La primera vez que hagas `push`, se abre una ventana para iniciar sesión en GitHub. Acepta.

Recarga tu repositorio en GitHub: ahí está tu cambio. Entra a la pestaña **Commits**: ahí está tu nombre, la fecha y el mensaje.

El ciclo siempre es el mismo: **editar → `git add` → `git commit` → `git push`**.

## 5. Una rama para un cambio

```
git switch -c cambia-titulo
```

Ahora estás en la rama `cambia-titulo`. Haz dos cambios:

- En `index.html`, cambia `<h1>Tablero de tareas</h1>` por `<h1>Tablero de tareas de TU NOMBRE</h1>`.
- En `css/estilos.css`, cambia el color de `--principal` (por ejemplo `#e14a2a`).

Recarga el navegador para verlo. Luego:

```
git add .
git commit -m "Cambio el título y el color principal"
git push -u origin cambia-titulo
```

## 6. Pull request y merge

1. En GitHub aparece el aviso "cambia-titulo had recent pushes" → **Compare & pull request**. (Si no aparece: pestaña Pull requests → New pull request → base: `main`, compare: `cambia-titulo`.)
2. Escribe qué cambiaste y por qué. Clic en **Create pull request**.
3. Revisa la pestaña **Files changed**: en rojo lo que quitaste, en verde lo que pusiste.
4. **Merge pull request** → **Confirm merge**.

Tu cambio ya está en `main` en GitHub.

## 7. Trae el cambio a tu computadora

```
git switch main
git pull
git log --oneline
```

Recarga `index.html`: ahí está el cambio, ya en la rama principal.

## 8. Markdown

Completa el `README.md` con una sección nueva:

```markdown
## Cómo usarlo

1. Escribe una tarea y presiona **Agregar**.
2. Haz clic en la tarea para marcarla como hecha.
3. Presiona **X** para borrarla.

Repositorio: [tablero-tareas](https://github.com/TU-USUARIO/tablero-tareas)
```

Vista previa en VS Code: `Ctrl+Shift+V`. Luego súbelo:

```
git add README.md
git commit -m "Completo el README"
git push
```

## Para la sesión 2

- Equipos de 3 (se publican en el grupo).
- Trae este repositorio listo y tu cuenta de GitHub abierta. No hay que instalar nada más.

## Chuleta

| Comando | Qué hace |
|---|---|
| `git status` | Qué archivos cambiaron |
| `git add .` | Prepara todos los cambios para el commit |
| `git commit -m "mensaje"` | Guarda la foto con un mensaje |
| `git push` | Sube los commits a GitHub |
| `git pull` | Baja lo nuevo de GitHub |
| `git switch -c rama` | Crea una rama y se cambia a ella |
| `git switch main` | Regresa a main |
| `git log --oneline` | Historial resumido |
