import React, {PureComponent} from 'react';
import styles from './styles.module.sass';

const SNAKE_HEADER = 'SNAKE_HEADER';
const SNAKE_BODY = 'SNAKE_BODY';
const SNAKE_TAIL = 'SNAKE_TAIL';

const APPLE = 'APPLE';


const SNAKE_GO_UP = 'SNAKE_GO_UP';
const SNAKE_GO_DOWN = 'SNAKE_GO_DOWN';
const SNAKE_GO_LEFT = 'SNAKE_GO_LEFT';
const SNAKE_GO_RIGHT = 'SNAKE_GO_RIGHT';

class Matrix extends PureComponent {
  state = {
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
    area: {
      0: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      1: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      2: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      3: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      4: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      5: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      6: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      7: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      8: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
      9: {0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',},
    }
  };

  data = {
    vector: SNAKE_GO_UP
  };

  getSnakeAreaHash = () => {
    const {snake} = this.state;
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

  getAppleAreaHash = () => {
    const {apple} = this.state;
    const y = apple.y;
    const x = apple.x;

    return {[y]: {[x]: {code: APPLE}}};
  };

  renderCell = (y, x, snakeAreaHash, appleAreaHash) => {
    if (snakeAreaHash[y] && snakeAreaHash[y][x]) {
      switch (snakeAreaHash[y][x].code) {
        case SNAKE_HEADER:
          return <div className={styles.element}>h</div>;
        case SNAKE_TAIL:
          return <div className={styles.element}>t</div>;
        case SNAKE_BODY:
          return <div className={styles.element}>b</div>;
        case APPLE :
          return <div className={styles.element}>a</div>
      }

      return <div className={styles.element}>s</div>;
    } else if (appleAreaHash[y] && appleAreaHash[y][x]) {
      return <div className={styles.element}>a</div>
    }

    return <div className={styles.element}>-</div>;
  };

  snakeGo = (code) => {
    if (!code) code = this.data.vector;

    const snake = {...this.state.snake};

    const appleAreaHash = this.getAppleAreaHash();
    const head = snake[0];
    const length = Object.keys(snake).length;
    if (appleAreaHash[head.y] && appleAreaHash[head.y][head.x]) {
      snake[length] = {};
      this.setState({apple: {...this.state.apple, x: 7, y: 2}});
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
    this.setState({snake});
  };

  timerSnakeGoId;
  componentWillMount() {
    this.timerSnakeGoId = setInterval(this.snakeGo, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerSnakeGoId);
  }

  render() {
    const {area} = this.state;

    const snakeAreaHash = this.getSnakeAreaHash();
    const appleAreaHash = this.getAppleAreaHash();

    return (
      <div>
        <div onClick={() => this.snakeGo(SNAKE_GO_UP)}>SNAKE_GO_UP</div>
        <div onClick={() => this.snakeGo(SNAKE_GO_DOWN)}>SNAKE_GO_DOWN</div>
        <div onClick={() => this.snakeGo(SNAKE_GO_LEFT)}>SNAKE_GO_LEFT</div>
        <div onClick={() => this.snakeGo(SNAKE_GO_RIGHT)}>SNAKE_GO_RIGHT</div>

        <div onClick={this.snakeGo} className={styles.table}>
          {
            Object.keys(area).map(y => (
              <div key={`${y}`} className={styles.row}>
                {
                  Object.keys(area[y]).map(x => (
                    <div key={`${y}_${x}`} className={styles.cell}>
                      {this.renderCell(y, x, snakeAreaHash, appleAreaHash)}
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Matrix;