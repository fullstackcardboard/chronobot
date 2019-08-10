const DieViewModel = function(die, sizeClass) {
  const html = `<div class="m-auto text-dark tex-center"><p class="${sizeClass} text-center">&#x268${die -
    1};</p></div>`;

  return {
    html
  };
};

const DieResultViewModel = function(die){
  const html = `&#x268${die - 1};`;

  return {
    html
  }
}

const DieComponent = function(modal) {
  async function roll() {
    return new Promise(resolve => {
      let die = 0;
      let index = 0;
      modal.setBody(new DieViewModel(1).html);
      modal.show();
      // Set an interval to simulate the dice roll
      let interval = setInterval(() => {
        die = Math.floor(Math.random() * 7);
        die = die === 0 ? 1 : die;
        die = die > 6 ? 6 : die;
        const dieViewModel = new DieViewModel(die, "fa-10x");
        modal.setBody(dieViewModel.html);
        index++;

        if (index + 1 === 7) {
          clearInterval(interval);
          resolve({ die, html: new DieResultViewModel(die).html });
        }
      }, 150);
    });
  }

  return {
    roll
  };
};

export default DieComponent;
