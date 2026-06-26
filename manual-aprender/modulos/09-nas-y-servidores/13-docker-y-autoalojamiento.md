# Capitulo 13 — Docker y autoalojamiento (self-hosting)

<p align="center">
  <img src="../../recursos/imagenes/09-nas-y-servidores/cap13.png" alt="Ilustración del capítulo (pixel art con Bit)" width="640">
</p>


> Hasta ahora tu **polypaw-nas** (el laptop Acer Nitro AN515-54, con procesador Intel Core i5-9300H, 8 GB de RAM y Ubuntu Server 26.04) ya hace cosas serias: comparte archivos con Samba (el recurso compartido **PolyPawNAS**), se administra desde Cockpit en el puerto 9090, viaja por internet de forma segura con Tailscale y bloquea anuncios con AdGuard Home. En este capitulo damos el salto que convierte a un NAS en un pequeno centro de servicios: aprender a **alojar tus propias aplicaciones** dentro de tu casa, usando contenedores con Docker (y su primo Podman). Bit, el ajolote, se frota las manitas: "esto es como tener un edificio de apartamentos para programas, y tu eres el portero". Vamos con calma, sin prisa y sin que se nos llene la memoria.

---

## 1. El problema que resuelven los contenedores

Imagina que quieres instalar tres aplicaciones en polypaw-nas: una para ver fotos, otra para tomar notas y otra para guardar contrasenas. Cada una necesita su propia version de unas piezas internas (una version de Python, otra de una base de datos, otra de no-se-que libreria). Si las instalas todas "sueltas" en el mismo Ubuntu, terminan peleandose entre ellas: una rompe a la otra, y desinstalar una limpia mal y deja basura. Es el clasico "en mi maquina funcionaba".

Los contenedores resuelven esto metiendo cada aplicacion en su propia cajita sellada, con todo lo que necesita dentro. Si una cajita se rompe, la tiras y pones otra; las demas ni se enteran.

> ### 🟦 ¿Que significa? — *Contenedor (container)*
> Un contenedor es un paquete que lleva dentro una aplicacion **y todo lo que esa aplicacion necesita** para funcionar (sus librerias, su configuracion), aislado del resto del sistema. Es como un tupper sellado: lo que esta dentro no se mezcla con lo de afuera.
> **Para que sirve:** correr programas sin que se estorben entre si y sin ensuciar tu Ubuntu base.
> **Donde aparece en tu NAS real:** en polypaw-nas cada servicio que alojes (un visor de fotos, un panel, lo que sea) vivira en su propio contenedor, separado de Samba, Cockpit y AdGuard.

> ### 🟦 ¿Que significa? — *Docker*
> Docker es el programa (el "motor") que crea, arranca, para y borra contenedores. Tu le das ordenes y el se encarga de las cajitas.
> **Para que sirve:** es la herramienta estandar para manejar contenedores; casi todas las guias de internet hablan de Docker.
> **Donde aparece en tu NAS real:** ya esta instalado en polypaw-nas. Lo usaras con el comando `docker` desde la terminal (por SSH o desde la consola).

> ### 🟦 ¿Que significa? — *Podman*
> Podman es una alternativa a Docker que hace casi exactamente lo mismo y entiende casi los mismos comandos. Su gracia es que puede correr sin un **demonio** (un programa de fondo que vive siempre encendido esperando ordenes; el de Docker corre con permisos de administrador), lo que algunos consideran mas seguro.
> **Para que sirve:** lo mismo que Docker; puedes elegir el que prefieras.
> **Donde aparece en tu NAS real:** tambien esta instalado en polypaw-nas. En la mayoria de comandos de este capitulo puedes escribir `podman` donde dice `docker` y funcionara igual.

> ### 💡 Tip
> No te agobies con la pelea "Docker vs Podman". Para empezar, elige uno y quedate con el. En este capitulo usaremos `docker` en los ejemplos porque es lo que veras en el 99% de los tutoriales, pero si tu prefieres Podman, casi todo se traduce cambiando la palabra.

---

## 2. Imagenes vs contenedores (la receta vs el plato)

Esta es la distincion que mas confunde al principio, asi que la explicamos con cocina.

