import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {connect} from 'react-redux';
import {modalShow} from 'actions/modal';

@connect()
export default class ModalShow extends PureComponent {
  componentWillMount() {
    if (this.props.defaultShow)
      this.props.dispatch(modalShow(this.props.component));
  }

  onClick = (e) => {
    if (this.props.stopPropagation)
      e.stopPropagation();

    if (this.props.component)
      this.props.dispatch(modalShow(this.props.component));
  };

  render() {
    return (
      <div
        className={cx('ModalShow', this.props.className)}
        onClick={this.onClick}
      >
        {this.props.children}
      </div>
    )
  }
}

ModalShow.propTypes = {
  className: PropTypes.string,
  component: PropTypes.element,
  children: PropTypes.element,
  stopPropagation: PropTypes.bool,
  defaultShow: PropTypes.bool,
};

ModalShow.defaultProps = {
  stopPropagation: false
};