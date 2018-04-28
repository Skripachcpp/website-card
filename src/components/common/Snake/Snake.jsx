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
        return (
          <Matrix
            className={styles.gameBox}
            onGameOver={() => this.setState({display: SNAKE_GAME_OVER})}
            onWin={() => this.setState({display: SNAKE_WIN})}
          />
        );
      case SNAKE_GAME_OVER:
        return (
          <div className={cx(styles.gameBox, styles.welcome)} onClick={() => this.setState({display: SNAKE_GAME})}>
            <div className={styles.labelBox}>
              <div className={styles.labelGameOver}><h1>Game over. ¯\_(ツ)_/¯</h1></div>
              <button className={cx('btn', styles.startGame)}>New game?</button>
            </div>
          </div>
        );
      case SNAKE_WIN:
        return (
          <div className={cx(styles.gameBox, styles.welcome)} onClick={() => this.setState({display: SNAKE_GAME})}>
            <div className={styles.labelBox}>
              <div className={styles.labelWin}><h1>You win. ^__^</h1></div>
              <button className={cx('btn', styles.startGame)}>New game?</button>
            </div>
          </div>
        );
    }

    return null;
  }
}

export default Snake;