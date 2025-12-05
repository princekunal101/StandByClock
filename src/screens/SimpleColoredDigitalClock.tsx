import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { FigtreeFont, LeagueGauthicFont } from "../shared/constants/font";
import { ClockColor } from "../shared/constants/color";
import SharedModal from "../shared/SharedModal";
import ColorPaletteItem from "../components/ColorPaletteItem";
import { DAYS, MONTHS } from "../shared/constants/dates";



const { height } = Dimensions.get('window');

export default function SimpleColoredDigitalClock() {

    const [time, setTime] = useState(new Date());

    const [selectedColor, setSelectedCoolor] = useState(ClockColor.pearlAqua);
    const [showPalette, setShowPalette] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000);
        return () => clearInterval(interval);

    }, []);

    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    const day = time.getDay();
    const date = time.getDate();
    const month = time.getMonth();

    return (
        <View style={styles.container}>
            <Pressable style={styles.flexContainer} onLongPress={() => setShowPalette(true)}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

                    <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor }]}>
                        {hour}
                    </Text>

                    <View style={styles.colonBox}>
                        <View style={[styles.colonShape, { backgroundColor: selectedColor }]}></View>
                        <View style={[styles.colonShape, { backgroundColor: selectedColor }]}></View>
                        {/* <Text style={[styles.largeText,{ transform: [{translateY: -20}],fontFamily:'monospace', backgroundColor:'blue'}]}>:</Text> */}
                    </View>
                    <Text numberOfLines={1} style={[styles.largeText, { color: selectedColor }]}>
                        {minute}
                    </Text>

                </View>

                <View style={{ flexDirection: 'column', paddingTop: 30, gap: 10, height: '100%' }}>

                    <Text style={[styles.dayText, { color: (day === 0 ? 'red' : selectedColor) }]}>{DAYS[day].slice(0, 3)}
                        <Text style={styles.dateText}> {`${date} \n${MONTHS[month]}`}</Text>
                    </Text>
                </View>

                <SharedModal visible={showPalette} onClose={() => setShowPalette(false)} title="Colors">
                    {Object.entries(ClockColor).map((setColor, index) => (
                        <ColorPaletteItem
                            key={index}
                            isSelected={setColor[1] === selectedColor}
                            onPress={() => {
                                setSelectedCoolor(setColor[1]);
                                setShowPalette(false)
                            }}
                            color1={setColor[1]} />
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
        gap: 30,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // textAlignVertical: 'center',
    },
    largeText: {
        fontSize: 450 * height / 440,
        color: 'red',
        position: 'relative',
        lineHeight: height - 30,
        fontFamily: LeagueGauthicFont.regular,
        // backgroundColor: 'blue',
        letterSpacing: -16 * height / 440,
    },
    colonBox: {
        height: '100%',
        paddingVertical: 50 * height / 440,
        paddingHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    colonShape: {
        width: 55 * height / 440,
        height: 55 * height / 440,
        borderRadius: 30 * height / 440,
        marginVertical: 10
    },
    dayText: {
        fontWeight: 700,
        fontFamily: FigtreeFont.regular,
        fontSize: 40 * height / 440,
    },
    dateText: {
        color: 'white',
        fontWeight: 600,
        fontFamily: FigtreeFont.regular,
        fontSize: 40 * height / 440,
    }
});