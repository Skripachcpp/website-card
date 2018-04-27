import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
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

const TIK = 250;

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
    const snake = [];

    let parent;
    for (let i = 0; i < SNAKE_DEFAULT_LENGTH; i++) {
      const block = {y: SNAKE_DEFAULT_Y + i, x: SNAKE_DEFAULT_X, code: SNAKE_BODY};

      if (parent) {
        block.parent = parent;
        parent.children = block;
      }

      block.code = SNAKE_BODY;

      parent = block;
      snake.push(block)
    }

    let first = snake[0];
    let last = snake[snake.length - 1];

    first.code = SNAKE_HEADER;
    last.code = SNAKE_TAIL;

    first.last = last;

    return snake;
  }

  data = {
    vector: SNAKE_GO_UP,
    snake: Matrix.defaultSnake(),
    apple: {
      y: 2,
      x: 2,
    },
  };

  getSnakeAreaHash = (snake) => {
    if (snake === undefined) snake = this.data.snake;

    const areaHash = {};
    let block = snake[0];
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
    this.data.vector = code;
  };

  randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  snakeGo = (code) => {
    if (!code) code = this.data.vector;

    const snake = this.data.snake;

    const first = snake[0];
    const firstChildren = first.children;
    const last = first.last;
    const lastParent = last.parent;

    const {appleAreaHash} = this.state;
    if (appleAreaHash[first.y] && appleAreaHash[first.y][first.x]) {
      const apple = this.data.apple;
      const appleY = this.randomInteger(0, AREA_Y);
      const appleX = this.randomInteger(0, AREA_X);
      this.data.apple = {...apple, y: appleY, x: appleX};

      this.setState({appleAreaHash: this.getAppleAreaHash()});

      const block = {x: first.x, y: first.y, code: SNAKE_BODY};
      block.parent = first;
      block.children = firstChildren;

      first.children = block;
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


    this.data.vector = code;

    const snakeAreaHash = this.getSnakeAreaHash(snake);
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
    const {keyboard: {keyCode: newKeyCode}} = nextProps;
    const {keyboard: {keyCode: oldKeyCode}} = this.props;

    if (newKeyCode !== oldKeyCode) {
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