const scenes = [

  // 0 — INTRODUCCIÓN
  {
    kicker:     "Introducción · El dataset",
    title:      "Dos hoteles en Portugal, 119.390 reservas",
    copy:       "Entre julio de 2015 y agosto de 2017, dos hoteles reales registraron cada movimiento de sus huéspedes. H2, un hotel urbano en Lisboa con 79.330 reservas. H1, un resort en el Algarve con 40.060. El 37% de todas las reservas acabó cancelado. ¿Por qué?",
    note:       "Fuente: Hotel Booking Demand Dataset · António et al., 2019",
    panelImage: "assets/intro-stats.svg"
  },

  // 1 — VIZ 1: Origen de turistas
  {
    kicker: "Visualización 1 · Los protagonistas",
    title:  "¿De dónde vienen y qué Portugal eligen?",
    copy:   "Portugal (PRT) y el Reino Unido (GBR) dominan el Algarve. Francia (FRA) y Alemania (DEU) eligen Lisboa. España (ESP) se reparte entre los dos. El origen del turista ya predice el destino.",
    note:   "Lectura clave: cada país tiene su Portugal preferido.",
    image:  "graficos/origen_turistas.png"
  },

  // 2 — VIZ 2: Estacionalidad normalizada + temperatura (EL CLÍMAX)
  {
    kicker: "Visualización 2 · Clímax · El gran giro",
    title:  "El Algarve y Lisboa no son destinos de verano",
    copy:   "Al filtrar solo las reservas confirmadas, el patrón se invierte. El Algarve tiene su pico en octubre (+15%) y un valle en julio (−6%). Lisboa alcanza su máximo en mayo (+30%). Julio — el mes más turístico en apariencia — es el más vacío para ambos.",
    note:   "El insight central: los datos contradicen la intuición. Octubre es el rey real del Algarve.",
    image:  "graficos/temp_vs_reservas_desviacion_anual.png"
  },

  // 3 — VIZ 3: Tipo de visita por mes
  {
    kicker: "Visualización 3 · Acción descendente",
    title:  "El perfil del viajero cambia radicalmente con las estaciones",
    copy:   "En verano dominan las vacaciones puras y los paquetes — que se cancelan más. En otoño e invierno, el viajero de trabajo toma el relevo, especialmente en Lisboa. Cada mes tiene su viajero. Cada viajero, su Portugal.",
    note:   "Lectura clave: en verano van vacaciones (y cancelaciones). En otoño van negocios (y certeza).",
    image:  "graficos/tipo_viaje_por_mes.png"
  },

  // 4 — VIZ 4: Precio (ADR) + tasa de cancelación
  {
    kicker: "Visualización 4 · Resolución",
    title:  "El verano encarece el Algarve... y lo llena de dudas",
    copy:   "El precio del Algarve pasa de 60€ en enero a 146€ en agosto — un incremento del 144%. Pero la tasa de cancelación también crece con el calor. Lisboa, en cambio, mantiene precios más estables pero una cancelación estructuralmente más alta durante todo el año.",
    note:   "El Algarve dispara precios en verano y los hunde en invierno. Lisboa cancela más, siempre.",
    image:  "graficos/precio_reservas_por_mes_vs_cancelaciones.png"
  },

  // 5 — CONCLUSIÓN
  {
    kicker: "Conclusión · Una lección",
    title:  "Dos hoteles, dos Portugales, una lección",
    copy:   "El Algarve cobra más en verano pero pierde más reservas. El turista inteligente elige octubre: sol sin masificación, 22°C y precios en caída. Lisboa es un destino de negocios disfrazado de turismo urbano. Los datos siempre cuentan una historia más honesta que la intuición.",
    note:   "Los datos siempre cuentan una historia más honesta que la intuición.",
    image:  "graficos/reservas_totales_vs_canceladas.png"
  }
];

// ─── DOM ──────────────────────────────────────────────────────────────────────
const sceneKicker = document.getElementById("scene-kicker");
const sceneTitle  = document.getElementById("scene-title");
const sceneCopy   = document.getElementById("scene-copy");
const sceneNote   = document.getElementById("scene-note");
const sceneImage  = document.getElementById("scene-image");
const stageVisual = document.querySelector(".stage__visual");
const steps       = document.querySelectorAll(".step");
const dots        = document.querySelectorAll(".dot");
const progress    = document.getElementById("progress-fill");

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const updateDots  = (i) => dots.forEach((d, j) => d.classList.toggle("active", j === i));
const fade        = (els, to) => els.forEach(el => el.style.opacity = to);
const panelEls    = () => [sceneKicker, sceneTitle, sceneCopy, sceneNote];

// ─── UPDATE SCENE ─────────────────────────────────────────────────────────────
function updateScene(index) {
  if (index < 0 || index >= scenes.length) return;
  const s = scenes[index];

  steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  updateDots(index);
  fade(panelEls(), 0);
  stageVisual.classList.add("is-fading");

  setTimeout(() => {
    sceneKicker.textContent = s.kicker;
    sceneTitle.textContent  = s.title;
    sceneCopy.textContent   = s.copy;
    sceneNote.textContent   = s.note;
    sceneImage.src          = s.panelImage ?? s.image;
    sceneImage.alt          = s.title;
    fade(panelEls(), 1);
    stageVisual.classList.remove("is-fading");
  }, 200);
}

// ─── SCROLLAMA ────────────────────────────────────────────────────────────────
scrollama()
  .setup({ step: ".step", offset: 0.4 })
  .onStepEnter(({ element }) => updateScene(+element.dataset.scene));

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const pct = window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progress.style.width = `${pct}%`;
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
updateScene(0);
