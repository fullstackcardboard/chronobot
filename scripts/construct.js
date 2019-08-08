const ConstructComponent = function(appState, chronobot, type, modal) {
  let html = "";
  let building = { type };
  let buildingType = "";
  if (building.type === "support") {
    buildingType = "Life Support";
  } else if (building.type === "factory") {
    buildingType = "Factory";
  } else if (building.type === "power") {
    buildingType = "Power Plant";
  } else {
    buildingType = "Lab";
  }
  function bindEvents() {
    if (!appState.constructEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset.action) {
          const targetElement = e.target;
          const action = targetElement.dataset.action;
          if (action === "build") {
            const newBuilding = { type: targetElement.dataset.type };
            const buildingVpInput = document.getElementById("buildVp");
            newBuilding.vp = buildingVpInput.value;
            chronobot.properties.buildings.push(newBuilding);
            chronobot.properties.vp += parseInt(newBuilding.vp);
            modal.hide();
            chronobot.updateDisplay();
            appState.updateState();
          }
        }
      });

      appState.constructEventsBound = true;
    }
  }
  function executeAction() {
    const matchingBuildings = chronobot.properties.buildings.filter(function(
      x
    ) {
      return x.type === building.type;
    });
    const buildable =
      matchingBuildings != undefined && matchingBuildings.length < 3;
    return generateHtml(buildable);
  }

  function generateHtml(buildable) {
    html = `
    <div>
        <h3>Construct ${buildingType}</h3>
    </div>
    <div>
        <ul class="list-unstyled mb-1 mt-1">
            <li class="badge-dark col-12 mb-2 rounded">
                <p>Place a powered up exosuit in an available Construct space with the following preferences:</p>
                <ul class="list-unstyled">
                    <li><p>Top Construct Space > Bottom Construct Space > World Council Space (1st player) > World Council Space</p></li>
                </ul>
            </li>`;

    generateBuildingStepHtml(buildable);

    generateBuildingActionHtml(buildable);

    return html;

    function generateBuildingActionHtml(buildable) {
      if (buildable) {
        html += `
            <div class="col-8 m-auto">
                <select id="buildVp" class="form-control mb-2">
                    <option value="1">1 VP</option>
                    <option value="2">2 VP</option>
                    <option value="3">3 VP</option>
                    <option value="4">4 VP</option>
                </select>
            </div>
            <div class="col-8 m-auto">
                <button class="btn btn-block btn-primary mb-2" data-action="build" data-type="${type}">Build</button>
            </div>`;
      } else {
        html += `
                <div class="col-8 m-auto">
                    <button class="btn btn-block btn-danger mb-2" data-action="fail">Action Failed</button>
                </div>`;
      }
    }

    function generateBuildingStepHtml(buildable) {
      if (buildable) {
        html += `
        <li  class="rounded badge-dark col-12">
            <p>Construct a ${buildingType} with the following preferences:</p>
            <ul class="list-unstyled">
                <li>
                    <p>Most VP > Secondary Building</p>
                </li>
            </ul>
        </li>`;
      } else {
        html += `<li>
            <p class="text-danger">Max number of ${buildingType}s constructed; do not place a building tile.</p>
        </li>`;
      }
      html += `</ul></div>`;
    }
  }

  bindEvents();

  return {
    executeAction
  };
};

export default ConstructComponent;
