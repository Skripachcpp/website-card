import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@connect()
export default class Modal extends PureComponent {
  render() {
    if (!this.props.modal.open) return null;
    return (
      <div>modal</div>
    );
  }
}

Modal.propTypes = {
  modal: PropTypes.objectOf({
    open: PropTypes.bool,
  })
};