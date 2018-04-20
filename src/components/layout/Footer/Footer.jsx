import React, {PureComponent} from 'react';
import Media from 'react-media';
import cx from 'classnames';
import Navigation from 'components/layout/Navigation/index'
import {Email, Vk} from 'components/common/SocialNetwork';
import styles from './styles.module.sass'

class Footer extends PureComponent {
  render() {
    return (
      <div className={cx('Footer', styles.component)}>
        <Media query="(max-width: 880px)">
          {m => m ? (null) : (
              <Navigation
                componentClass={styles.navigation}
                buttonClass={styles.button}
                lastButtonClass={styles.lastButton}
              />
            )
          }
        </Media>
        <div className={styles.network}>
          <div className={styles.networkLinks}>
            <Email boxClass={styles.networkLink}/>
            <Vk boxClass={styles.networkLink}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;