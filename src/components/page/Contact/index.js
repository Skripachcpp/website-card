import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';
import CreateOrder from './CreateOrder'

class Contact extends PureComponent {
  render() {
    return (
      <div className={cx('Contact', styles.box)}>
        <CreateOrder />
      </div>
    );
  }
}

export default Contact;