#!/usr/bin/env python3
"""
Inserta la ilustración de cada capítulo justo después de su título H1.
Convención: la imagen de 'modulos/MOD/NN-slug.md' es 'recursos/imagenes/MOD/capNN.png'.
Es idempotente: si el capítulo ya referencia su imagen, no hace nada.

Uso: python3 insertar_imagenes.py
"""
import os
import re

RAIZ = os.path.dirname(os.path.abspath(__file__))
MODULOS = os.path.join(RAIZ, "modulos")
IMGS = os.path.join(RAIZ, "recursos", "imagenes")

insertadas = 0
for mod in sorted(os.listdir(MODULOS)):
    mod_dir = os.path.join(MODULOS, mod)
    if not os.path.isdir(mod_dir):
        continue
    for nombre in sorted(os.listdir(mod_dir)):
        m = re.match(r"^(\d\d)-.*\.md$", nombre)
        if not m:
            continue
        num = m.group(1)
        img_rel = f"../../recursos/imagenes/{mod}/cap{num}.png"
        img_abs = os.path.join(IMGS, mod, f"cap{num}.png")
        if not os.path.exists(img_abs):
            continue
        ruta = os.path.join(mod_dir, nombre)
        with open(ruta, encoding="utf-8") as f:
            texto = f.read()
        if f"cap{num}.png" in texto:
            continue  # ya insertada
        lineas = texto.splitlines()
        # encontrar la primera línea de título "# ..."
        idx = next((i for i, l in enumerate(lineas) if l.startswith("# ")), None)
        if idx is None:
            continue
        bloque = (
            f'\n<p align="center">\n'
            f'  <img src="{img_rel}" alt="Ilustración del capítulo (pixel art con Bit)" width="640">\n'
            f'</p>\n'
        )
        lineas.insert(idx + 1, bloque)
        with open(ruta, "w", encoding="utf-8") as f:
            f.write("\n".join(lineas) + "\n")
        insertadas += 1
        print(f"+ {mod}/{nombre}  <- cap{num}.png")

print(f"Imágenes insertadas: {insertadas}")
