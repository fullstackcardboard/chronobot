import ConstructComponent from "./construct.js";
import TimeTravelComponent from "./timeTravel.js";

const chronoBot = {
  vp: 0,
  anomalies: [],
  buildings: [],
  timePoints: 0,
  water: 0,
  uranium: 0,
  titanium: 0,
  gold: 0,
  neutronium: 0,
  scientists: 0,
  engineers: 0,
  administrators: 0,
  geniuses: 0,
  get resourcesScoreable() {
    reutrn(
      this.uranium > 0 &&
        this.titanium > 0 &&
        this.gold > 0 &&
        this.neutronium > 0
    );
  },
  get workersScoreable() {
    return (
      this.scientists > 0 &&
      this.engineers > 0 &&
      this.administrators > 0 &&
      this.geniuses > 0
    );
  }
};

const appState = {
  constructEventsBound: false
};

const actions = {
  power: { triggers: [1], nextAction: "time" },
  time: { triggers: [], nextAction: "anomaly" },
  anomaly: { triggers: [], nextAction: "power" },
  refresh: { triggers: [], nextAction: "lab" },
  lab: { triggers: [2], nextAction: "research" },
  research: { triggers: [], nextAction: "mine" },
  mine: { triggers: [3], nextAction: "support" },
  support: { triggers: [4], nextAction: "recruit" },
  recruit: { triggers: [], nextAction: "factory" },
  factory: { triggers: [], nextAction: "refresh" },
  waterTemp: { triggers: [5], nextAction: "support" },
  water: { triggers: [6], nextAction: "superProject" },
  superProject: { triggers: [], nextAction: "water" }
};

function bindEvents() {
  document.addEventListener("click", function(e) {
    handleVisibilityClick(e);
    if (e.target && e.target.id && e.target.id === "nextAction") {
      const targetElement = e.target;
    }
  });

  function handleVisibilityClick(e) {
    if (e.target && e.target.dataset.visible) {
      const targetElement = e.target;
      const visible = targetElement.dataset.visible !== "false";
      if (!visible) {
        document.getElementById("possibleActions").classList.add("d-none");
        document.getElementById("allActions").classList.remove("d-none");
        targetElement.innerHTML = `
            Show Possible <i class="far fa-eye-slash"></i>`;
        targetElement.dataset.visible = "true";
      } else {
        document.getElementById("possibleActions").classList.remove("d-none");
        document.getElementById("allActions").classList.add("d-none");
        targetElement.dataset.visible = "false";
        document.getElementById("visibility").innerHTML = `
            Show All <i class="far fa-eye"></i>`;
      }
    }
  }
}

function rollDice() {
  let die = 0;
  // Set an interval to simulate the dice roll
  let interval = setInterval(() => {
    die = Math.floor(Math.random() * 6);
    die = die === 0 ? 1 : die;
    const dieViewModel = new DieViewModel(die);
    index++;

    if (index + 1 === 7) {
      clearInterval(interval);
      let timeOut = setTimeout(() => {
        if (model.options.moveNeutral) {
          setNeutralSpaces();
          view.renderMoreInfo(
            new SetupViewModel(
              new NeutralSpacesViewModel(model.neutralOne, model.neutralTwo)
            )
          );
        }
        clearTimeout(timeOut);
      }, 750);
    }
  }, 150);

  return die;
}

function init() {
  bindEvents();
}

init();
