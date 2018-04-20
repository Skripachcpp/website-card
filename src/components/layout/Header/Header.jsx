import React, {PureComponent} from 'react';
import cx from 'classnames';
import Navigation from 'components/layout/Navigation'
import styles from './styles.module.sass';

class Header extends PureComponent {
  render() {
    return (
      <div className={cx('Header', styles.component)}>
        <Navigation
          componentClass={cx(styles.navigation)}
          buttonClass={cx(styles.button)}
        />
      </div>
    );
  }
}

export default Header;