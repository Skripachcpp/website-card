import React, {PureComponent} from 'react';
import styles from './styles.module.sass';

const SNAKE_HEADER = 'SNAKE_HEADER';
const SNAKE_BODY = 'SNAKE_BODY';
const SNAKE_TAIL = 'SNAKE_TAIL';

const APPLE = 'APPLE';


class Matrix extends PureComponent {
  state = {
    snake: {
      0: {
        y: 0,
        x: 1,
      },
      1: {
        y: 0,
        x: 0,
      }
    },
    apple: {
      y: 1,
      x: 1,
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

    return {[x]: {[y]: {code: APPLE}}};
  };

  renderCell = (y, x, snakeAreaHash, appleAreaHash) => {
    if (snakeAreaHash[y] && snakeAreaHash[y][x]) {
      switch (snakeAreaHash[y][x].code) {
        case SNAKE_HEADER:
          return <div className={styles.element}>h</div>;
        case SNAKE_BODY:
          return <div className={styles.element}>b</div>;
        case SNAKE_TAIL:
          return <div className={styles.element}>t</div>;
        case APPLE :
          return <div className={styles.element}>a</div>
      }

      return <div className={styles.element}>s</div>;
    } else if(appleAreaHash[y] && appleAreaHash[y][x]){
      return <div className={styles.element}>a</div>
    }

    // switch (elementCode) {
    //   case SNAKE_HEADER:
    //     return <div className={styles.element}>h</div>;
    //   case SNAKE_BODY:
    //     return <div className={styles.element}>b</div>;
    //   case SNAKE_TAIL:
    //     return <div className={styles.element}>t</div>;
    //   case APPLE :
    //     return <div className={styles.element}>a</div>
    // }

    return <div className={styles.element}>-</div>;
  };

  render() {
    const {area} = this.state;

    const snakeAreaHash = this.getSnakeAreaHash();
    const appleAreaHash = this.getAppleAreaHash();

    return (
      <div className={styles.table}>
        {
          Object.keys(area).map(y => (
            <div key={`${y}`} className={styles.row}>
              {
                Object.keys(area[y]).map(x => (
                  <div  key={`${y}_${x}`} className={styles.cell}>
                    {this.renderCell(y, x, snakeAreaHash, appleAreaHash)}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}

export default Matrix;