import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {connect} from 'react-redux';
import ReactModal from 'react-bootstrap4-modal';
import styles from './styles.module.sass';
import {modalHide} from 'actions/modal';

const mapStateToProps = (state) => ({
  modal: state.modal
});

@connect(mapStateToProps)
export default class Modal extends PureComponent {
  onClose = () => {
    this.props.dispatch(modalHide());
  };

  render() {
    const {modal: {component, open, fullScreen}} = this.props;
    if (!component) return null;
    return (
      <ReactModal
        visible={open}
        onClickBackdrop={this.onClose}
        dialogClassName={cx('modal-lg', {[styles.modalDialogFullScreen]: fullScreen})}
      >
        <span onClick={this.onClose} className={styles.close} aria-hidden="true">&#x274C;</span>
        {component}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  modal: PropTypes.objectOf({
    open: PropTypes.bool,
  })
};