Una **imagen** es como una receta congelada: trae las instrucciones y los ingredientes listos para preparar un plato. No te la comes; la usas para cocinar.

Un **contenedor** es el plato ya servido: lo que sale cuando "cocinas" una imagen y la pones a correr. De una misma receta (imagen) puedes servir muchos platos (contenedores) iguales.

> ### 🟦 ¿Que significa? — *Imagen (image)*
> Una imagen es una plantilla de solo lectura que contiene una aplicacion ya empaquetada y lista para arrancar. No cambia: siempre es la misma receta.
> **Para que sirve:** es el molde del que nacen los contenedores. La descargas una vez y la reutilizas.
> **Donde aparece en tu NAS real:** cuando instales un servicio en polypaw-nas, primero Docker descargara su imagen (por ejemplo `adguard/adguardhome`) y luego creara un contenedor a partir de ella.

> ### 🟦 ¿Que significa? — *Registro de imagenes (registry / Docker Hub)*
> Es una tienda online gratuita de donde se descargan las imagenes. La mas famosa se llama Docker Hub.
> **Para que sirve:** encontrar y bajar imagenes oficiales de miles de aplicaciones sin tener que construirlas tu.
> **Donde aparece en tu NAS real:** cada vez que polypaw-nas baje una imagen por primera vez, la trae de un registro a traves de internet.

> ### ⚠️ Cuidado
> En Docker Hub cualquiera puede subir imagenes, incluidas algunas maliciosas o abandonadas. Prefiere **imagenes oficiales** o de proyectos con muchos usuarios y mantenimiento reciente. Bit lo resume: "no te comas la receta del primer puesto callejero que veas; mira que tenga buena fama".

Para ver las imagenes que ya tienes descargadas en polypaw-nas y los contenedores que existen:

```bash
# Listar las imagenes descargadas
docker images

# Listar los contenedores que estan corriendo ahora mismo
docker ps

# Listar TODOS los contenedores, incluso los apagados
docker ps -a
```

> ### 🔎 En tu servidor
> Si acabas de instalar Docker en polypaw-nas y aun no has corrido nada, `docker ps` te saldra con la lista vacia (solo los titulos de las columnas). Eso es normal y correcto: aun no has cocinado ningun plato.

---

## 3. `docker run`: arrancar tu primer contenedor

El comando estrella para crear y arrancar un contenedor es `docker run`. Hagamos la prueba clasica, que no consume casi nada de memoria y se borra sola:

```bash
# Descarga la imagen "hello-world" y la ejecuta una vez
docker run hello-world
```

Si todo va bien, veras un mensaje que dice "Hello from Docker!". Eso significa que el motor funciona. Detras de escena ocurrieron tres cosas: Docker no encontro la imagen localmente, la bajo del registro, y creo un contenedor que imprimio el mensaje y termino.

Un ejemplo mas util es un servidor web de prueba:

```bash
# Arranca un servidor web Nginx en segundo plano
docker run -d --name prueba-web -p 8080:80 nginx
```

Vamos a desmenuzar ese comando, porque cada pedacito importa:

- `docker run` → crea y arranca un contenedor.
- `-d` → "detached", o sea en segundo plano, para que no se quede ocupando tu terminal.
- `--name prueba-web` → le pones un nombre legible al contenedor, para no tener que usar codigos raros.
- `-p 8080:80` → mapeo de puertos (lo vemos en la seccion 5).
- `nginx` → el nombre de la imagen que quieres usar.

> ### 🟦 ¿Que significa? — *`docker run`*
> Es la orden que crea un contenedor nuevo a partir de una imagen y lo pone a funcionar de inmediato.
> **Para que sirve:** lanzar un servicio. Es el comando que mas usaras al experimentar.
> **Donde aparece en tu NAS real:** cada prueba rapida que hagas en polypaw-nas empezara con un `docker run`. Para servicios serios, sin embargo, preferiras Compose (seccion 4).

> ### 🟦 ¿Que significa? — *Segundo plano (detached, `-d`)*
> Correr algo en segundo plano significa que sigue funcionando solo, sin ocupar tu pantalla, y tu puedes cerrar la terminal sin que se apague.
> **Para que sirve:** un servidor debe seguir vivo aunque te desconectes; por eso casi siempre se usa `-d`.
> **Donde aparece en tu NAS real:** todos los servicios permanentes de polypaw-nas (los que quieres que esten siempre disponibles) corren en segundo plano.

