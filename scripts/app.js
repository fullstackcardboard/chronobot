import ConstructComponent from "./construct.js";
import TimeTravelComponent from "./timeTravel.js";
import AnomalyComponent from "./anomaly.js";
import DieComponent from "./die.js";
import FailComponent from "./fail.js";
import MineComponent from "./mine.js";
import ResearchComponent from "./research.js";
import SupplyComponent from "./supply.js";
import RecruitComponent from "./recruit.js";
import ModalComponent from "./modal.js";
import WaterComponent from "./water.js";
import ActionDisplayComponent from "./actions.js";
let actionDisplay = {};
const modal = new ModalComponent();

let chronobot = {
  properties: {
    vp: 0,
    anomalies: 0,
    buildings: [],
    timePoints: 0,
    moralePoints: 0,
    water: 0,
    uranium: 0,
    titanium: 0,
    gold: 0,
    neutronium: 0,
    scientists: 0,
    engineers: 0,
    administrators: 0,
    geniuses: 0,
    moraleTrack: {
      currentSpace: 0,
      spaces: [
        { cost: 5, vp: 0 },
        { cost: 6, vp: 2 },
        { cost: 7, vp: 5 },
        { cost: 7, vp: 8 }
      ]
    },
    timeTravelTrack: {
      currentSpace: 0,
      spaces: [
        { vp: 0 },
        { vp: 2 },
        { vp: 4 },
        { vp: 6 },
        { vp: 8 },
        { vp: 10 },
        { vp: 12 }
      ]
    },
    breakthroughs: {
      circle: 0,
      triangle: 0,
      square: 0
    }
  },
  get powerPlants() {
    return this.properties.buildings.filter(function(building) {
      return building.type === "power";
    }).length;
  },
  get factories() {
    return this.properties.buildings.filter(function(building) {
      return building.type === "factory";
    }).length;
  },
  get supports() {
    return this.properties.buildings.filter(function(building) {
      return building.type === "support";
    }).length;
  },
  get labs() {
    return this.properties.buildings.filter(function(building) {
      return building.type === "lab";
    }).length;
  },
  get superProjects() {
    return this.properties.buildings.filter(function(building) {
      return building.type === "super";
    }).length;
  },
  get resourcesScoreable() {
    return (
      this.properties.uranium > 0 &&
      this.properties.titanium > 0 &&
      this.properties.gold > 0 &&
      this.properties.neutronium > 0
    );
  },
  get workersScoreable() {
    return (
      this.properties.scientists > 0 &&
      this.properties.engineers > 0 &&
      this.properties.administrators > 0 &&
      this.properties.geniuses > 0
    );
  },
  get breakthroughsScoreable() {
    return (
      this.properties.breakthroughs.circle > 0 &&
      this.properties.breakthroughs.square > 0 &&
      this.properties.breakthroughs.triangle > 0
    );
  },
  updateDisplay: function() {
    document.getElementById("stats").innerHTML = `
    <div class="col">
        <div class="row">
            <div class="col">
                <p>VP: ${this.properties.vp +
                  this.properties.timePoints +
                  this.properties.moralePoints}</p>
            </div>
            <div class="col">
                <p>Water: ${this.properties.water}</p>
            </div>
            <div class="col">
                <p>Anomalies: ${this.properties.anomalies}</p>
            </div>
          </div>
      </div>
      <div class="col">
          <h4>Resources</h4>
        <div class="row">
            <div class="col">
                <p>Ne: ${this.properties.neutronium}</p>
            </div>
            <div class="col">
                <p>Ur: ${this.properties.uranium}</p>
            </div>
            <div class="col">
                <p>Gold: ${this.properties.gold}</p>
            </div>
            <div class="col">
                <p>Ti: ${this.properties.titanium}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <h4>Workers</h4>
          <div class="row">
            <div class="col">
                <p>Sc: ${this.properties.scientists}</p>
            </div>
            <div class="col">
                <p>En: ${this.properties.engineers}</p>
            </div>
            <div class="col">
                <p>Admin: ${this.properties.administrators}</p>
            </div>
            <div class="col">
                <p>Gen: ${this.properties.geniuses}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <h4>Buildings</h4>
          <div class="row">
            <div class="col">
                <p>Power: ${this.powerPlants}</p>
            </div>
            <div class="col">
                <p>Fact: ${this.factories}</p>
            </div>
            <div class="col">
                <p>Life: ${this.supports}</p>
            </div>
            <div class="col">
                <p>Labs: ${this.labs}</p>
            </div>
            <div class="col">
                <p>Super: ${this.superProjects}</p>
            </div>
        </div>
      </div>
        <div class="col">
          <h4>Breakthroughs</h4>
          <div class="row">
            <div class="col">
                <p>Circle: ${this.properties.breakthroughs.circle}</p>
            </div>
            <div class="col">
                <p>Square: ${this.properties.breakthroughs.square}</p>
            </div>
            <div class="col">
                <p>Triangle: ${this.properties.breakthroughs.triangle}</p>
            </div>
        </div>
      </div>`;
  }
};

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const appState = {
  constructEventsBound: false,
  mineEventsBound: false,
  failEventsBound: false,
  state: [],
  updateState: function() {
    this.state.push({
      actions: deepCopy(actions),
      properties: deepCopy(chronobot.properties)
    });
  },
  undo: function() {
    if (this.state.length > 1) {
      this.state = this.state.filter(element => {
        return element != this.state[this.state.length - 1];
      });
      const previousState = this.state[this.state.length - 1];
      actions = previousState.actions;
      chronobot.properties = previousState.properties;
      chronobot.updateDisplay();
      actionDisplay.updateDisplays(actions);
    }
  }
};

