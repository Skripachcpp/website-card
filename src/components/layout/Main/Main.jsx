import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom'
import cx from 'classnames';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Body from 'components/layout/Body';
import Theme from 'components/layout/Theme';
import styles from './styles.module.sass';

class Main extends PureComponent {
  render() {
    return [
      <Theme />,
      <div className={cx('Main', styles.component)}>
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