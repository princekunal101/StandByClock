import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import RNHapticFeedback from "react-native-haptic-feedback";

interface ColorPaletteItemProps {
    isSelected: boolean,
    color1: string,
    color2?: string,
    onPress: () => void,
}

export default function ColorPaletteItem({ isSelected, color1, color2, onPress }: ColorPaletteItemProps) {
    const handleFeedback = () => {
        RNHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: true
        })
    }

    return (
        <View style={[styles.selectedPaletteRing, { borderColor: (isSelected ? 'white' : 'transparent') }]}>

            <Pressable style={[styles.paletteItem]}
                onPress={() => { handleFeedback(), onPress()}}>

                <View style={[styles.container, { backgroundColor: color1 }]} />
                <View style={[styles.container, { backgroundColor: color2 || color1 }]} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    selectedPaletteRing: {
        flex: 1,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 3,
        margin: 2,
    },

    paletteItem: {
        flexDirection: 'row',
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },

})