const AnomalyComponent = function(chronobot) {
  function removeAnomaly() {
    if (
      chronobot.anomalies.length > 0 &&
      chronobot.water >= 2 &&
      (chronobot.titanium + chronobot.gold + chronobot.uranium >= 2 ||
        chronobot.neutronium > 0)
    ) {
      chronobot.water -= 2;
      let resourcesSpent = 0;

      for (let index = 0; index < 2; index++) {
        if (chronobot.titanium > 0) {
          resourcesSpent++;
          chronobot.titanium--;
          return;
        }
        if (chronobot.gold > 0) {
          resourcesSpent++;
          chronobot.gold--;
          return;
        }
        if (chronobot.uranium > 0) {
          resourcesSpent++;
          chronobot.uranium--;
          return;
        }

        if (index > 0 && resourcesSpent < 2 && chronobot.neutronium > 0) {
          chronobot.neutronium--;
        }
      }

      chronobot.anomalies.pop();

      return "<div>Anomaly removed.</div>";
    }

    return "<div>Anomaly removal failed</div>";
  }

  return {
    removeAnomaly
  };
};