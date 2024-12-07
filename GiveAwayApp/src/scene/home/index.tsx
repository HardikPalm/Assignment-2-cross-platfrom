import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../utils/colors/colors";
import HomeScreenIcon from "../../assets/svgs/HomeScreenIcon";
import Dimensions from "../../utils/dimension/dimensions";
import CustomText from "../../components/atoms/CustomText";
import { Image } from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons"; // For the location icon
import StarRating from "react-native-star-rating"; // For star ratings
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import ProductCard from "../../components/molecules/ProductCard";
import { getAllProductData } from "../../service/home";
import { CurrentErrorContext } from "../../context/error_message_context";
import { UserDataContext } from "../../context/user_context";

const HomeScreen = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { apicall, setapicall } = useContext(UserDataContext);
  async function getMyPlaylistDataApi() {
    getAllProductData(setLoading, setCardData, ErrorContext);
  }

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    getMyPlaylistDataApi();
  }, [apicall]);

  const ErrorContext = useContext(CurrentErrorContext);

  const handleWhatsAppRedirect = (item:any) => {
    const productName = item.name; // Get the product name
    const message = `Hello, can I get more information on your product ${productName}?`;
    // const phoneNumber = item.mobileNumber; // Ensure this is in the correct format (with country code)
    const phoneNumber = `'+' + ${item.countrycode} + ${item.mobileNumber}`;
    if (phoneNumber) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch((err) => console.error("Error opening WhatsApp", err));
    } else {
      console.log("No mobile number available");
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.innerContainer}>
        <Pressable style={styles.innerContainer}>
          <HomeScreenIcon />
          <CustomText style={styles.text1}> GiveAway</CustomText>
        </Pressable>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.White} />
        </View>
      ) : (
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: "black",
            padding: Dimensions.WP_3,
          }}
        >
          <FlatList
            data={cardData}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onWhatsAppPress={()=>handleWhatsAppRedirect(item)}
                onPressItem={() =>
                  props.navigation.navigate("ProductDetailsScreen", { item })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatlistStyle}
          />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.Black,
    paddingTop: Dimensions.HP_4,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.HP_1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
    paddingHorizontal: 20,
  },
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
  flatlistStyle: {
    // paddingBottom: Dimensions.HP_9,
  },
});
