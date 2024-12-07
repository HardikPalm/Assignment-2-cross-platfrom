import * as React from "react"
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PauseLogo = (props: SvgProps) => (
    <Svg fill="none" {...props}>
        <G filter="url(#a)">
            <Circle
                cx={145.378}
                cy={145.728}
                r={72.163}
                fill="#fff"
                fillOpacity={0.46}
            />
            <Circle
                cx={145.378}
                cy={145.728}
                r={72.163}
                stroke="#fff"
                strokeOpacity={0.31}
            />
        </G>
        <Path
            stroke="#fff"
            strokeWidth={7.826}
            d="M123.336 119.138v53.182M165.533 119.138v53.182"
        />
        <Defs></Defs>
    </Svg>
)
export default PauseLogo
