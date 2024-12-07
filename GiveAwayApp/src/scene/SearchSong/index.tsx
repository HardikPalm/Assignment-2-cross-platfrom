import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Colors } from "../../utils/colors/colors";
import SearchBar from "../../components/molecules/SearchBar";
import { FlatList } from "react-native";
import ShimmerPlaceHolderListView from "../../components/molecules/ShimmerPlaceHolderListView";
import PlaylistSonglistingShimmer from "../../components/molecules/playlistSongListingShimmer";
import Dimensions from "../../utils/dimension/dimensions";
import ListEmptyPlaylist from "../../components/molecules/ListEmptyPlaylist";
import { getSearchInfo, onEndReached } from "../../service/home";
import { CurrentErrorContext } from "../../context/error_message_context";
import { useDebouncedEffect } from "../../utils/functions/useDebounceEffect";
import SearchListingCard from "../../components/molecules/SearchListingCard";
import deviceInfoModule from "react-native-device-info";
import AlbumListingCard from "../../components/molecules/AlbumListingCard";
import ArtistCardListing from "../../components/molecules/ArtistCardListing";
import CustomText from "../../components/atoms/CustomText";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import { UserDataContext } from "../../context/user_context";
import TrackPlayer, { Track, RepeatMode } from "react-native-track-player";
import AnimatedLottieView from "lottie-react-native";
import { Images } from "../../utils/imageSource/imageSource";
import * as Animatable from "react-native-animatable";

const SearchSellerScreen = (props: any) => {
  const [isMatched, setisMatched] = useState(false);
  let hasNotch = deviceInfoModule.hasNotch();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<[]>([]);
  const [artist, setArtistData] = useState<[]>([]);
  const [songData, setSongData] = useState<[]>([]);
  // console.log("🚀 ~ SearchSellerScreen ~ songData:", songData);
  const [albumData, setAlbumData] = useState<[]>([]);
  const [searchObject, setSearchObject] = useState<any>({
    page: 1,
    search: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const ErrorContext = useContext(CurrentErrorContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Black,
        paddingHorizontal: 20,
        paddingBottom: Dimensions.HP_1,
      }}
    >
      <View
        style={[
          styles.secondContainer,
          {
            paddingTop:
              Platform.OS === "ios"
                ? hasNotch
                  ? Dimensions.HP_15
                  : Dimensions.HP_10
                : Dimensions.HP_5,
          },
        ]}
      >
        <SearchBar
          placeholderText="Find Seller Near You?"
          onChangeText={(text: string) => {
            setSearchObject((prevState: any) => ({
              ...prevState,
              search: text,
            }));
          }}
          onCrossIconPress={() => {
            setSearchObject(() => ({
              page: 1,
              search: "",
            }));
          }}
          placeHolderTextColor={Colors.grey}
          textInputStyle={{
            backgroundColor: Colors.Black_10,
            fontSize: fontScaleNormalize(15),
            color: Colors.White,
            marginLeft: 10,
            width: "82%",
          }}
          mainStyleView={{ backgroundColor: Colors.Black_10 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={{ flexDirection: "row" }}>
            <ShimmerPlaceHolderListView
              flatlistStyle={{
                marginBottom: Dimensions.HP_2_1,
              }}
              ContainerStyle={{ marginEnd: 0, marginRight: 0 }}
              totalNumber={14}
              horizontal={false}
              renderItem={() => <PlaylistSonglistingShimmer />}
            />
          </View>
        ) : (
          <>
            {artist.length === 0 &&
            albumData.length === 0 &&
            songData.length === 0 ? (
              <View style={{ flex: 1 }}>
                <AnimatedLottieView
                  autoPlay
                  autoSize
                  source={Images.Guitar}
                  style={{ alignSelf: "center" }}
                />
                <Animatable.Text
                  animation="swing"
                  style={{
                    color: Colors.White,
                    alignSelf: "center",
                    textAlign: "center",
                    fontSize: 25,
                    marginTop: 25,
                  }}
                  iterationCount={5}
                >
                  No data available.
                </Animatable.Text>
              </View>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                <Text>Data will be here</Text>
              </ScrollView>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default SearchSellerScreen;

const styles = StyleSheet.create({
  secondContainer: {},
  firstContainer: {},
  flatlistStyle: { flex: 1 },
  textStyle: {
    textAlign: "center",
    fontSize: fontScaleNormalize(12),
    fontWeight: "600",
  },
  textBoldStyle: {
    fontSize: fontScaleNormalize(22),
    fontWeight: "800",
  },
  textViewStyle: {
    backgroundColor: Colors.Black_10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
