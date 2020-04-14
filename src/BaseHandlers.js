import { toggleModal } from './Modal';
const BaseHandlers = () => {


    const modalWrapper = document.getElementById('modal');
    const modalOverlay = modalWrapper.querySelector('.modal-overlay');

    if( modalOverlay ){
        modalOverlay.addEventListener('click', toggleModal );
    }


}



export default BaseHandlers;