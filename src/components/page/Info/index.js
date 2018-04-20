import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';

class Info extends PureComponent {
  render() {
    return (
      <div className={cx('Info', styles.box)}>
      </div>
    );
  }
}

export default Info;