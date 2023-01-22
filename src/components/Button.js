import PropTypes from 'prop-types'

function Button({ text, color, onClick }) {
    return (
        <button
            className="btn"
            onClick={onClick}
            style={{ backgroundColor: color }}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelBlue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
