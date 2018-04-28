import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import styles from './styles.module.sass';

const AREA_X = 20;
const AREA_Y = 20;

const SNAKE_WIN_LENGTH = 399;

const SNAKE_HEADER = 'SNAKE_HEADER';
const SNAKE_BODY = 'SNAKE_BODY';
const SNAKE_TAIL = 'SNAKE_TAIL';

const APPLE = 'APPLE';

const SNAKE_GO_UP = 'SNAKE_GO_UP';
const SNAKE_GO_DOWN = 'SNAKE_GO_DOWN';
const SNAKE_GO_LEFT = 'SNAKE_GO_LEFT';
const SNAKE_GO_RIGHT = 'SNAKE_GO_RIGHT';

const TIK = 150;

const mapStateToProps = (state) => ({
  keyboard: state.keyboard
});

@connect(mapStateToProps)
class Matrix extends PureComponent {
  state = {
    snakeAreaHash: {},
    appleAreaHash: {},
  };

  static defaultSnake() {
    const SNAKE_DEFAULT_LENGTH = 3; // >= 3
    const SNAKE_DEFAULT_Y = 10;
    const SNAKE_DEFAULT_X = 10;

    let first;
    let last;
    for (let i = 0; i < SNAKE_DEFAULT_LENGTH; i++) {
      const block = {y: SNAKE_DEFAULT_Y + i, x: SNAKE_DEFAULT_X, code: SNAKE_BODY};

      if (!first) {
        first = block;
      }

      if (last) {
        block.parent = last;
        last.children = block;
      }

      block.code = SNAKE_BODY;

      last = block;
    }

    first.vector = SNAKE_GO_UP;
    first.length = SNAKE_DEFAULT_LENGTH;
    first.code = SNAKE_HEADER;
    last.code = SNAKE_TAIL;

    first.last = last;

    return first;
  }

  data = {
    snake: Matrix.defaultSnake(),
    apple: {
      y: 2,
      x: 2,
    },
  };

  getSnakeAreaHash = (snake) => {
    if (snake === undefined) snake = this.data.snake;

    const areaHash = {};
    let block = snake;
    while (block) {
      const y = block.y;
      const x = block.x;

      areaHash[y] = {...areaHash[y], [x]: {code: block.code}};
      block = block.children;
    }

    return areaHash;
  };

  getAppleAreaHash = (apple) => {
    if (apple === undefined) apple = this.data.apple;
    const y = apple.y;
    const x = apple.x;

    return {[y]: {[x]: {code: APPLE}}};
  };

  snakeGoLazily = (code) => {
    if (this.data.snake.vector === SNAKE_GO_UP && code === SNAKE_GO_DOWN
      || this.data.snake.vector === SNAKE_GO_DOWN && code === SNAKE_GO_UP
      || this.data.snake.vector === SNAKE_GO_LEFT && code === SNAKE_GO_RIGHT
      || this.data.snake.vector === SNAKE_GO_RIGHT && code === SNAKE_GO_LEFT) {
      return;
    }

    this.data.snake.nextVector = code;
  };

  randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  snakeGo = (code) => {
    if (!code) code = this.data.snake.nextVector || this.data.snake.vector;

    const snake = this.data.snake;

    const first = snake;
    const firstChildren = first.children;
    const last = first.last;
    const lastParent = last.parent;

    const {appleAreaHash} = this.state;
    if (appleAreaHash[first.y] && appleAreaHash[first.y][first.x]) {
      const apple = this.data.apple;
      const appleY = this.randomInteger(0, AREA_Y - 1);
      const appleX = this.randomInteger(0, AREA_X - 1);
      this.data.apple = {...apple, y: appleY, x: appleX};

      this.setState({appleAreaHash: this.getAppleAreaHash()});

      const block = {x: first.x, y: first.y, code: SNAKE_BODY};
      block.parent = first;
      block.children = firstChildren;

      first.children = block;
      first.length += 1;
      firstChildren.parent = block;
    } else {
      last.code = SNAKE_BODY;
      lastParent.code = SNAKE_TAIL;

      last.y = first.y;
      last.x = first.x;

      last.parent = first;
      first.children = last;

      last.children = firstChildren;
      firstChildren.parent = last;

      lastParent.children = undefined;

      first.last = lastParent;
    }

    if (code === SNAKE_GO_UP)
      first.y = first.y - 1;
    else if (code === SNAKE_GO_DOWN)
      first.y = first.y + 1;
    else if (code === SNAKE_GO_LEFT)
      first.x = first.x - 1;
    else if (code === SNAKE_GO_RIGHT)
      first.x = first.x + 1;

    const snakeAreaHash = this.getSnakeAreaHash(snake);
    const {onGameOver, onWin} = this.props;
    if (onGameOver) {
      if (first.y < 0 || first.x < 0)
        onGameOver();
      if (first.y >= AREA_Y || first.x >= AREA_X)
        onGameOver();

      if (snakeAreaHash
        && snakeAreaHash[first.y]
        && snakeAreaHash[first.y][first.x]
        && snakeAreaHash[first.y][first.x].code !== first.code) {
        onGameOver();
      }
    }

    if (onWin) {
      if (first.length >= SNAKE_WIN_LENGTH) {
        onWin();
      }
    }

    this.data.snake.vector = code;
    this.data.snake.nextVector = undefined;
    this.setState({snakeAreaHash});
  };

  timerSnakeGoId;

  componentWillMount() {
    this.timerSnakeGoId = setInterval(this.snakeGo, TIK);

    this.setState({snakeAreaHash: this.getSnakeAreaHash()});
    this.setState({appleAreaHash: this.getAppleAreaHash()});
  }

  componentWillUnmount() {
    clearInterval(this.timerSnakeGoId);
  }

  componentWillReceiveProps(nextProps) {
    const {keyboard: {keyCode}} = nextProps;

    switch (keyCode) {
      case 87:
        this.snakeGoLazily(SNAKE_GO_UP);
        break;
      case 65:
        this.snakeGoLazily(SNAKE_GO_LEFT);
        break;
      case 83:
        this.snakeGoLazily(SNAKE_GO_DOWN);
        break;
      case 68:
        this.snakeGoLazily(SNAKE_GO_RIGHT);
        break;
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
      cells.push(<div key={`${y}_${x}`} className={cx(styles.cell, this.renderCellClassName(y, x))}/>)
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
    const {className} = this.props;

    return (
      <div className={className}>
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

Matrix.propTypes = {
  className: PropTypes.string,
  onWin: PropTypes.func,
  onGameOver: PropTypes.func,
};

export default Matrix;