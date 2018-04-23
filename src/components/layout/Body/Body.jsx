import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import cx from 'classnames';
import Contact from 'components/page/Contact/index';
import Home from 'components/page/Home/index';
import Info from 'components/page/Info/index';
import Portfolio from 'components/page/Portfolio/index';
import Price from 'components/page/Price/index';
import styles from './styles.module.sass';

class Body extends PureComponent {
  render() {
    return (
      <div className={cx('Body', styles.box)}>
        <Switch>
          <Route path='/info' component={Info}/>
          <Route path='/portfolio' component={Portfolio}/>
          <Route path='/price' component={Price}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default Body;