import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../atoms/CustomText";
import SmileyFaceIcon from "../../assets/svgs/SmileyfaceIcon";
import { Colors } from "../../utils/colors/colors";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import Dimensions from "../../utils/dimension/dimensions";

const ListEmptyPlaylist = (props: any) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: props?.height,
      }}
    >
      <View>
        <SmileyFaceIcon />
      </View>
      <CustomText
        style={{
          marginTop: 10,
          color: Colors.White,
          fontSize: fontScaleNormalize(22),
          fontFamily: Fonts.Bold,
        }}
      >
        It’s Empty here
      </CustomText>
      <CustomText
        style={{
          marginTop: 10,
          color: Colors.White,
          fontSize: fontScaleNormalize(16),
          fontFamily: Fonts.Regular,
          textAlign: "center",
        }}
      >
        Checkout our new released to find your next favorites.
      </CustomText>
    </View>
  );
};

export default ListEmptyPlaylist;

const styles = StyleSheet.create({});
