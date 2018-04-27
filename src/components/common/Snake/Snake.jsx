import React, {PureComponent} from 'react';
import cx from 'classnames';
import Matrix from './Matrix';
import styles from './styles.module.sass';

const SNAKE_WELCOME = 'SNAKE_WELCOME';
const SNAKE_GAME = 'SNAKE_GAME';
const SNAKE_WIN = 'SNAKE_WIN';
const SNAKE_GAME_OVER = 'SNAKE_GAME_OVER';

class Snake extends PureComponent {
  state = {
    display: SNAKE_WELCOME
  };


  render() {
    const {display} = this.state;
    switch (display) {
      case SNAKE_WELCOME:
        return (
          <div className={cx(styles.gameBox, styles.welcome)} onClick={() => this.setState({display: SNAKE_GAME})}>
            <button className={cx('btn', styles.startGame)}>Start game</button>
          </div>
        );
      case SNAKE_GAME:
        return (<Matrix onGameOver={() => this.setState({display: SNAKE_GAME_OVER})} className={styles.gameBox}/>);
      case SNAKE_WIN:
        return (<div className={styles.gameBox}>SNAKE_WIN</div>);
      case SNAKE_GAME_OVER:
        return (<div className={styles.gameBox}>SNAKE_GAME_OVER</div>);
    }

    return null;
  }
}

export default Snake;