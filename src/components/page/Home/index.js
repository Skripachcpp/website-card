import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';

class Home extends PureComponent {
  render() {
    return (
      <div className={cx('Home', styles.component)}>
      </div>
    );
  }
}

export default Home;