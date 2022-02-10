import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.scss';

export function Button({ onClick }) {
    return (
        <div className={style.Button_center}>
            <button
                className={style.Button}
                type='button'
                onClick={onClick}>
                Load more
            </button>
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

