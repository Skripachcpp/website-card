import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import styles from './styles.module.sass';

const AREA_X = 20;
const AREA_Y = 20;

const SNAKE_HEADER = 'SNAKE_HEADER';
const SNAKE_BODY = 'SNAKE_BODY';
const SNAKE_TAIL = 'SNAKE_TAIL';

const APPLE = 'APPLE';


const SNAKE_GO_UP = 'SNAKE_GO_UP';
const SNAKE_GO_DOWN = 'SNAKE_GO_DOWN';
const SNAKE_GO_LEFT = 'SNAKE_GO_LEFT';
const SNAKE_GO_RIGHT = 'SNAKE_GO_RIGHT';

const mapStateToProps = (state) => ({
  keyboard: state.keyboard
});

@connect(mapStateToProps)
class Matrix extends PureComponent {
  state = {
    snakeAreaHash: {},
    appleAreaHash: {},
  };

  data = {
    vector: SNAKE_GO_UP,
    snake: {
      0: {
        y: 4,
        x: 4,
      },
      1: {
        y: 4,
        x: 3,
      },
      2: {
        y: 4,
        x: 2,
      },
      3: {
        y: 4,
        x: 1,
      },
    },
    apple: {
      y: 2,
      x: 2,
    },
  };

  getSnakeAreaHash = (snake) => {
    if (snake === undefined) snake = this.data.snake;

    const keys = Object.keys(snake);
    const areaHash = {};

    let first;
    let last;
    keys.forEach(key => {
      const block = snake[key];
      const y = block.y;
      const x = block.x;

      const element = {code: SNAKE_BODY};
      if (!first) first = element;
      last = element;

      areaHash[y] = {...areaHash[y], [x]: element};
    });

    if (first) first.code = SNAKE_HEADER;
    if (last) last.code = SNAKE_TAIL;

    return areaHash;
  };

  getAppleAreaHash = (apple) => {
    if (apple === undefined) apple = this.data.apple;
    const y = apple.y;
    const x = apple.x;

    return {[y]: {[x]: {code: APPLE}}};
  };

  snakeGoLazily = (code) => {
    this.data.vector = code;
  };

  snakeGo = (code) => {
    if (!code) code = this.data.vector;

    const snake = {...this.data.snake};

    const appleAreaHash = this.getAppleAreaHash();
    const head = snake[0];
    const length = Object.keys(snake).length;
    if (appleAreaHash[head.y] && appleAreaHash[head.y][head.x]) {
      snake[length] = {};

      const apple = this.data.apple;
      this.data.apple = {...apple, y: 5, x: 7};
      this.setState({appleAreaHash: this.getAppleAreaHash()});
    }

    let parentBlock;
    Object.keys(snake).forEach(key => {
      const block = snake[key];

      if (!parentBlock) {
        parentBlock = {y: block.y, x: block.x};

        if (code === SNAKE_GO_UP)
          block.y = block.y - 1;
        else if (code === SNAKE_GO_DOWN)
          block.y = block.y + 1;
        else if (code === SNAKE_GO_LEFT)
          block.x = block.x - 1;
        else if (code === SNAKE_GO_RIGHT)
          block.x = block.x + 1;

      } else {
        const y = parentBlock.y;
        const x = parentBlock.x;

        parentBlock.y = block.y;
        parentBlock.x = block.x;

        block.y = y;
        block.x = x;
      }
    });

    this.data.vector = code;
    const snakeAreaHash = this.getSnakeAreaHash(snake);
    this.setState({snakeAreaHash});
  };

  timerSnakeGoId;

  componentWillMount() {
    this.timerSnakeGoId = setInterval(this.snakeGo, 500);

    this.setState({snakeAreaHash: this.getSnakeAreaHash()});
    this.setState({appleAreaHash: this.getAppleAreaHash()});
  }

  componentWillUnmount() {
    clearInterval(this.timerSnakeGoId);
  }

  componentWillReceiveProps(nextProps) {
    const {keyboard: {keyCode: newKeyCode}} = nextProps;
    const {keyboard: {keyCode: oldKeyCode}} = this.props;

    if (newKeyCode !== oldKeyCode) {
      console.log('newKeyCode', newKeyCode);
      switch (newKeyCode) {
        case 87:
          this.data.vector = SNAKE_GO_UP;
          break;
        case 65:
          this.data.vector = SNAKE_GO_LEFT;
          break;
        case 83:
          this.data.vector = SNAKE_GO_DOWN;
          break;
        case 68:
          this.data.vector = SNAKE_GO_RIGHT;
          break;
      }
    }
  }

  renderCellClassName(y, x) {
    const {snakeAreaHash, appleAreaHash} = this.state;
    if (snakeAreaHash[y] && snakeAreaHash[y][x]) {
      switch (snakeAreaHash[y][x].code) {
        case SNAKE_HEADER:
          return styles.snakeHeader;
        case SNAKE_TAIL:
          return styles.snakeTail;
        case SNAKE_BODY:
          return styles.snakeBody;
      }

      return styles.empty;
    } else if (appleAreaHash[y] && appleAreaHash[y][x]) {
      return styles.apple;
    }

    return styles.empty;
  }

  renderCells = (y) => {
    const cells = [];
    for (let x = 0; x < AREA_X; x++) {
      cells.push(<div key={`${y}_${x}`} className={cx(styles.cell, this.renderCellClassName(y, x))} />)
    }

    return cells;
  };

  renderRows = () => {
    const rows = [];
    for (let y = 0; y < AREA_Y; y++) {
      rows.push(<div key={`${y}`} className={styles.row}>{this.renderCells(y)}</div>)
    }

    return rows;
  };

  render() {
    return (
      <div>
        <div className={styles.table}>
          {this.renderRows()}
        </div>
        <div className={styles.wasdBox}>
          <div className={styles.wBox}>
            <div className={styles.wasdBtn} onClick={() => this.snakeGoLazily(SNAKE_GO_UP)}>W</div>
          </div>
          <div className={styles.asdBox}>
            <div className={styles.wasdBtn} onClick={() => this.snakeGoLazily(SNAKE_GO_LEFT)}>A</div>
            <div className={styles.wasdBtn} onClick={() => this.snakeGoLazily(SNAKE_GO_DOWN)}>S</div>
            <div className={styles.wasdBtn} onClick={() => this.snakeGoLazily(SNAKE_GO_RIGHT)}>D</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Matrix;