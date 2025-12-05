import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FigtreeFont } from "../shared/constants/font";
import SharedModal from "../shared/SharedModal";
import ColorPaletteItem from "../components/ColorPaletteItem";
import { ClockColor, DigitalClockColor } from "../shared/constants/color";

export default function DigitalClock() {

    const [time, setTime] = useState(new Date());
    const [showPalette, setShowPalette] = useState(false);
    const [selectedColor, setSelectedColor] = useState(DigitalClockColor.pumpkinSpice);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);

    }, []);

    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ flex: 1 }} onLongPress={() => { setShowPalette(true) }}>
                <View style={styles.container}>
                    <Text numberOfLines={1} style={[styles.largeText, {color:selectedColor}]}>{hour}</Text>
                    <Text style={[styles.largeText, { transform: [{ translateY: '-5%' }], marginHorizontal: '-3%', color:selectedColor }]}>:</Text>
                    <Text style={[styles.largeText, {color:selectedColor}]}>{minute}</Text>
                </View>

                <SharedModal visible={showPalette} title="Colors" onClose={() => setShowPalette(false)}>
                    {Object.entries(DigitalClockColor).map((colorSet, index) => (
                        <ColorPaletteItem
                            key={index}
                            isSelected={colorSet[1] === selectedColor}
                            color1={colorSet[1]}
                            onPress={() => {
                                setSelectedColor(colorSet[1]);
                                setShowPalette(false)
                            }} />

                    ))}
                </SharedModal>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 280,
        padding: 16,
        color: '#eee',
        textAlign: 'center',
        fontFamily: FigtreeFont.bold,
        letterSpacing: -12,

    }
});