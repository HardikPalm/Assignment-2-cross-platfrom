import React, { useContext } from "react";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from 'react-native-image-crop-picker';
import { CurrentErrorContext, currentErrorEnum } from "../../context/error_message_context";
import { imageOptions, pickerOptions1 } from "../../utils/enum/enums";

const ImagePickerActionSheet = ({ imageOption, getImageResponse, imageResource, imageSheet, onPressDelete, pressedImageIndex }) => {
    const ErrorContext = useContext(CurrentErrorContext)
    async function selectImageFromGallery() {
        ImagePicker.openPicker({ ...imageOptions, ...imageOption, multiple: pressedImageIndex?.current == null ? true : false }).then((image) => {
            if (Array.isArray(image) && image.length > 0) {
                getImageResponse(image[0], fromCamera = false)
            }
            else {
                getImageResponse(image, fromCamera = false)
            }

        }).catch((err) => {

            if (err.message == 'User did not grant library permission.') {
                let data = { ...currentErrorEnum }
                data.errorMessage = err.message
                data.show = true
                ErrorContext.setCurrentError(data)
            }
        })
    }

    async function selectImageFromCamera() {
        ImagePicker.openCamera({ imageOption, ...imageOptions }).then((image) => {
            getImageResponse(image, fromCamera = true)
        }).catch((err) => {

            if (err.message == 'User did not grant library permission.' ||
                err.message == 'User did not grant camera permission.'
            ) {
                let data = { ...currentErrorEnum }
                data.errorMessage = err.message
                data.show = true
                ErrorContext.setCurrentError(data)
            }

        })
    }


    async function onPressOption(index) {
        switch (index) {
            case 0:
                {
                    selectImageFromCamera()
                    break;
                }

            case 1:
                {
                    selectImageFromGallery()
                    break;
                }

            case 2:
                {

                    // if (imageResource) {
                    //     onPressDelete()
                    // }
                    // else {

                    // }
                }
                break;

        }
    }


    return (
        <ActionSheet
            ref={imageSheet}
            title={'Choose Image From'}
            options={pickerOptions1}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={onPressOption}></ActionSheet>
    )
}

export default ImagePickerActionSheet