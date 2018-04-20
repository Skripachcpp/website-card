import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import cx from 'classnames';
import Contact from 'components/page/Contact';
import Home from 'components/page/Home';
import Info from 'components/page/Info';
import Portfolio from 'components/page/Portfolio';
import Price from 'components/page/Price';

class Body extends PureComponent {
  render() {
    return (
      <div className={cx('Body')}>
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