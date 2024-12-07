import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import CustomText from "../atoms/CustomText";
import { Colors } from "../../utils/colors/colors";
import Dimensions from "../../utils/dimension/dimensions";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";

const ProductCard = ({ item, onWhatsAppPress, onPressItem }: any) => {
  // const { onPressItem } = props;
  return (
    <Pressable onPress={onPressItem}>
      <View style={styles.cardContainer}>
        {/* Full-width Image */}
        <Image
          source={{
            uri: item.image
              ? item.image
              : "https://dummyimage.com/600x400/ffffff/000000.png&text=DummyImage",
          }}
          style={styles.imageStyle}
        />

        {/* Product Info */}
        <View style={styles.textFirstContainer}>
          <CustomText style={styles.text1}>{item.name}</CustomText>
          <CustomText style={styles.text2}>{item.description}</CustomText>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Location with Red Icon */}
            <View style={styles.locationContainer}>
              <Icon name="location-sharp" size={18} color="red" />
              <CustomText style={styles.locationText}>
                {item.location}
              </CustomText>
            </View>

            {/* Star Ratings */}
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.rating}
              starSize={20}
              fullStarColor={"#FFD700"}
              emptyStarColor={"#CCCCCC"}
              containerStyle={styles.starRatingStyle}
            />
          </View>

          {/* WhatsApp Button */}
          <Pressable
            style={styles.buttonStyle}
            onPress={() => onWhatsAppPress(item)}
          >
            <CustomText style={styles.textStyle}>
              Contact on WhatsApp
            </CustomText>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: Dimensions.HP_2,
    borderRadius: 10,
    backgroundColor: Colors.Black_10,
    borderColor: Colors.White,
    borderWidth: 1,
    overflow: "hidden", // To ensure image stays within the card
  },
  imageStyle: {
    width: "100%", // Full width horizontally
    height: 150, // Adjust height based on design
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textFirstContainer: {
    padding: Dimensions.HP_2,
  },
  text1: {
    color: Colors.White,
    fontSize: fontScaleNormalize(20),
    fontFamily: Fonts.Bold,
  },
  text2: {
    color: Colors.White,
    fontSize: fontScaleNormalize(14),
    fontFamily: Fonts.Regular,
    marginTop: Dimensions.HP_1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Dimensions.HP_1,
  },
  locationText: {
    color: Colors.White,
    fontSize: fontScaleNormalize(14),
    marginLeft: 5,
  },
  starRatingStyle: {
    marginTop: Dimensions.HP_1,
    alignSelf: "flex-start",
  },
  buttonStyle: {
    backgroundColor: Colors.Black,
    marginTop: Dimensions.HP_2,
    paddingVertical: Dimensions.HP_1_5,
    paddingHorizontal: Dimensions.WP_5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Green,
  },
  textStyle: {
    color: Colors.White,
    fontSize: fontScaleNormalize(14),
    fontWeight: "600",
    fontFamily: Fonts.Medium,
    textAlign: "center",
  },
});
