import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import CustomText from "../../components/atoms/CustomText";
import { Colors } from "../../utils/colors/colors";
import Dimensions from "../../utils/dimension/dimensions";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { FontSize, Fonts } from "../../utils/fonts/fonts";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import LeftArrowIcon from "../../assets/svgs/LeftArrowIcon";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "../../navigation/service/navigationService";
import { Text } from "react-native-animatable";
import { removeproduct, updateProfile } from "../updateProfile/service";
import { CurrentErrorContext } from "../../context/error_message_context";
import { UserDataContext } from "../../context/user_context";

const ProductDetailsScreen = ({ route }: any) => {
  const { item: product } = route.params;
  console.log("route.params", route.params)
  const { apicall, setapicall } = useContext(UserDataContext);
  console.log("product", product);
  const [loading, setLoading] = useState(false)
  const ErrorContext = useContext(CurrentErrorContext)
  const handleWhatsAppRedirect = () => {
    const productName = product.name; // Get the product name
    const message = `Hello, can I get more information on your product ${productName}?`;
    const phoneNumber = `'+' + ${product.countrycode} + ${product.mobileNumber}`; // Ensure this is in the correct format (with country code)

    if (phoneNumber) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch((err) => console.error("Error opening WhatsApp", err));
    } else {
      console.log("No mobile number available");
    }
  };

  const DeleteProduct = () => {
    console.log("delete press/*  */", product?.product_id, product?.user_id)
    const obj = {

      "idProduct": product?.product_id,
      "idUser": product?.user_id
    }

    removeproduct(setLoading, obj, ErrorContext)
    setapicall(true)
    NavigationService.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconViewStyle}>
          <Pressable
            onPress={() => {
              NavigationService.goBack();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <LeftArrowIcon />
          </Pressable>
          <Pressable>
            <Text style={styles.title2}>{product.name}</Text>
          </Pressable>
          <View>
            {/* <Pressable
            onPress={() => setModalVisible(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <PlusIcon />
          </Pressable> */}
          </View>
        </View>
        <View style={{ marginVertical: Dimensions.HP_1 }}></View>
        <Image
          source={{
            uri: product.image
              ? product.image
              : "https://dummyimage.com/600x400/ffffff/000000.png&text=DummyImage",
          }}
          style={styles.productImage}
        />

        <CustomText style={styles.title}>{product.name}</CustomText>

        <CustomText style={styles.description}>
          {product.description}
        </CustomText>

        <View style={styles.locationContainer}>
          <Icon name="location-sharp" size={18} color="red" />
          <CustomText style={styles.locationText}>
            {product.location}
          </CustomText>
        </View>

        <StarRating
          disabled={true}
          maxStars={5}
          rating={product.rating}
          starSize={25}
          fullStarColor={"#FFD700"}
          emptyStarColor={"#CCCCCC"}
          containerStyle={styles.starRatingStyle}
        />

      </View>

      <View style={styles.buttonview}>
        {/* delete Button */}
        {route.params.myProduct ? <>
          <Pressable style={styles.buttonStyle} onPress={() => DeleteProduct()}>
            <CustomText style={styles.buttonText}>Delete product</CustomText>
          </Pressable>
        </> : <></>}
      </View>
      <View style={styles.buttonview}>
        {/* WhatsApp Button */}
        <Pressable style={styles.buttonStyle} onPress={() => handleWhatsAppRedirect(/*  */)}>
          <CustomText style={styles.buttonText}>Contact on WhatsApp</CustomText>
        </Pressable>
      </View>
    </>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.HP_2,
    backgroundColor: Colors.Black,
  },
  iconViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonview: {
    padding: Dimensions.HP_2,
    backgroundColor: Colors.Black,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: Dimensions.HP_2,
    resizeMode: "contain",
  },
  title: {
    color: Colors.White,
    fontSize: fontScaleNormalize(24),
    fontFamily: Fonts.Bold,
    marginBottom: Dimensions.HP_1,
  },
  title2: {
    color: Colors.White,
    fontSize: FontSize[18],
    fontWeight: "bold",
    textAlign: "center",
    // lineHeight: 22,
    // marginTop: 9,
  },
  description: {
    color: Colors.White,
    fontSize: fontScaleNormalize(16),
    fontFamily: Fonts.Regular,
    marginBottom: Dimensions.HP_2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.HP_2,
  },
  locationText: {
    color: Colors.White,
    fontSize: fontScaleNormalize(16),
    marginLeft: 5,
  },
  starRatingStyle: {
    alignSelf: "flex-start",
    marginBottom: Dimensions.HP_2,
  },
  buttonStyle: {
    backgroundColor: Colors.Green,
    paddingVertical: Dimensions.HP_1_5,
    paddingHorizontal: Dimensions.WP_5,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.White,
    fontSize: fontScaleNormalize(16),
    fontFamily: Fonts.Medium,
    textAlign: "center",
  },
});
