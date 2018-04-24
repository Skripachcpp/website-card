import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {modalHide} from 'actions/modal';
import cx from 'classnames';
import TextInput from 'components/common/TextInput';
import Text from 'components/common/Text';
import styles from './styles.module.sass';


@connect()
export default class CreateOrderDialog extends PureComponent {
  state = {
    email: '',
    message: '',
  };

  onSubmit = () => {
    const {email, message} = this.state;

  };

  render() {
    return(
      <div className={cx('CreateOrderDialog', styles.createOrderDialog)}>
        <div
          className={cx(styles.title)}
        >
          <h3>Оставить заявку</h3>
        </div>
        <div className={cx('form-group row')}>
          <label className={'col-12 label300'} for='input-email'>Ваша почта:</label>
          <div className={'col-12'}>
            <TextInput
              id='input-email'
              value={this.state.email}
              pla
              onChange={(e) => this.setState({email: e.value})}
            />
          </div>
        </div>
        <div className={cx('form-group row')}>
          <label className={'col-12 label300'} for='input-message'>Сообщение</label>
          <div className={'col-12'}>
            <Text
              value={this.state.message}
              onChange={(e) => this.setState({message: e.value})}
              rows={10}
              id='input-message'
              placeholder={'Отправить сообщение ... '}
            />
          </div>
        </div>
        <div className={styles.btnBox}>
          <div
            className={cx('btn btn-secondary', styles.btnCancel)}
            onClick={() => {this.props.dispatch(modalHide())}}
          >
            Отмена
          </div>
          <div
            onClick={this.onSubmit}
            className={cx('btn btn-primary', styles.btnOk)}
          >
            Отправить
          </div>
        </div>
      </div>
    );
  }
}