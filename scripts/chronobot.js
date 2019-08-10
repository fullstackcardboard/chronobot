const Chronobot = function() {
  return {
    properties: {
      vp: 0,
      paradox: 0,
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
                <p>Paradox: ${this.properties.paradox}</p>
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
};

export default Chronobot;
