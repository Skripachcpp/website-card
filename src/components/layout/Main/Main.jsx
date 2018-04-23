import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom'
import cx from 'classnames';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Body from 'components/layout/Body';
import Theme from 'components/layout/Theme';
import styles from './styles.module.sass';
import Bootstrap from 'components/layout/Bootstrap';

class Main extends PureComponent {
  render() {
    return [
      <Bootstrap key='main-bootstrap' />,
      <Theme key='main-theme' />,
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