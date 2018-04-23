import React from 'react';
import cx from 'classnames';
import Theme from 'components/global/Theme';
import image from './img/vk.png';
import Icon from '../Icon';

const Vk = props => <a href={Theme.SOCIAL_NETWORK.VK} target="_blank"><Icon {...{...props, src: image, class: cx(props.class) }} /></a>;
export default Vk;