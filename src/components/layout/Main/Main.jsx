import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom'
import cx from 'classnames';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Body from 'components/layout/Body';
import Theme from 'components/global/Theme';
import Bootstrap from 'components/global/Bootstrap';
import {Modal} from 'components/common/Modal';
import styles from './styles.module.sass';

class Main extends PureComponent {
  render() {
    return [
      <Bootstrap key='main-bootstrap' />,
      <Theme key='main-theme' />,
      <Modal key='main-modal' />,
      <div  key='main-content' className={cx('Main', styles.component)}>
        <div>
          <Header/>
          <Route component={Body}/>
        </div>
        <Footer/>
      </div>
    ];
  }
}

export default Main;