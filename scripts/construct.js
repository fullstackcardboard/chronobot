const ConstructComponent = function(appState, chronoBot) {
  let html = "";
  let building = {};

  function bindEvents() {
    if (!appState.constructEventsBound) {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.dataset.action) {
          const targetElement = e.target;
          const action = targetElement.dataset.action;
          if (action === "build") {
            const buildingVpInput = document.getElementById("buildVp");
            building.vp = buildingVpInput.value;
            chronoBot.buildings.push(building);
            $('#modal').modal('toggle');
          }
        }
      });

      appState.constructEventsBound = true;
    }
  }
  function construct(newBuilding) {
    building = newBuilding;
    const matchingBuildings = chronoBot.buildings.filter(function(x) {
      return x.type === building.type;
    });
    const buildable =
      matchingBuildings != undefined && matchingBuildings.length < 3;
    return generateHtml(building, buildable);
  }

  function generateHtml(building, buildable) {
    html = `
    <div>
        <h3>Construct ${building.type}</h3>
    </div>
    <div>
        <ul class="list-unstyled">
            <li class="badge badge-dark col-12 mb-2">
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
        <div class="row mb-2">
            <div class="col-8">
                <select id="buildVp" class="form-control ml-1">
                    <option value="1">1 VP</option>
                    <option value="2">2 VP</option>
                    <option value="3">3 VP</option>
                    <option value="4">4 VP</option>
                </select>
            </div>
            <div class="col-4">
                <button class="btn btn-block mr-1 btn-primary" data-action="build">Build</button>
            </div>
        </div>`;
      } else {
        html += `
                <div class="mb-2">
                    <button class="btn btn-block col-6 m-auto mb-2 btn-secondary" data-action="dismiss">Close</button>
                </div>`;
      }
    }

    function generateBuildingStepHtml(buildable) {
      if (buildable) {
        html += `
        <li  class="badge badge-dark col-12">
            <p>Construct a ${building.type} with the following preferences:</p>
            <ul class="list-unstyled">
                <li>
                    <p>Most VP > Secondary Building</p>
                </li>
            </ul>
        </li>`;
      } else {
        html += `<li>
            <p class="text-danger">Max number of ${
              building.type
            }s constructed; do not place a building tile.</p>
        </li>`;
      }
      html += `</ul></div>`;
    }
  }

  bindEvents();

  return {
    construct
  };
};

export default ConstructComponent;