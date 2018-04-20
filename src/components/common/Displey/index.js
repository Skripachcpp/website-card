import React, {PureComponent} from 'react';
import Media from 'react-media';

class Displey extends PureComponent {
  render() {
    return (
      <Media query="(min-width: 820px)">
        {m => m
          ?
          <div>
            min-width: 820px
          </div>
          :
          <div>
            min-width: 820px
          </div>
        }
      </Media>
    );
  }
}

export default Displey;