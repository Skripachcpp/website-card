import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.sass';
import Button from '../../common/Button';
import cx from 'classnames';
import {Link} from 'react-router-dom';

class Navigation extends PureComponent {
  render() {
    const {
      componentClass,
      buttonClass,
      lastButtonClass
    } = this.props;
    return (
      <div className={cx(styles.component, componentClass)}>
        <Link to='/'><Button className={cx('NavigationButton', buttonClass)}>Главная</Button></Link>
        <Link to='/info'><Button className={cx('NavigationButton', buttonClass)}>О студии</Button></Link>
        <Link to='/portfolio'><Button className={cx('NavigationButton', buttonClass)}>Портфолио</Button></Link>
        <Link to='/price'><Button className={cx('NavigationButton', buttonClass)}>Услуги и цены</Button></Link>
        <Link to='/contact'><Button className={cx('NavigationButton', buttonClass, lastButtonClass)}>Контакты</Button></Link>
      </div>
    );
  }
}

Navigation.propTypes = {
  componentClass: PropTypes.string,
  buttonClass: PropTypes.string,
  lastButtonClass: PropTypes.string,
};

Navigation.defaultProps = {};

export default Navigation;