Para apagar y limpiar ese contenedor de prueba:

```bash
# Detener el contenedor por su nombre
docker stop prueba-web

# Borrarlo (ya detenido)
docker rm prueba-web
```

> ### 💡 Tip
> Mientras experimentas, ponle siempre `--name` a tus contenedores. Es muchisimo mas comodo escribir `docker stop prueba-web` que buscar un identificador de doce caracteres aleatorios.

---

## 4. `docker compose`: la forma ordenada de alojar servicios

Escribir comandos `docker run` larguisimos a mano funciona para probar, pero es fragil: si reinicias polypaw-nas o se te olvida un parametro, lo pasas mal. La solucion profesional y, a la vez, la mas comoda para principiantes, es **Docker Compose**.

Compose te deja describir tu servicio en un archivo de texto (un archivo `docker-compose.yml`) y luego levantarlo todo con un solo comando. El archivo queda guardado, asi que siempre puedes repetir, leer o respaldar tu configuracion.

> ### 🟦 ¿Que significa? — *Docker Compose*
> Es una herramienta que lee un archivo de texto donde tu describes uno o varios contenedores (que imagen, que puertos, que datos) y los levanta todos juntos con una sola orden.
> **Para que sirve:** dejar tu configuracion escrita y repetible, en vez de comandos sueltos que se te olvidan.
> **Donde aparece en tu NAS real:** sera tu forma principal de instalar servicios permanentes en polypaw-nas. Cada servicio tendra su carpetita con su `docker-compose.yml`.

> ### 🟦 ¿Que significa? — *YAML (el archivo `.yml`)*
> YAML es un formato de texto para escribir configuraciones de forma legible, usando sangrias (espacios al inicio de la linea) para indicar que cosa pertenece a cual.
> **Para que sirve:** describir la configuracion de tus contenedores de manera ordenada.
> **Donde aparece en tu NAS real:** cada `docker-compose.yml` de polypaw-nas esta escrito en YAML.

Asi se ve un Compose sencillo. Imagina que quieres alojar un servicio de notas en tu HDD de datos:

```yaml
# Archivo: /srv/nas/servicios/notas/docker-compose.yml
services:
  notas:
    image: nginx                  # la imagen a usar
    container_name: mis-notas     # nombre legible
    ports:
      - "8081:80"                 # puerto del NAS : puerto interno
    volumes:
      - /srv/nas/servicios/notas/datos:/data   # datos que sobreviven
    restart: unless-stopped       # vuelve a arrancar solo tras un reinicio
```

> ### ⚠️ Cuidado
> En YAML la sangria (los espacios al inicio) **es obligatoria y significativa**. No uses tabuladores, usa espacios, y respeta los niveles. Un espacio de mas o de menos rompe el archivo. Bit avisa: "el YAML es quisquilloso como un gato; respeta su espacio".

Para levantar, ver y bajar ese servicio, parate dentro de su carpeta y usa:

```bash
# Levantar todo lo descrito en el docker-compose.yml (en segundo plano)
docker compose up -d

# Ver los registros (logs) de lo que esta haciendo el servicio
docker compose logs -f

# Bajar y eliminar los contenedores del archivo (los datos en volumenes se quedan)
docker compose down
```

> ### 🟦 ¿Que significa? — *`restart: unless-stopped`*
> Es una regla que le dice a Docker: "si este contenedor se cae o si reinicio el servidor, vuelve a arrancarlo solo, salvo que yo lo haya apagado a mano".
> **Para que sirve:** que tus servicios revivan solos despues de un corte o un reinicio, sin que tengas que estar pendiente.
> **Donde aparece en tu NAS real:** es muy recomendable ponerlo en cada servicio de polypaw-nas, asi si se va la luz y la bateria del laptop (tu UPS natural) aguanta lo justo, al volver todo se recupera solo.

