import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Images } from "../../utils/imageSource/imageSource";
import CustomText from "../atoms/CustomText";
import { Colors } from "../../utils/colors/colors";
import LinearGradient from "react-native-linear-gradient";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import Dimensions from "../../utils/dimension/dimensions";
import { UserDataContext } from "../../context/user_context";

const CuratedListCardComponent = (props: any) => {
  const { currentSong } = useContext(UserDataContext);
  const { item, onPressPlayList } = props;
  const isMatched = currentSong?.playlistId === item?.playlistId;
  return (
    <Pressable style={styles.mainView} onPress={onPressPlayList}>
      <LinearGradient
        colors={Colors.Card1LinearGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientStyle}
      >
        <Image
          source={{ uri: item?.imageUrl }}
          style={styles.imageStyle}
        ></Image>
      </LinearGradient>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: Dimensions.WP_70,
        }}
      >
        <View style={styles.textView}>
          <CustomText style={[styles.text1, isMatched && { color: "green" }]}>
            {item?.name?.length > 15
              ? `${item?.name.substring(0, 15)}...`
              : item?.name}
          </CustomText>
          <CustomText style={styles.text2}>{item?.total + " Songs"}</CustomText>
        </View>
        <View style={styles.textView}>
          <CustomText style={styles.text2}>
            {/* <Image
              // style={{ height: "100%" }}
              source={{ uri: `../../../src/assets/images/music.gif` }}
            /> */}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};

export default CuratedListCardComponent;

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderWidth: 1,
    // borderColor: "red",
  },
  textView: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  imageStyle: {
    height: 80,
    width: 80,
    overflow: "hidden",
    borderRadius: 10,
  },
  text1: {
    color: Colors.White,
    fontSize: fontScaleNormalize(16),
    fontFamily: Fonts.Medium,
    fontWeight: "600",
  },
  text2: {
    color: Colors.White,
    fontSize: fontScaleNormalize(14),
    fontFamily: Fonts.Medium,
    fontWeight: "600",
  },
  gradientStyle: {
    height: 84,
    width: 84,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
});
