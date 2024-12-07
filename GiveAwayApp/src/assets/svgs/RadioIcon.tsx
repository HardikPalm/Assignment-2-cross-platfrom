import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const RadioIcon = (props: SvgProps) => (
  <Svg width={24} height={22} fill="none" {...props}>
    <G fill={props?.fill} clipPath="url(#a)">
      <Path d="M23.957 8.09v-.017c0-.023-.006-.047-.012-.076-.216-.786-.905-1.363-1.767-1.468-.03-.005-.061-.005-.092-.005-.055 0-.117.005-.172.011-.05.006-.093.006-.13.006-.06 0-.073-.012-.073-.012-.037-.052-.025-.186-.012-.302.006-.07.012-.14.012-.21-.006-.618-.363-.955-1.003-.955H18.677c-.738 0-1.083.326-1.083 1.019 0 .186 0 .379-.025.42-.012.005-.043.017-.16.017-.074 0-.166-.006-.277-.006a9.825 9.825 0 0 0 0-.606.866.866 0 0 0-.861-.839 79.184 79.184 0 0 0-1.194-.011c-.388 0-.782.006-1.188.011-.486.006-.849.356-.867.833v.041a3.74 3.74 0 0 0 .006.524v.041c-.013 0-.037.006-.074.006h-.006c-1.268-.006-2.505-.006-3.551-.006H6.695c-.098 0-.203 0-.252-.006-.006-.04-.012-.128-.018-.21v-.034c-.007-.105 0-.123.129-.163 3.963-1.305 8.012-2.65 12.043-3.99a.346.346 0 0 1 .11-.024c.02 0 .05 0 .118.064.221.198.517.303.83.303.265 0 .53-.075.745-.221A1.19 1.19 0 0 0 20.874.78a1.31 1.31 0 0 0-1.194-.792c-.043 0-.086 0-.123.006-.628.064-1.095.49-1.163 1.06-.006.053-.006.058-.092.088-3.73 1.229-7.643 2.528-11.976 3.966-.024.006-.043.018-.068.024a.849.849 0 0 1-.24.058.202.202 0 0 1-.135-.053c-.13-.07-.277-.07-.363-.07h-.412c-.326 0-.659-.005-.991-.005-.345 0-.652 0-.93.005-.504.006-.873.367-.885.862-.007.199-.007.39 0 .583h-.216c-1.04.03-1.803.612-2.043 1.567 0 .006-.006.011-.006.017l-.019.035L0 8.166v12.162l.006.024c.012.035.019.064.03.099.026.07.044.145.075.22.27.758.984 1.265 1.864 1.323.08.006.16.006.24.006H21.78c.966 0 1.649-.396 2.036-1.17.056-.111.093-.222.123-.333.013-.046.031-.093.044-.14l.012-.029v-8.434l-.05-.052c-.098-.105-.245-.263-.48-.263a.477.477 0 0 0-.196.041c-.363.14-.345.466-.339.606v7.747c0 .629-.412 1.02-1.07 1.025h-3.527c-1.39 0-2.83 0-4.246.006h-.03v-.035c.006-4.404.006-8.912 0-13.409v-.035h.03c1.459.006 2.942.006 4.37.006h3.402c.659 0 1.071.39 1.071 1.02 0 .64.006 1.386 0 2.114 0 .128-.006.478.37.588.061.018.116.03.172.03.141 0 .338-.059.492-.32l.025-.042v-2.79l-.031-.04Zm-5.323-1.834c-.006-.064-.019-.18 0-.198 0 0 .012-.012.08-.012.05 0 .105.006.166.012.068.005.135.011.203.011h.948c.234 0 .412 0 .578-.006h.031v.035c0 .17 0 .35-.018.39-.044.024-.234.024-.419.024h-1.139c-.16 0-.289 0-.405.006h-.013v-.006a.884.884 0 0 0-.012-.256Zm-2.573.262c-.129 0-.264-.006-.436-.006H14.486c-.16 0-.29 0-.412.006h-.012v-.023c0-.175-.007-.356.018-.397.043-.023.24-.023.43-.023h.85c.277 0 .498 0 .701-.006a2.73 2.73 0 0 0 0 .449Zm-3.058 6.314v2.819c0 1.724 0 3.506.006 5.265 0 .041 0 .065-.006.076-.012 0-.037.006-.074.006-2.424-.006-4.775-.006-7.384-.006H2.19c-.733 0-1.139-.378-1.139-1.066V8.591c0-.693.4-1.071 1.133-1.071h3.058c2.363 0 5.04 0 7.668-.006.043 0 .068 0 .08.006 0 .011.006.035.006.075.006 1.748.006 3.524.006 5.237Zm-7.65-6.314c-.128 0-.264-.006-.436-.006H3.772c-.16 0-.295 0-.418.006-.006-.187-.012-.373.012-.42.043-.023.252-.023.437-.023h.855c.271 0 .493 0 .696-.006a2.726 2.726 0 0 0 0 .449Zm14.069-5.283c0-.123.092-.222.215-.227h.012c.117 0 .228.104.234.215.006.11-.098.216-.221.221h-.013c-.135 0-.227-.087-.227-.21Z" />
      <Path d="M22 9.853c-.005-.517-.33-.848-.835-.853h-2.637c-.916 0-1.828 0-2.706.005-.494 0-.814.33-.82.843-.005.44 0 .875 0 1.282 0 .556.32.87.868.87H21.132c.537 0 .863-.33.863-.88.005-.452.005-.854.005-1.267Zm-6.07.1h5.137v.005c-.01.39-.01.743 0 1.084v.011h-.022c-.369 0-.765-.005-1.28-.005H17.2c-.499 0-.878 0-1.237.005h-.027v-.022c.006-.38.006-.76-.005-1.079ZM21.555 17.006c-.027 0-.049-.006-.081-.006H15.593c-.082 0-.174 0-.266.029-.222.07-.342.26-.325.509.016.237.162.41.385.45.048.012.097.012.13.012h5.826c.071 0 .13 0 .185-.006a.487.487 0 0 0 .472-.497.494.494 0 0 0-.445-.491ZM21.663 19.023C21.565 19 21.468 19 21.381 19h-5.778c-.076 0-.158 0-.245.023-.222.053-.358.233-.358.483 0 .25.136.424.364.477.076.017.152.017.222.017h5.821c.077 0 .153 0 .234-.017.223-.053.359-.239.359-.483.005-.238-.125-.419-.337-.477ZM16.503 16c.403 0 .773-.154 1.055-.435a1.504 1.504 0 0 0 .01-2.12 1.486 1.486 0 0 0-1.06-.445h-.01c-.824 0-1.498.672-1.498 1.503 0 .402.155.781.436 1.062.282.28.663.435 1.067.435Zm-.553-1.497c0-.149.056-.287.166-.391a.532.532 0 0 1 .381-.16h.011a.554.554 0 0 1 .542.55.554.554 0 0 1-.542.551h-.005a.546.546 0 0 1-.553-.55ZM21.571 13.451a1.492 1.492 0 0 0-1.06-.451H20.5a1.513 1.513 0 0 0-1.5 1.497c0 .82.665 1.492 1.483 1.503h.011c.825 0 1.495-.666 1.506-1.486a1.495 1.495 0 0 0-.429-1.063Zm-.516 1.046a.558.558 0 0 1-.55.556.558.558 0 0 1-.549-.545.56.56 0 0 1 .555-.556h.005c.286 0 .539.254.539.545ZM6.985 9.046h-.013c-.234.011-.523.023-.818.07-1.896.273-3.465 1.456-4.21 3.174-.738 1.713-.498 3.594.64 5.038.18.228.37.28.493.28a.5.5 0 0 0 .29-.093.482.482 0 0 0 .22-.309c.025-.145-.018-.303-.147-.472-.738-.984-1.003-2.085-.775-3.279.363-1.91 2.27-3.408 4.338-3.408.215 0 .43.018.64.047 1.219.18 2.277.786 2.972 1.695.696.909.973 2.05.776 3.21-.332 1.945-2.246 3.471-4.363 3.471-.24 0-.48-.017-.72-.058-.714-.122-1.33-.361-1.883-.74a.69.69 0 0 0-.388-.14.533.533 0 0 0-.345.134.46.46 0 0 0-.178.379c.012.169.11.326.29.442.971.653 2.036.985 3.162.985.345 0 .708-.03 1.065-.093 2.8-.49 4.714-2.919 4.455-5.65-.228-2.627-2.652-4.678-5.501-4.683Z" />
      <Path d="M7.04 16.566c1.305 0 2.394-1.002 2.425-2.231a2.274 2.274 0 0 0-.677-1.684 2.466 2.466 0 0 0-1.705-.699h-.05c-.651 0-1.26.233-1.716.664a2.227 2.227 0 0 0-.726 1.62c-.019 1.258 1.058 2.3 2.4 2.33h.049Zm-1.39-2.307c0-.344.14-.67.4-.92.258-.25.609-.385.984-.385s.72.134.978.379c.259.245.4.576.4.932-.006.722-.603 1.293-1.372 1.293h-.006c-.763 0-1.385-.583-1.385-1.299Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props?.fill} d="M0 0h24v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default RadioIcon;