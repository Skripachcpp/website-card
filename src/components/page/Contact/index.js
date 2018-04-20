import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';

class Contact extends PureComponent {
  render() {
    return (
      <div className={cx('Contact', styles.box)}>
      </div>
    );
  }
}

export default Contact;