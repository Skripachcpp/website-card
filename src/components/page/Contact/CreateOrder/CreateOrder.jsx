import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';
import {ModalShow} from 'components/global/Modal'
import CreateOrderDialog from './CreateOrderDialog';

export default class CreateOrder extends PureComponent {
  render(){
    return (
      <div className={cx('CreateOrder', styles.box)}>
        <div className={cx(styles.btnBox)}>
          <ModalShow
            className={cx('btn btn-primary', styles.btn)}
            component={<CreateOrderDialog />}
          >
            Оставить заявку
          </ModalShow>
        </div>
      </div>
    );
  }
}