import React, {PureComponent} from 'react';
import cx from 'classnames';
import styles from './styles.module.sass';
import {connect} from 'react-redux';
import {modalShow} from 'actions/modal';

@connect()
export default class CreateOrder extends PureComponent {
  render(){
    return (
      <div className={cx('CreateOrder', styles.box)}>
        <div className={cx(styles.btnBox)}>
          <div className={cx('btn btn-primary', styles.btn)} onClick={() => {this.props.dispatch(modalShow());}}>Оставить заявку</div>
        </div>
      </div>
    );
  }
}