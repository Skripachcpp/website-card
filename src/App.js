import React, {PureComponent} from 'react';
import Main from 'components/layout/Main';
import cx from 'classnames';
import {Route, HashRouter} from 'react-router-dom'
import './App.sass';

class App extends PureComponent {
  render() {
    return (
      <div className={cx('App')}>
        <HashRouter>
          <Route component={Main}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
