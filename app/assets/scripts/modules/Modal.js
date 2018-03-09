import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton = $(".modal__close");
    this.events();
  }

  events() {
    //clicking the open modal
    this.openModalButton.click(this.openModal.bind(this));
    //clicking the X close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    //pushes any key
    $(document).keyup(this.keypressHandler.bind(this));
  }

  keypressHandler(e) {
    if(e.keyCode == 27) {
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");
    return false; //avoid doing the action of the link
  }

  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }


}

export default Modal;
