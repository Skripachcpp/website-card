import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Text extends PureComponent {
  state = {
    value: undefined
  };

  onChange(e) {
    const { onChange } = this.props;
    const value = e.target.value;
    this.setState({ value });
    if (onChange) onChange(value);
  }

  render() {
    const value = this.props.value !== undefined
      ? this.props.value
      : this.state.value !== undefined
        ? this.state.value
        : this.props.defaultValue;

    return (
      <textarea
        id={this.props.id}
        name={this.props.name}
        rows={this.props.rows}
        className={cx('Textarea form-control', this.props.className)}
        onChange={::this.onChange}
        value={value}
      />
    );
  }
}

Text.propTypes = {
  className: PropTypes.string,

  id: PropTypes.string,
  rows: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.bool,

  onChange: PropTypes.func,
};

Text.defaultProps = {
  rows: 4
};