> ### 🔎 En tu servidor
> Guarda las carpetas de tus servicios dentro del HDD de datos (954 GB, montado en `/srv/nas`), en `/srv/nas/servicios/`, no en el SSD del sistema (238 GB). Asi tus configuraciones viajan con tus datos cuando hagas respaldos y no llenas el disco del sistema operativo, que es el mas pequeno.

---

## 5. Puertos: la puerta de entrada a cada contenedor

Un contenedor es una cajita cerrada. Si dentro corre una aplicacion web, necesitas abrir una "ventanilla" para hablar con ella desde fuera. Eso son los puertos.

> ### 🟦 ¿Que significa? — *Puerto*
> Un puerto es un numero que identifica una "ventanilla" de comunicacion en un equipo. Una misma maquina puede tener muchas ventanillas abiertas, cada una atendida por un programa distinto.
> **Para que sirve:** dirigir cada conexion al programa correcto. Por ejemplo, las paginas web suelen usar el puerto 80 o el 443.
> **Donde aparece en tu NAS real:** Cockpit ya usa el puerto **9090** en polypaw-nas. Cuando alojes servicios nuevos, cada uno necesitara su propio puerto libre.

Cuando escribes `-p 8080:80` (o `"8080:80"` en Compose), el numero de la **izquierda** es el puerto que abres en polypaw-nas, y el de la **derecha** es el puerto que la aplicacion usa **dentro** de su cajita. O sea: "lo que llegue al 8080 del NAS, mandalo al 80 de adentro del contenedor".

> ### 🟦 ¿Que significa? — *Mapeo de puertos (port mapping)*
> Es la conexion entre un puerto de tu NAS y un puerto interno del contenedor, para que el trafico de afuera llegue a la aplicacion de adentro.
> **Para que sirve:** poder acceder desde tu navegador a un servicio que esta encerrado en un contenedor.
> **Donde aparece en tu NAS real:** si alojas un servicio con `-p 8096:8096`, lo abriras en tu navegador escribiendo la direccion de polypaw-nas seguida de `:8096`.

> ### ⚠️ Cuidado
> Dos contenedores no pueden usar el **mismo puerto de la izquierda** (el del NAS) a la vez. Cockpit ya tiene tomado el 9090. Si intentas levantar un servicio en 9090, Docker se quejara. Lleva una lista de que puerto usa cada servicio para no chocar.

> ### 💡 Tip
> Para probar desde el propio polypaw-nas si un servicio responde, sin abrir nada al exterior, puedes usar:
> ```bash
> # Pide la pagina al servicio que corre en el puerto 8080, localmente
> curl http://localhost:8080
> ```
> Si responde algo, el contenedor esta vivo y atendiendo.

### El punto de seguridad mas importante de todo el capitulo

Abrir un puerto en polypaw-nas lo hace accesible **dentro de tu red de casa**. Eso esta bien. Lo que NO debes hacer a la ligera es abrir ese puerto hacia **todo internet** (lo que se llama "abrir puertos en el router" o "port forwarding").

> ### 🟦 ¿Que significa? — *Exponer un puerto a internet (port forwarding)*
> Es configurar tu router para que conexiones desde cualquier parte del mundo puedan entrar a un puerto de tu NAS.
> **Para que sirve:** acceder a tus servicios desde fuera de casa... pero abre la puerta a que cualquiera intente entrar.
> **Donde aparece en tu NAS real:** idealmente, en **ninguna** parte. Para acceder a polypaw-nas desde la calle, usa **Tailscale**, que ya tienes instalado.

> ### ⚠️ Cuidado
> No abras puertos de polypaw-nas hacia internet salvo que sepas muy bien lo que haces. Cada puerto abierto es una puerta que robots de todo el mundo intentaran forzar dia y noche. La forma segura de llegar a tus servicios desde fuera de casa es por **Tailscale**: te conectas a tu red privada como si estuvieras en el sofa, y ningun puerto queda expuesto al publico. Bit lo dice fuerte: "una puerta abierta a la calle es una invitacion; mejor el tunel secreto de Tailscale".

---

## 6. Volumenes: para no perder tus datos

Aqui viene una sorpresa desagradable si no la conoces: cuando borras un contenedor con `docker rm`, **todo lo que la aplicacion guardo dentro desaparece con el**. Si tu servicio de notas guardo las notas dentro del contenedor y lo borras, adios notas.

