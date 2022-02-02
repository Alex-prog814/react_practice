import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        // когда хотим добавить 2 класса одному блоку, можем воспользоваться такой конструкцией, распаковать классы и объединить их при помощи жоин
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* реализовали следующую логику, при нажатии на темную область, модалка скрывается, при нажатии на контентную часть событие останавливается, в этом помогает функция stopPrepagation() */}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;