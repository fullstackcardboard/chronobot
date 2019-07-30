import ConstructComponent from "./construct.js";
import TimeTravelComponent from "./timeTravel.js";
import AnomalyComponent from "./anomaly.js";
import DieComponent from "./die.js";
import FailComponent from "./fail.js";
import MineComponent from "./mine.js";
import ResearchComponent from "./research.js";
import SupplyComponent from "./supply.js";
import RecruitComponent from "./recruit.js";

const power = new ConstructComponent(appState, chronobot, "power");
const lab = new ConstructComponent(appState, chronobot, "lab");
const support = new ConstructComponent(appState, chronobot, "support");
const factory = new ConstructComponent(appState, chronobot, "factory");
const anomaly = new AnomalyComponent(chronobot);
const mine = new MineComponent(appState, chronobot);
const research = new ResearchComponent(appState, chronobot);
const recruit = new RecruitComponent(appState, chronobot);
const supply = new SupplyComponent(appState, chronobot, recruit);
const timeTravel = new TimeTravelComponent(appState, chronobot);

let chronobot = {
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
    return (
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
  },
  moraleTrack: {
    currentSpace: 0,
    spaces: [
      { cost: 5, vp: 0 },
      { cost: 6, vp: 2 },
      { cost: 7, vp: 5 },
      { cost: 7, vp: 8 },
      { cost: 7, vp: 0 }
    ]
  },
  breakthroughs: {
    circle: 0,
    triangle: 0,
    square: 0
  }
};

const appState = {
  constructEventsBound: false,
  mineEventsBound: false,
  failEventsBound: false,
  state: [],
  updateState: function() {
    this.state.push({
      actions,
      chronobot
    });
  },
  undo: function() {
    if (this.state.length > 0) {
      this.state.pop();
      const state = this.state[this.state.length - 1];
      actions = state.actions;
      chronobot = state.chronobot;
    }
  }
};

let actions = {
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
  document.addEventListener("click", async function(e) {
    handleVisibilityClick(e);
    await handleNextActionClick(e);
    appState.state.push(appState);
  });

  async function handleNextActionClick(e) {
    if (e.target && e.target.id && e.target.id === "nextAction") {
      const die = new DieComponent();
      const result = await die.roll();
      updateActionTriggers(result);
    }
  }

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

function updateActionTriggers(result) {
  const keys = Object.keys(actions);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const action = actions[key];
    if (action.triggers.includes(result)) {
      const nextAction = actions[action.nextAction];
      nextAction.triggers.push(result);
      action.triggers = action.triggers.filter(function(x) {
        return x != result;
      });
    }
  }
}

function init() {
  bindEvents();
  const failComponent = new FailComponent();
}

init();