La solucion son los volumenes: una forma de decirle al contenedor "guarda estos datos **afuera**, en una carpeta del HDD de polypaw-nas, no dentro de tu cajita".

> ### 🟦 ¿Que significa? — *Volumen (volume)*
> Un volumen es un almacenamiento que vive fuera del contenedor (en el disco real de tu NAS) y que el contenedor usa para guardar datos que deben sobrevivir.
> **Para que sirve:** que tus datos no se borren aunque destruyas, actualices o recrees el contenedor.
> **Donde aparece en tu NAS real:** apuntaras tus volumenes a carpetas del HDD de datos de polypaw-nas, montado en `/srv/nas`, para que las copias de respaldo de ese disco tambien protejan tus servicios.

En el ejemplo de Compose de la seccion 4 esta esta linea:

```yaml
    volumes:
      - /srv/nas/servicios/notas/datos:/data
```

Eso significa: "la carpeta `/data` de adentro del contenedor en realidad es la carpeta `/srv/nas/servicios/notas/datos` del HDD de polypaw-nas". Asi, aunque borres el contenedor, los datos siguen ahi en tu disco, sanos y salvos.

> ### 🟦 ¿Que significa? — *Bind mount (carpeta del host)*
> Es el tipo de volumen donde tu eliges exactamente que carpeta de tu NAS se usa, escribiendola tu mismo (como `/srv/nas/servicios/...`).
> **Para que sirve:** saber siempre donde estan tus datos y poder respaldarlos con tus herramientas normales.
> **Donde aparece en tu NAS real:** es el estilo recomendado para polypaw-nas, porque deja tus datos en `/srv/nas`, justo en el disco que ya respaldas.

> ### 🔎 En tu servidor
> Como tus volumenes viviran en `/srv/nas`, las copias de seguridad que ya haces de ese HDD (al estilo de las que cuidan tus repos como tunal-digital, PolyPaw, RachaSimple o Faro/Organizer) tambien estaran protegiendo la configuracion y los datos de tus servicios autoalojados. Dos pajaros de un tiro.

> ### ⚠️ Cuidado
> Antes de actualizar la imagen de un servicio importante, asegurate de que sus datos estan en un volumen y de que tienes copia. Una actualizacion mal hecha sin respaldo puede arruinarte una base de datos. La regla de oro del autoalojamiento: **si no esta respaldado, no existe**.

---

## 7. Que es self-hosting y por que querrias hacerlo

Ya tienes todas las piezas. Ahora el concepto que les da sentido.

> ### 🟦 ¿Que significa? — *Self-hosting (autoalojamiento)*
> Self-hosting es alojar tus propias aplicaciones en tu propio equipo, en vez de pagar y depender de un servicio en la nube de otra empresa. Tus datos viven en tu casa, en tu hardware.
> **Para que sirve:** tener privacidad, control y, a menudo, ahorro; tus archivos y servicios no estan en manos de terceros.
> **Donde aparece en tu NAS real:** polypaw-nas ES tu plataforma de self-hosting. Cada servicio que levantes con Docker o Podman es autoalojamiento puro.

Las razones tipicas para autoalojar:

- **Privacidad:** tus fotos, notas o contrasenas no se suben a la nube de nadie.
- **Control:** tu decides la version, la configuracion y cuando actualizar.
- **Aprendizaje:** se aprende muchisimo de Linux y redes haciendolo.
- **Ahorro:** un servicio que pagarias cada mes lo corres gratis en hardware que ya tienes.

Lo bonito es que ya estabas haciendo self-hosting sin etiquetarlo: **AdGuard Home** corriendo en polypaw-nas para bloquear anuncios en toda tu casa es, en esencia, un servicio autoalojado.

> ### 💡 Tip
> Empieza por UN solo servicio. Levantalo, usalo una semana, vigila la memoria, y solo entonces anade el siguiente. El error tipico del principiante entusiasta es instalar diez cosas el primer dia y ahogar el NAS.

---

## 8. Ideas de servicios para polypaw-nas (y el limite de 8 GB)

Hay cientos de aplicaciones autoalojables. Algunas categorias que encajan bien con un NAS casero:

