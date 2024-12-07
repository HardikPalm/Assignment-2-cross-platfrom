import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const ShuffleIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G fill={props?.fill} clipPath="url(#b)">
        <Path d="M18.5 17.684h-1.87L4.99 4.203a1.204 1.204 0 0 0-.403-.306A1.15 1.15 0 0 0 4.1 3.79H.5v2.526h3.07L8.48 12 3.57 17.686H.5v2.526h3.601c.167 0 .333-.037.486-.108.153-.071.29-.175.402-.305l5.111-5.92 5.11 5.919c.113.13.25.234.403.305.153.071.319.108.486.108H18.5V24l6-5.054-6-5.052v3.79Z" />
        <Path d="M16.629 6.316h1.87v3.79l6-4.975L18.5 0v3.79h-2.4a1.15 1.15 0 0 0-.486.107c-.153.071-.29.175-.403.306L11.17 8.885l1.776 1.7 3.684-4.27Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props?.fill} d="M.5 0h24v24H.5z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill={props?.fill} d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ShuffleIcon;
