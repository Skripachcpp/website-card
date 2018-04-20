import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass'

export default class Price extends PureComponent {
  render() {
    return (
      <div className={cx('Price', styles.component)}>
      </div>
    );
  }
}