- **Servidor de fotos:** organiza y muestra tus fotos como una galeria privada.
- **Servidor multimedia:** ver tus peliculas y musica guardadas en `/srv/nas` desde la tele o el celular.
- **Gestor de notas o documentos:** tu propio cuaderno o tu Drive personal.
- **Gestor de contrasenas:** una boveda cifrada autoalojada.
- **Panel de inicio (dashboard):** una pagina con enlaces a todos tus servicios.
- **Descargas y respaldos automaticos:** tareas que organizan o copian datos.

Pero aqui Bit levanta la patita y pone cara seria, porque toca hablar del techo de cristal de polypaw-nas: la memoria.

> ### 🟦 ¿Que significa? — *RAM (memoria)*
> La RAM es la memoria de trabajo del equipo: el espacio donde caben los programas que estan **funcionando en este momento**. Es distinta del disco (donde se guardan las cosas apagadas). Cuando se llena, el sistema se vuelve lentisimo o empieza a cerrar programas.
> **Para que sirve:** correr aplicaciones de forma fluida; cada contenedor encendido ocupa un pedazo de ella.
> **Donde aparece en tu NAS real:** polypaw-nas tiene **8 GB de RAM**, y es un limite fijo (en un laptop Acer Nitro como ese, ampliarla implica abrirlo y cambiar modulos). Es tu recurso mas escaso.

Tus servicios actuales (Samba, Cockpit, Tailscale, AdGuard Home) ya consumen una parte de esos 8 GB, mas lo que gasta Ubuntu Server por su cuenta. Lo que quede es lo que puedes repartir entre tus contenedores.

> ### ⚠️ Cuidado
> Con 8 GB tienes que ser selectivo. Servicios livianos (un panel, un gestor de notas, AdGuard) caben de sobra. Pero servicios pesados, sobre todo los que hacen **reconocimiento de imagenes con IA** o **transcodifican** video en vivo (transcodificar = convertir un video al vuelo a un formato que el dispositivo que mira pueda reproducir; es un trabajo que exige mucha CPU) para varias personas a la vez, pueden devorar la RAM y dejar a polypaw-nas de rodillas. Antes de instalar algo, busca cuanta memoria pide.

Para vigilar la memoria en cualquier momento:

```bash
# Ver memoria total, usada y libre en formato legible
free -h

# Ver, en tiempo real, cuanta RAM y CPU consume cada contenedor
docker stats
```

> ### 🟦 ¿Que significa? — *`docker stats`*
> Es un comando que muestra, en vivo, cuanta memoria y CPU esta gastando cada contenedor en marcha.
> **Para que sirve:** descubrir cual de tus servicios es el "comelon" cuando el NAS va lento.
> **Donde aparece en tu NAS real:** sera tu primer reflejo en polypaw-nas cada vez que notes lentitud: abrir `docker stats` y mirar quien se esta comiendo los 8 GB.

> ### 💡 Tip
> Puedes ponerle a un contenedor un tope de memoria para que nunca pase de cierto limite, protegiendo asi al resto del sistema:
> ```bash
> # Limita este servicio a un maximo de 512 MB de RAM
> docker run -d --name liviano -m 512m nginx
> ```
> En Compose, lo mismo se logra con la opcion `mem_limit: 512m`. Bit lo aprueba: "ponle bozal al comelon antes de que se coma el plato de todos".

> ### 🔎 En tu servidor
> La bateria del laptop Acer Nitro actua como una UPS natural: si se va la luz, polypaw-nas sigue encendido un rato en vez de apagarse de golpe. Eso protege tus datos de cortes bruscos, pero NO sustituye los respaldos ni te da memoria extra. Sigue vigilando esos 8 GB.

---

## 9. Mantenimiento basico y limpieza

Con el tiempo, las imagenes descargadas y los contenedores apagados se acumulan y ocupan espacio en disco. Un par de comandos de limpieza, usados con cabeza:

```bash
# Ver cuanto espacio usan imagenes, contenedores y volumenes
docker system df

# Borrar imagenes y contenedores que ya no se usan (te pregunta antes)
docker system prune
```

