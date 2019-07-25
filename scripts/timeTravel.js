const TimeTravelComponent = function(chronoBot) {
  let html = "";

  function timeTravel() {
    if (chronoBot.timePoints < 12) {
      html += `
    <div>
        <h3>Time Travel</h3>
    </div>
    <div>
        <ul class="list-unstyled">
            <li>
                <p class="badge badge-dark">Remove any one Warp tile from the past Timeline tile where Chronobot has the most Warp tiles (oldest if tied).</p>                
            </li>
        </ul>
    </div>`;
      chronoBot.timePoints += 2;

    } else {
      html += `  
      <div>
        <h3 class="text-danger">Action is not possible. Chronobot scores 2 VP and gains 1 water.</h3>
    </div>`;
    }

    return html;
  }

  return {
    timeTravel
  };
};

export default TimeTravelComponent;
