import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.sass';

class Icon extends PureComponent {
  render() {
    return (
      <div
        className={cx(
          'Icon',
          styles.container,
          this.props.disabled ? styles.disabled : null,
          this.props.boxClass,
        )}
        style={{backgroundImage: `url("${this.props.src}")`}}
      >
      </div>
    );
  }
}

Icon.propTypes = {
  boxClass: PropTypes.string,
  disabled: PropTypes.bool
};

Icon.defaultProps = {
  disabled: false
};

export default Icon;