> ### ⚠️ Cuidado
> `docker system prune` borra lo que no esta en uso. Por defecto NO toca los volumenes con datos, pero si le anades opciones agresivas (como `--volumes`) podrias borrar datos. Lee siempre lo que el comando te pregunta antes de confirmar con "y". Ante la duda, no confirmes.

Para actualizar un servicio gestionado con Compose, el patron seguro es:

```bash
# Dentro de la carpeta del servicio:
docker compose pull      # baja la version nueva de la imagen
docker compose up -d     # recrea el contenedor con la imagen nueva
```

Como tus datos estan en volumenes (en `/srv/nas`), el contenedor se recrea pero la informacion permanece intacta.

---

## ✅ Checklist — ¿ya domino esto?

- [ ] Explico con mis palabras la diferencia entre una **imagen** (la receta) y un **contenedor** (el plato servido).
- [ ] Se que **Docker** y **Podman** hacen casi lo mismo y que ambos ya estan en polypaw-nas.
- [ ] Puedo arrancar un contenedor de prueba con `docker run` y luego pararlo y borrarlo.
- [ ] Entiendo que `docker compose` me deja describir un servicio en un archivo `docker-compose.yml` y levantarlo con un comando.
- [ ] Comprendo el mapeo de puertos `izquierda:derecha` y se que Cockpit ya usa el 9090.
- [ ] Se que sin **volumenes** pierdo los datos al borrar un contenedor, y que los apunto a `/srv/nas`.
- [ ] Tengo claro que **self-hosting** es alojar mis apps en mi propio polypaw-nas.
- [ ] Se que **NO** debo abrir puertos a internet a la ligera y que para acceso remoto uso **Tailscale**.
- [ ] Vigilo los **8 GB de RAM** con `free -h` y `docker stats`, y se ponerle topes de memoria a un contenedor.

---

## 🧪 Ejercicios

1. **Receta o plato (papel y lapiz).** Escribe con tus propias palabras la diferencia entre imagen y contenedor, usando un ejemplo distinto al de la cocina. Luego responde: ¿cuantos contenedores puedo crear de una sola imagen?

2. 💻 **Hola Docker en polypaw-nas.** Conectate a tu NAS y ejecuta `docker run hello-world`. Confirma que aparece el mensaje "Hello from Docker!". Despues corre `docker ps -a` y localiza el contenedor que acabas de crear (apagado). Bonus: borralo con `docker rm`.

3. 💻 **Servidor web de prueba y puertos.** Levanta un Nginx con `docker run -d --name prueba-web -p 8080:80 nginx`. Desde el propio NAS, comprueba que responde con `curl http://localhost:8080`. Identifica que numero es el puerto del NAS y cual el interno. Al terminar, apagalo y borralo (`docker stop prueba-web` y `docker rm prueba-web`).

4. 💻 **Tu primer Compose con volumen.** Crea la carpeta `/srv/nas/servicios/notas/` y dentro un `docker-compose.yml` basado en el ejemplo de la seccion 4. Levantalo con `docker compose up -d`, verifica con `docker ps` que esta corriendo, y luego bajalo con `docker compose down`. Reflexiona: ¿por que los datos del volumen siguen ahi despues del `down`?

5. 💻 **Vigilar la memoria.** Con uno o varios contenedores corriendo, ejecuta `free -h` y anota cuanta RAM libre te queda de los 8 GB. Despues abre `docker stats` y observa cual contenedor consume mas memoria. Cierralo con Ctrl+C cuando termines.

6. **Plan de seguridad (papel y lapiz).** Imagina que quieres usar un servicio de fotos autoalojado desde tu telefono cuando estes fuera de casa. Explica por que NO abririas el puerto en el router y como usarias Tailscale en su lugar. Anade dos buenas practicas mas de seguridad (pista: contrasenas y respaldos).

---

> Bit cierra el capitulo estirandose: "ya sabes construir tu propio edificio de servicios dentro de polypaw-nas. Recuerda mis tres reglas de oro: cada cosa en su cajita, los datos siempre afuera en `/srv/nas`, y la puerta a la calle... cerrada, que para eso esta el tunel de Tailscale. Ah, y mima esos 8 GB de RAM, que no dan para todo a la vez." En el proximo capitulo seguiremos sacandole jugo a tu NAS.
