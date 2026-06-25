#!/usr/bin/env python3
"""
Convierte todos los .md de modulos/ a HTML en site/, usando estilos.css.
- Soporta tablas, bloques de código, listas.
- A los blockquotes les pone una clase (def/tip/warn/code/exito) según su emoji,
  para que tomen el color y el icono correctos definidos en estilos.css.
- Inyecta interactividad: barra de progreso de lectura, botón "copiar" en cada
  bloque de código y botón "subir".
- Reescribe los enlaces .md -> .html.

Uso:  python3 convertir.py
"""
import os
import re
import html as htmllib
import markdown

RAIZ = os.path.dirname(os.path.abspath(__file__))
ORIGEN = os.path.join(RAIZ, "modulos")
DESTINO = os.path.join(RAIZ, "site")

CABECERA = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo} — Manuales de Aprendizaje</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Baloo+2:wght@600;800&family=Press+Start+2P&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{css}">
</head>
<body>
<div id="progreso"></div>
<nav class="barra">
  <a href="{inicio}">🏠 Inicio</a>
  <a href="{indice_modulo}">📚 Índice del módulo</a>
  <span class="marca">🦎 BIT · MANUAL</span>
</nav>
<main class="contenedor">
"""

PIE = """<footer>Manuales de Aprendizaje · Hecho con 🦎 por Bit · Idioma: español</footer>
</main>
<button id="arriba" title="Subir" aria-label="Subir">▲</button>
<script>
(function () {
  // Barra de progreso de lectura
  var prog = document.getElementById('progreso');
  var arriba = document.getElementById('arriba');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (prog) prog.style.width = pct + '%';
    if (arriba) arriba.classList.toggle('visible', h.scrollTop > 400);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (arriba) arriba.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Botón "copiar" en cada bloque de código
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'btn-copiar';
    btn.textContent = 'Copiar';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var texto = code ? code.innerText : pre.innerText;
      navigator.clipboard.writeText(texto).then(function () {
        btn.textContent = '¡Copiado!';
        setTimeout(function () { btn.textContent = 'Copiar'; }, 1400);
      });
    });
    pre.appendChild(btn);
  });
})();
</script>
</body>
</html>
"""

# Emoji inicial del blockquote -> clase CSS (color + icono)
CLASES = [
    ("🟦", "def"),
    ("💡", "tip"),
    ("⚠️", "warn"),
    ("🔎", "code"),
    ("✅", "exito"),
    ("🎉", "exito"),
]


def clase_para_blockquote(texto_interno: str) -> str:
    for emoji, clase in CLASES:
        if emoji in texto_interno[:160]:
            return clase
    return ""


def añadir_clases_blockquote(html_str: str) -> str:
    salida = []
    pos = 0
    for m in re.finditer(r"<blockquote>(.*?)</blockquote>", html_str, flags=re.S):
        salida.append(html_str[pos:m.start()])
        interno = m.group(1)
        clase = clase_para_blockquote(htmllib.unescape(interno))
        etiqueta = f'<blockquote class="{clase}">' if clase else "<blockquote>"
        salida.append(etiqueta + interno + "</blockquote>")
        pos = m.end()
    salida.append(html_str[pos:])
    return "".join(salida)


def primer_titulo(texto_md: str, defecto: str) -> str:
    for linea in texto_md.splitlines():
        if linea.startswith("# "):
            return linea[2:].strip()
    return defecto


def convertir_enlaces(html_str: str) -> str:
    html_str = html_str.replace('href="README.md"', 'href="index.html"')
    html_str = re.sub(r'href="([^"]+?)\.md"', r'href="\1.html"', html_str)
    return html_str


def procesar():
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"])
    n = 0
    for carpeta, _dirs, archivos in os.walk(ORIGEN):
        rel_dir = os.path.relpath(carpeta, ORIGEN)
        dest_dir = os.path.join(DESTINO, rel_dir) if rel_dir != "." else DESTINO
        os.makedirs(dest_dir, exist_ok=True)
        prof = 0 if rel_dir == "." else len(rel_dir.split(os.sep))
        subir = "../" * prof
        css = subir + "estilos.css"
        inicio = subir + "index.html"
        indice_modulo = "index.html"
        for nombre in archivos:
            if not nombre.endswith(".md"):
                continue
            ruta_md = os.path.join(carpeta, nombre)
            with open(ruta_md, encoding="utf-8") as f:
                texto = f.read()
            md.reset()
            cuerpo = md.convert(texto)
            cuerpo = añadir_clases_blockquote(cuerpo)
            cuerpo = convertir_enlaces(cuerpo)
            titulo = primer_titulo(texto, nombre)
            destino_nombre = "index.html" if nombre == "README.md" else nombre[:-3] + ".html"
            pagina = CABECERA.format(
                titulo=htmllib.escape(titulo), css=css, inicio=inicio,
                indice_modulo=indice_modulo) + cuerpo + PIE
            with open(os.path.join(dest_dir, destino_nombre), "w", encoding="utf-8") as f:
                f.write(pagina)
            n += 1
    print(f"Convertidos {n} archivos .md -> .html en site/")


if __name__ == "__main__":
    procesar()
