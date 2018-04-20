import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.sass';

class Button extends PureComponent {
  render() {
    const {className} = this.props;
    return (
      <div className={cx('Button', styles.component, className)}>
        {this.props.children}
      </div>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Button;