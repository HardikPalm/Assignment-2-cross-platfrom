import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors/colors";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import Dimensions from "../../utils/dimension/dimensions";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../atoms/CustomText";
import ThreeDotIcon from "../../assets/svgs/ThreeDotIcon";

const AlbumListingCard = (props: any) => {
  const { item, index, onPressSong } = props;

  return (
    <Pressable style={styles.mainView} onPress={onPressSong}>
      <View style={{ flexDirection: "row" }}>
        <LinearGradient
          colors={Colors.Card1LinearGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: 55,
            width: 55,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: item?.albumImageUrl || item?.imageUrl,
            }}
            style={styles.imageStyle}
          ></Image>
        </LinearGradient>
        <View style={styles.textFirstContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textView}>
              <CustomText style={styles.text1}>
                {item?.songName || item?.name}
              </CustomText>
              <CustomText style={styles.text2}>{"Album"}</CustomText>
            </View>
            {/* <View style={{ justifyContent: "center" }}>
              <ThreeDotIcon />
            </View> */}
          </View>
        </View>
        <View style={styles.innerContainer}></View>
      </View>
    </Pressable>
  );
};

export default AlbumListingCard;

const styles = StyleSheet.create({
  mainView: {},
  imageStyle: {
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: 10,
  },
  text1: {
    color: Colors.White,
    fontSize: fontScaleNormalize(16),
    fontFamily: Fonts.Regular,
    fontWeight: "500",
    lineHeight: 22,
  },
  text2: {
    color: Colors.White,
    fontSize: fontScaleNormalize(13),
    fontFamily: Fonts.SemiBold,
    fontWeight: "600",
    lineHeight: 26,
  },
  innerContainer: {},
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
    paddingHorizontal: 20,
  },
  textFirstContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  buttonTextContainer: {
    flexDirection: "row",
    paddingTop: Dimensions.HP_1_3,
  },
  textStyle: {
    alignSelf: "center",
    paddingLeft: Dimensions.WP_2,
    fontSize: fontScaleNormalize(16),
    fontWeight: "600",
    fontFamily: Fonts.Medium,
  },
  borderView: {
    backgroundColor: "yellow",
    marginVertical: Dimensions.HP_1_8,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 10,
  },
  textView: {},
});
