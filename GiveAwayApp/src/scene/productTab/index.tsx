import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../utils/colors/colors";
import { CurrentErrorContext } from "../../context/error_message_context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/atoms/CustomText";
import Dimensions from "../../utils/dimension/dimensions";
import ProductCard from "../../components/molecules/ProductCard"; // Import new component
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { Fonts } from "../../utils/fonts/fonts";
import { getMyProductData } from "../../service/home";
import ShimmerPlaceHolderListView from "../../components/molecules/ShimmerPlaceHolderListView";
import SongListingShimmerView from "../../components/molecules/SongListingShimmerView";
import { Text } from "react-native-animatable";
import { UserDataContext } from "../../context/user_context";

const ProductTabScreen = (props: any) => {
  const [loading, setLoading] = useState(false);
  const { apicall, setapicall } = useContext(UserDataContext);
  async function getMyPlaylistDataApi() {
    getMyProductData(setLoading, setCardData, ErrorContext);
  }

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    console.log(apicall)
    getMyPlaylistDataApi();
    setapicall(false)
  }, [apicall]);

  const ErrorContext = useContext(CurrentErrorContext);

  function handleCreateButtonPress() {
    props?.navigation?.navigate("ProfileStack", {
      screen: "AddProductScreen",
    });
  }

  // const handleWhatsAppRedirect = (item: any) => {
  //   const message = `Product: ${item.name}\nDescription: ${item.description}\nLocation: ${item.location}\nRatings: ${item.ratings}`;
  //   const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
  //   Linking.openURL(url).catch(() => {
  //     console.log("Failed to open WhatsApp");
  //   });
  // };
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
    <>
      <View
        style={{
          backgroundColor: "black",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginVertical: Dimensions.HP_2,
            fontSize: fontScaleNormalize(20),
            color: Colors.White,
          }}
        >
          My Products
        </Text>
      </View>
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.mainContainer}>
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
            <>
              {cardData && cardData.length > 0 ? (
                <FlatList
                  data={cardData}
                  renderItem={({ item }) => (
                    <ProductCard
                      item={item}
                      onWhatsAppPress={()=>handleWhatsAppRedirect(item)}
                      onPressItem={() =>
                        props.navigation.navigate("ProductDetailsScreen1", {
                          item,
                          myProduct: "MyProduct", // Add your additional parameter here
                        })
                      }
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.flatlistStyle}
                />
              ) : (
                <View style={{ marginVertical: Dimensions.HP_40 }}>
                  <Pressable
                    style={{
                      backgroundColor: Colors.Black,
                      borderWidth: 1,
                      borderColor: Colors.Green,
                      paddingVertical: Dimensions.HP_1_5,
                      paddingHorizontal: Dimensions.WP_5,
                      borderRadius: 20,
                      width: Dimensions.WP_80,
                      alignSelf: "center",
                    }}
                    onPress={handleCreateButtonPress}
                  >
                    <CustomText
                      style={{
                        color: Colors.Green,
                        fontSize: fontScaleNormalize(14),
                        fontFamily: Fonts.Medium,
                        alignSelf: "center",
                      }}
                    >
                      Add Product
                    </CustomText>
                  </Pressable>
                </View>
              )}
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ProductTabScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
    paddingHorizontal: 20,
  },
  flatlistStyle: {
    paddingBottom: Dimensions.HP_9,
  },
});
