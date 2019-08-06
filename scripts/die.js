const DieViewModel = function(die) {
  const html = `<div class="m-auto text-dark tex-center"><p class="fa-10x text-center">&#x268${die -
    1};</p></div>`;

  return {
    html
  };
};

const DieComponent = function(modal) {
  async function roll() {
    return new Promise(resolve => {
      let die = 0;
      let index = 0;
      modal.setBody(new DieViewModel(1).html);
      modal.show();
      // Set an interval to simulate the dice roll
      let interval = setInterval(() => {
        die = Math.floor(Math.random() * 6);
        die = die === 0 ? 1 : die;
        const dieViewModel = new DieViewModel(die);
        modal.setBody(dieViewModel.html);
        index++;

        if (index + 1 === 7) {
          resolve(die);
          clearInterval(interval);
        }
      }, 150);
    });
  }

  return {
    roll
  };
};

export default DieComponent;
