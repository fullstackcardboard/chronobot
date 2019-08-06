const ModalComponent = function() {
  const modal = $("#modal");
  const body = document.getElementById("modalBody");
  function show() {
    modal.modal('show');
  }

  function hide() {
    modal.modal("hide");
  }

  function setBody(html) {
    body.innerHTML = html;
  }

  return {
    show,
    hide,
    setBody
  };
};

export default ModalComponent;
