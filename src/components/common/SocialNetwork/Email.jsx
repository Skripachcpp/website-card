import React from 'react';
import cx from 'classnames';
import Theme from 'components/layout/Theme';
import Icon from '../Icon';
import image from './img/email.png';
import styles from './styles.module.sass';

const Email = props => <a href={Theme.SOCIAL_NETWORK.EMAIL}><Icon {...{...props, src: image, boxClass: cx(styles.email, props.class) }} /></a>;
export default Email;