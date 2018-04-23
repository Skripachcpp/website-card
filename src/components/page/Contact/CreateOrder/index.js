import React, {PureComponent} from 'react';
import cx from 'classnames';

export default class CreateOrder extends PureComponent {
  render(){
    return (
      <div className={cx('CreateOrder', 'btn')}>Оставить заявку</div>
    );
  }
}