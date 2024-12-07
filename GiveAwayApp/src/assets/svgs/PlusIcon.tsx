import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const PlusIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M10 0c1.105 0 1.429.895 1.429 2v6.571H18c1.105 0 2 .324 2 1.429s-.895 1.429-2 1.429h-6.571V18c0 1.105-.324 2-1.429 2s-1.429-.895-1.429-2v-6.571H2c-1.105 0-2-.324-2-1.429s.895-1.429 2-1.429h6.571V2c0-1.105.324-2 1.429-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default PlusIcon;
