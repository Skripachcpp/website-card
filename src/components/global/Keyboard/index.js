import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.module.sass';
import {keyDown} from 'actions/keyboard'

@connect()
class Keyboard extends PureComponent {
  onKeyDown = (e) => {
    this.props.dispatch(keyDown(e.keyCode));
  };

  render() {
    const {children, className} = this.props;
    return (
      <div
        className={cx('Keyboard', styles.box, className)}
        onKeyDown={this.onKeyDown}
        tabIndex="0"
      >
        {children}
      </div>
    );
  }
}

Keyboard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element
};

export default Keyboard;