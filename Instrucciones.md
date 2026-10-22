# The Galaxy - Star Wars Holonet Encyclopedia

¡Bienvenido al desafío **The Galaxy**! El objetivo de este proyecto es construir una aplicación web que sirva como una enciclopedia interactiva para consultar información detallada sobre los personajes más relevantes del universo de Star Wars (tanto usuarios de la Fuerza como no usuarios), utilizando la **Starwars-api**.

---

## Objetivos del Proyecto

Debes construir una aplicación completa (*frontend* + *backend*) que permita a los usuarios explorar el catálogo de personajes. Para lograrlo, debes implementar las siguientes características:

### 1. Interfaz de Usuario (UI)
* Diseñar un catálogo claro y funcional. No requiere un diseño específico, pero debe incluir todas las funcionalidades requeridas.
* La interfaz debe ser **adaptable (responsive)** para verse correctamente tanto en dispositivos móviles como en pantallas completas.
* Se debe usar una **imagen por defecto** en caso de que alguna imagen de personaje no esté disponible.

### 2. Servidor Backend
Construir un servidor en Node + Express que reciba las peticiones del *frontend* y gestione las siguientes acciones:
* **Navegación Siguiente / Anterior (Next / Previous):** Permite desplazarse por los personajes uno a uno según el orden de la API. Debe ser **circular**: si estás en el primer personaje y retrocedes, debes ir al último de la lista, y viceversa.
* **Búsqueda por Nombre (Search):** Permite buscar un personaje específico. Si el personaje no existe, debe mostrar una pantalla de error con la opción de volver al inicio de la lista.

---

## Información Requerida por Personaje

Cada ficha de personaje mostrada en la pantalla debe incluir:

* Imagen del personaje
* ID
* Nombre
* Especie
* Género
* Estatura (*Height*)
* Peso / Masa (*Mass*)
* Mundo natal (*Homeworld*)
* Lista de afiliaciones actuales y anteriores (si aplica)
* Fabricante y Modelo (si es un droide)
* Maestro(s) y Aprendiz/ces (si aplica)
* Enlace a la página de la Wiki
* Características adicionales disponibles (ej. cibernética, color de ojos/piel/pelo, lugar de fallecimiento, etc.)

> **Nota:** Algunos campos contienen múltiples entradas. Puedes decidir cómo estructurarlos gráficamente (se sugiere revisar los componentes de **Bootstrap**).

---

## 🛠️ Reglas e Indicaciones Técnicas

* **Código Base:** Se proporciona una estructura inicial para enfocarse en la integración de la API y la lógica del servidor.
* **Restricciones Frontend:** **NO** está permitido usar librerías o plantillas adicionales en el *frontend*.
* **Personalización:** **DEBES** personalizar la apariencia (*Look & Feel*) modificando la paleta de colores, tipografías, etiquetas y/o componentes visuales (Bootstrap).
* **Script `app.js`:** **PUEDES** hacer ajustes o agregar funciones necesarias para conectar la API con la interfaz, pero **NO** debes reescribirlo por completo.

---

## Plazos de Entrega

| Plazo | Modalidad |
| :--- | :--- |
| **0 a 48 horas** | Entrega a tiempo (100% de la nota) |
| **48 a 72 horas** | Entrega con retraso (50% de penalización) |
| **+72 horas** | **No se aceptarán entregas** |

> **Requisito de Entrega:** Se debe proporcionar el enlace a un **repositorio público de Git** que contenga todos los archivos necesarios para ejecutar el servidor localmente. Proporcionar un enlace en vivo (*live link*) añadirá hasta **1 punto extra** a la calificación final.

---

## Rúbrica de Evaluación

| Criterio | Porcentaje |
| :--- | :---: |
| Configuración adecuada del proyecto Node + Express | **30%** |
| Uso correcto de las llamadas a la API | **30%** |
| Visualización adaptativa (Mobile y Desktop) | **20%** |
| Diseño y experiencia visual (*Look & Feel*) | **15%** |
| Manejo robusto de errores | **5%** |
| Modularidad y estructura del código | **5%** |
| Proyecto completo y funcional | **5%** |

---

> **Política sobre Plagio:** El trabajo debe ser original. Aunque se permite la discusión de ideas entre compañeros, el código idéntico será sancionado con una nota de **CERO (0)** para todas las partes involucradas.