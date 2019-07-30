const ResearchComponent = function(appState, chronobot) {
  const breakthroughs = ["circle", "triangle", "square"];

  function executeAction() {
    const breakthrough =
      breakthroughs[Math.floor(Math.random * breakthroughs.length)];

    chronobot.breakthroughs[breakthrough]++;

    return "<div>Gained 1 " + breakthrough + " breakthrough";
  }

  return { executeAction };
};

export default ResearchComponent;
