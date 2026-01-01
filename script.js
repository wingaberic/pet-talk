let language = "es";

const texts = {
  es: {
    title: "🐾 PetTalk",
    subtitle: "Entrena y entiende a tu perro o gato",
    dogTraining: `
      <h3>🐶 Entrenamiento para Perros</h3>
      <ul>
        <li><b>Sentarse:</b> Usa un premio y di “sentado”.</li>
        <li><b>Venir:</b> Llama por su nombre y recompensa.</li>
        <li><b>Quieto:</b> Pide quietud por pocos segundos.</li>
      </ul>
    `,
    catTraining: `
      <h3>🐱 Entrenamiento para Gatos</h3>
      <ul>
        <li><b>Arenero:</b> Llévalo después de comer.</li>
        <li><b>No rascar:</b> Usa rascadores y premios.</li>
        <li><b>Juego:</b> Rutinas cortas todos los días.</li>
      </ul>
    `,
    behaviorTitle: "🧠 Interpretación de comportamiento",
    behaviorSubtitle: "Selecciona lo que observas en tu mascota",
    soundTitle: "🔊 Sonidos de entrenamiento",
    soundSubtitle: "Usa sonidos para entrenar y calmar a tu mascota",
    progressLastActivity: "Última actividad:",
    progressNone: "No hay actividades guardadas.",
    behaviorOptions: {
      noise: "Ladra / Maúlla mucho",
      hide: "Se esconde",
      restless: "Está inquieto",
      calm: "Está muy tranquilo"
    },
    behaviorInterpretations: {
      noise: "Puede estar buscando atención, aburrido o ansioso.",
      hide: "Puede sentir miedo, estrés o necesitar tranquilidad.",
      restless: "Puede necesitar ejercicio o estimulación.",
      calm: "Se siente cómodo y seguro en su entorno."
    }
  },
  en: {
    title: "🐾 PetTalk",
    subtitle: "Train and understand your dog or cat",
    dogTraining: `
      <h3>🐶 Dog Training</h3>
      <ul>
        <li><b>Sit:</b> Use a treat and say “sit”.</li>
        <li><b>Come:</b> Call the dog and reward.</li>
        <li><b>Stay:</b> Ask to stay for a few seconds.</li>
      </ul>
    `,
    catTraining: `
      <h3>🐱 Cat Training</h3>
      <ul>
        <li><b>Litter box:</b> Place after meals.</li>
        <li><b>No scratching:</b> Use scratchers.</li>
        <li><b>Play:</b> Short daily routines.</li>
      </ul>
    `,
    behaviorTitle: "🧠 Behavior Interpretation",
    behaviorSubtitle: "Select what you observe in your pet",
    soundTitle: "🔊 Training Sounds",
    soundSubtitle: "Use sounds to train and calm your pet",
    progressLastActivity: "Last activity:",
    progressNone: "No saved activities.",
    behaviorOptions: {
      noise: "Barks / Meows a lot",
      hide: "Hides",
      restless: "Restless",
      calm: "Very calm"
    },
    behaviorInterpretations: {
      noise: "May be seeking attention, bored, or anxious.",
      hide: "May feel scared, stressed, or need calm.",
      restless: "May need exercise or stimulation.",
      calm: "Feels comfortable and safe."
    }
  }
};

const soundFiles = {
  clicker: new Audio("sounds/clicker.mp3"),
  calm: new Audio("sounds/calm.mp3"),
  attention: new Audio("sounds/attention.mp3")
};

function setLanguage(lang) {
  language = lang;
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("subtitle").innerText = texts[lang].subtitle;
  document.getElementById("behaviorTitle").innerText = texts[lang].behaviorTitle;
  document.getElementById("behaviorSubtitle").innerText = texts[lang].behaviorSubtitle;
  document.getElementById("soundTitle").innerText = texts[lang].soundTitle;
  document.getElementById("soundSubtitle").innerText = texts[lang].soundSubtitle;
  loadProgress();
  clearTraining();
  clearBehavior();
}

function showTraining(pet) {
  clearBehavior();
  if (pet === "dog") {
    document.getElementById("training").innerHTML = texts[language].dogTraining;
    saveProgress(language === "es" ? "Entrenamiento Perro" : "Dog Training");
  } else {
    document.getElementById("training").innerHTML = texts[language].catTraining;
    saveProgress(language === "es" ? "Entrenamiento Gato" : "Cat Training");
  }
}

function clearTraining() {
  document.getElementById("training").innerHTML = "";
}

function selectBehaviorPet(pet) {
  clearTraining();
  let buttonsHTML = `<h3>${language === "es" ? "¿Qué comportamiento observas?" : "What behavior do you see?"}</h3>`;
  const options = texts[language].behaviorOptions;
  for (const key in options) {
    buttonsHTML += `<button onclick="interpret('${pet}', '${key}')">${options[key]}</button>`;
  }
  document.getElementById("behaviors").innerHTML = buttonsHTML;
  document.getElementById("interpretation").innerHTML = "";
}

function clearBehavior() {
  document.getElementById("behaviors").innerHTML = "";
  document.getElementById("interpretation").innerHTML = "";
}

function interpret(pet, behavior) {
  const interpretation = texts[language].behaviorInterpretations[behavior];
  document.getElementById("interpretation").innerHTML = `<p>${interpretation}</p>`;
  saveProgress(language === "es" ? `Comportamiento: ${interpretation}` : `Behavior: ${interpretation}`);
}

function playSound(type) {
  soundFiles[type].currentTime = 0;
  soundFiles[type].play();
}

function saveProgress(activity) {
  localStorage.setItem("lastActivity", activity);
  loadProgress();
}

function loadProgress() {
  const activity = localStorage.getItem("lastActivity");
  const progElem = document.getElementById("progress");
  if (activity) {
    progElem.innerText = (language === "es" ? texts.es.progressLastActivity : texts.en.progressLastActivity) + " " + activity;
  } else {
    progElem.innerText = (language === "es" ? texts.es.progressNone : texts.en.progressNone);
  }
}

// Inicializa con español al cargar la página
window.onload = () => setLanguage("es");