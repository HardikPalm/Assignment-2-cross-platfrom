import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../utils/colors/colors';


const CustomKeyboardAwareScrollView = (props: any) => {

    const {
        style,
        contentContainerStyle
    } = props

    return (
        <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            extraHeight={100}
            keyboardShouldPersistTaps={'handled'}
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={[{ flex: 1, backgroundColor: Colors.White }, style]}
            contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
        >
            {
                props.children
            }
        </KeyboardAwareScrollView>
    )
}

export default CustomKeyboardAwareScrollView