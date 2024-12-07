import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors/colors";
import LeftArrowIcon from "../../assets/svgs/LeftArrowIcon";
import CustomText from "../atoms/CustomText";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import deviceInfoModule from "react-native-device-info";
import Dimensions from "../../utils/dimension/dimensions";

const HeaderBar = (props: any) => {
  let hasNotch = deviceInfoModule.hasNotch();
  const { onPressBack, screenName, mainStyle, icon } = props;
  return (
    <View
      style={[
        styles.mainView,
        {
          paddingTop:
            Platform.OS == "ios" ? (hasNotch ? 92 : 70) : Dimensions.HP_2,
        },
        mainStyle,
      ]}
    >
      <Pressable style={styles.firstView} onPress={onPressBack}>
        <LeftArrowIcon />
      </Pressable>
      <View style={styles.textViewStyle}>
        <CustomText style={styles.textStyle}>{screenName}</CustomText>
      </View>
      <View style={styles.thirdView}>{icon}</View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
  },
  textViewStyle: {},
  textStyle: {
    color: Colors.White,
    fontSize: fontScaleNormalize(18),
    fontFamily: Fonts.SemiBold,
  },
  firstView: {},
  thirdView: {},
});
