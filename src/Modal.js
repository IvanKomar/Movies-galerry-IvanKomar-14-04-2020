
export const toggleModal = () => {
    const modalRoot = document.getElementById('modal');
    modalRoot.classList.toggle('open');
    document.querySelector('.modal-close').addEventListener('click', (e) => {
        modalRoot.classList.remove('open');
    })
    console.log('root', modalRoot );
}

const ChangeTitle = ( title ) => {
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = title;
}

const ChangeContent = ( node ) => {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = null;
    modalContent.appendChild( node );
}
const Modal = ( title, node ) => {
    ChangeTitle( title );
    ChangeContent( node );    
}

export default Modal;