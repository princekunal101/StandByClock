import { useEffect, useState } from "react";
import { FloatClockColor } from "../shared/constants/color";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import SharedModal from "../shared/SharedModal";
import ColorPaletteItem from "../components/ColorPaletteItem";
import { QuickSandFont } from "../shared/constants/font";
import { BlurView } from "@react-native-community/blur";



const { height } = Dimensions.get('window');

export default function FloatDigitalClock() {

    const [time, setTime] = useState(new Date());
    const [selectedColor, setSelectedCoolor] = useState(FloatClockColor.fusia);
    const [showPalette, setShowPalette] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000);
        return () => clearInterval(interval);

    }, []);

    const hour = time.getHours().toString().padStart(2, ' ');
    const minute = time.getMinutes().toString().padStart(2, '0');

    return (
        <View style={styles.container}>
            <Pressable style={styles.flexContainer} onLongPress={() => setShowPalette(true)}>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%' }}> */}

                <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor[0], transform: [{ rotate: '-3deg' }, { translateX: 20 }, { translateY: -18 }] }]}>
                    {hour.slice(0, 1)}
                </Text>

                <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor[1], transform: [{ rotate: '2deg' }, { translateX: 5 }, { translateY: -18 }] }]}>
                    {hour.slice(1)}
                </Text>

                <View style={styles.colonBox}>
                    <View style={[styles.colonShape,]}>
                        <BlurView style={{ width: '100%', height: '100%', backgroundColor: '#ffffffaa' }} overlayColor="transparent" />
                    </View>
                    <View style={[styles.colonShape,]}>

                        <BlurView style={{ width: '100%', height: '100%', backgroundColor: '#ffffffaa' }} overlayColor="transparent" />
                    </View>
                </View>
                <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor[2], transform: [{ rotate: '-4deg' }, { translateX: -5 }, { translateY: -18 }] }]}>
                    {minute.slice(0, 1)}
                </Text>
                <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor[3], transform: [{ rotate: '5deg' }, { translateX: -20 }, { translateY: -18 }] }]}>
                    {minute.slice(1)}
                </Text>

                {/* </View> */}


                <SharedModal visible={showPalette} onClose={() => setShowPalette(false)} title="Colors">
                    {Object.entries(FloatClockColor).map((setColor, index) => (
                        <ColorPaletteItem
                            key={index}
                            isSelected={setColor[1] === selectedColor}
                            onPress={() => {
                                setSelectedCoolor(setColor[1]);
                                setShowPalette(false)
                            }}
                            color1={setColor[1][1]}
                            color2={setColor[1][2]} />
                    ))}
                    <View></View>
                </SharedModal>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // transform: [{scale: 0.7}]
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 0,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // textAlignVertical: 'center',
    },
    largeText: {
        fontSize: 490 * height / 440,
        color: 'red',
        padding: 8,
        marginHorizontal: -26,
        // position: 'relative',
        lineHeight: height - 40,
        fontFamily: QuickSandFont.bold,
        letterSpacing: -10 * height / 440,
    },
    colonBox: {
        height: '100%',
        paddingVertical: 50 * height / 440,
        //    paddingHorizontal: 8,
        marginHorizontal: -20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    colonShape: {
        overflow: 'hidden',
        width: 70 * height / 440,
        height: 70 * height / 440,
        borderRadius: 35 * height / 440,
        marginVertical: 10,
        zIndex: 10
    },

});