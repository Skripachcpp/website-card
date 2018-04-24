import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TextInput extends PureComponent {
  state = {
    value: undefined
  };

  onChange(e) {
    const { onChange, name } = this.props;
    const value = e.target.value;
    this.setState({ value });
    if (onChange) onChange({value, name});
  }

  render() {
    const value = this.props.value !== undefined
      ? this.props.value
      : this.state.value !== undefined
        ? this.state.value
        : this.props.defaultValue;

    return (
      <input
        id={this.props.id}
        name={this.props.name}
        className={cx('TextInput form-control', this.props.className)}
        type="text"
        onChange={::this.onChange}
        value={value}
      />
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,

  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.bool,

  onChange: PropTypes.func,
};

TextInput.defaultProps = {
};

export default TextInput;