const components = {
  recruit: new RecruitComponent(appState, chronobot, modal),
  power: new ConstructComponent(appState, chronobot, "power", modal),
  lab: new ConstructComponent(appState, chronobot, "lab", modal),
  support: new ConstructComponent(appState, chronobot, "support", modal),
  factory: new ConstructComponent(appState, chronobot, "factory", modal),
  anomaly: new AnomalyComponent(appState, chronobot, modal),
  mine: new MineComponent(appState, chronobot, modal),
  research: new ResearchComponent(appState, chronobot, modal),
  supply: new SupplyComponent(
    chronobot,
    new RecruitComponent(appState, chronobot, modal)
  ),
  time: new TimeTravelComponent(appState, chronobot, modal),
  water: new WaterComponent(appState, chronobot, modal),
  waterTemp: new WaterComponent(appState, chronobot, modal),
  superProject: new ConstructComponent(appState, chronobot, "super", modal)
};

let actions = {
  power: { triggers: [1], nextAction: "time" },
  time: { triggers: [], nextAction: "anomaly" },
  anomaly: { triggers: [], nextAction: "power" },
  supply: { triggers: [], nextAction: "lab" },
  lab: { triggers: [2], nextAction: "research" },
  research: { triggers: [], nextAction: "mine" },
  mine: { triggers: [3], nextAction: "support" },
  support: { triggers: [4], nextAction: "recruit" },
  recruit: { triggers: [], nextAction: "factory" },
  factory: { triggers: [], nextAction: "supply" },
  waterTemp: { triggers: [5], nextAction: "support" },
  water: { triggers: [6], nextAction: "superProject" },
  superProject: { triggers: [], nextAction: "water" }
};

function bindEvents() {
  document.addEventListener("click", async function(e) {
    handleUndoClick(e);
    handleVisibilityClick(e);
    await handleNextActionClick(e);
  });

  function handleUndoClick(e) {
    if (
      e.target &&
      e.target.dataset &&
      e.target.dataset.action &&
      e.target.dataset.action === "undo"
    ) {
      appState.undo();
    }
  }

  async function handleNextActionClick(e) {
    if (e.target && e.target.id && e.target.id === "nextAction") {
      const die = new DieComponent(modal);
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
  console.log("Rolled " + result);
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

      const component = components[key];
      modal.show();
      if (component && "executeAction" in component) {
        modal.setBody(component.executeAction());
        console.log(key.toUpperCase() + " executed");
      } else {
        console.log(key.toUpperCase() + " failed");
      }
      actionDisplay.updateDisplays(actions);
      return;
    }
  }
}

function init() {
  bindEvents();
  const failComponent = new FailComponent(appState, chronobot, modal);
  appState.updateState();
  chronobot.updateDisplay();
  actionDisplay = new ActionDisplayComponent();
  actionDisplay.updateDisplays(actions);
}

init();
