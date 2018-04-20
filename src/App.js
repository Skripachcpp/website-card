import React, {Component} from 'react';
import Main from 'components/layout/Main';
import cx from 'classnames';
import {Route, HashRouter} from 'react-router-dom'
import styles from './styles.module.sass';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className={cx('App', styles.component)}>
        <HashRouter>
          <Route component={Main}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
