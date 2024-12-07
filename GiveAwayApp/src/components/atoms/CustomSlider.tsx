import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Images } from "../../utils/imageSource/imageSource";
import { Slider } from "@rneui/themed";
import Dimensions from "../../utils/dimension/dimensions";

const CustomSlider = (props: any) => {
  const handleValueChange = (value: number) => {
    try {
      props.onValueChange(value);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Slider
      value={props.position}
      onValueChange={handleValueChange}
      maximumValue={props.duration}
      minimumTrackTintColor="rgb(19,222,196)"
      maximumTrackTintColor="#262626"
      // step={props.position}
      style={{
        height: 15,
        width: "100%",
        // transform: [{ scaleY: 1 }],
        marginVertical: 15,
      }}
      orientation="horizontal"
      thumbStyle={{ height: 13, width: 13, backgroundColor: "rgb(19,222,196)" }}
      thumbProps={{
        children: (
          <Image
            style={{ height: 50, bottom: 17.8, right: 18 }}
            source={Images.thumbImage}
          ></Image>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  viewBarWrapper: {
    marginTop: 18,
    alignSelf: "stretch",
  },
});

export default CustomSlider;
