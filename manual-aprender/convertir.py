#!/usr/bin/env python3
"""
Convierte todos los .md de modulos/ a HTML en site/, usando estilos.css.
- Soporta tablas, bloques de código, listas.
- A los blockquotes les pone una clase (def/tip/warn/code) según su emoji inicial,
  para que tomen el color correcto definido en estilos.css.
- Reescribe los enlaces .md -> .html y ajusta rutas de imágenes/recursos.

Uso:  python3 convertir.py
"""
import os
import re
import html as htmllib
import markdown

RAIZ = os.path.dirname(os.path.abspath(__file__))
ORIGEN = os.path.join(RAIZ, "modulos")
DESTINO = os.path.join(RAIZ, "site")

PLANTILLA = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo} — Manuales de Aprendizaje</title>
<link rel="stylesheet" href="{css}">
</head>
<body>
<nav class="barra">
  <a href="{inicio}">🏠 Inicio</a>
  <a href="{indice_modulo}">📚 Índice del módulo</a>
</nav>
<main class="contenedor">
{cuerpo}
<footer>Manuales de Aprendizaje · Idioma: español</footer>
</main>
</body>
</html>
"""

# Emoji inicial del blockquote -> clase CSS
CLASES = [
    ("🟦", "def"),
    ("💡", "tip"),
    ("⚠️", "warn"),
    ("🔎", "code"),
    ("✅", "tip"),
]


def clase_para_blockquote(texto_interno: str) -> str:
    for emoji, clase in CLASES:
        if emoji in texto_interno[:120]:
            return clase
    return ""


def añadir_clases_blockquote(html_str: str) -> str:
    # Inserta class="..." en <blockquote> según el primer emoji que contenga.
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
    # README.md -> index.html ; otros .md -> .html
    html_str = html_str.replace('href="README.md"', 'href="index.html"')
    html_str = re.sub(r'href="([^"]+?)\.md"', r'href="\1.html"', html_str)
    # imágenes/recursos que en el .md apuntan a ../../recursos -> ../../recursos (igual nivel en site/)
    return html_str


def procesar():
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"])
    n = 0
    for carpeta, _dirs, archivos in os.walk(ORIGEN):
        rel_dir = os.path.relpath(carpeta, ORIGEN)
        dest_dir = os.path.join(DESTINO, rel_dir) if rel_dir != "." else DESTINO
        os.makedirs(dest_dir, exist_ok=True)
        # profundidad para construir rutas relativas a site/
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
            with open(os.path.join(dest_dir, destino_nombre), "w", encoding="utf-8") as f:
                f.write(PLANTILLA.format(
                    titulo=htmllib.escape(titulo), css=css, inicio=inicio,
                    indice_modulo=indice_modulo, cuerpo=cuerpo))
            n += 1
    print(f"Convertidos {n} archivos .md -> .html en site/")


if __name__ == "__main__":
    procesar()
