import React from 'react';
import classes from './MyButton.module.css'

// мы создали стили в виде модуля, то есть записали определенный стиль, а затем просто подкинули нужному тегу

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;