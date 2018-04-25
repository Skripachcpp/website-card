import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';
import Snake from 'components/common/Snake';

class Home extends PureComponent {
  render() {
    return (
      <div className={cx('Home', styles.component)}>
        <Snake />
      </div>
    );
  }
}

export default Home;