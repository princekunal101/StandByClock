import { useEffect, useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Svg, { Text as SvgText, Defs } from "react-native-svg";
import { FigtreeFont } from "../shared/constants/figtree-font";
import { ColorPalette } from "../shared/constants/color";

const { width } = Dimensions.get('window');

export default function ColoredDigitalClock() {

    const [showPalette, setShowPalette] = useState(false);
    const [selectedColors, setSelectedColors] = useState(ColorPalette.sky);

    const now = new Date();
    const [hour, setHour] = useState(now.getHours().toString().padStart(2, '0'));
    const [minute, setMinute] = useState(now.getMinutes().toString().padStart(2, '0'));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setHour(now.getHours().toString().padStart(2, '0'));
            setMinute(now.getMinutes().toString().padStart(2, '0'));
        }, 1000);
        return () => clearInterval(interval);

    }, []);


    return (
        <View style={styles.container}>
            <Pressable style={styles.container}
                onLongPress={() => setShowPalette(!showPalette)}>
                {/* <Defs> */}
                <RadialGradient style={styles.background}
                    colors={[selectedColors[0], selectedColors[1], 'black']}
                    stops={[0.01, 0.05, 0.7]}
                    center={[width - 200, 50]}
                    radius={700}>
                    <Svg style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}  >
                        <SvgText
                            x="50%"
                            y="55%"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="280"
                            stroke={selectedColors[2]}
                            strokeWidth="2"
                            fill={selectedColors[3]}
                            // fontWeight="900"
                            fontFamily={FigtreeFont.bold}
                            letterSpacing="-12"

                        >
                            {hour + ':' + minute}
                        </SvgText>
                    </Svg>



                </RadialGradient>
                {/* </Defs> */}

                <Modal visible={showPalette} transparent animationType={'slide'} onMagicTap={() => setShowPalette(false)}>
                    <View style={styles.modalOverlay}>

                        <ScrollView style={styles.paletteBox} bounces={true} horizontal showsHorizontalScrollIndicator={false}>
                            {Object.entries(ColorPalette).map((colorSet, index) => (
                                <Pressable key={index} style={[styles.paletteItem, index === Object.entries(ColorPalette).length - 1 && { marginEnd: 110 }]}
                                    onPress={() => {
                                        setSelectedColors(colorSet[1]);
                                        setShowPalette(false);
                                    }}>

                                    <View style={[styles.container, { backgroundColor: colorSet[1][1] }]} />
                                    <View style={[styles.container, { backgroundColor: colorSet[1][2] }]} />
                                </Pressable>
                            ))}
                        </ScrollView>
                        <Pressable style={styles.paletteCloseButton}
                            onPress={() => setShowPalette(false)}>
                            <Text style={{ color: 'white', fontSize: 22 }}>&times;</Text>
                        </Pressable>
                    </View>
                </Modal>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'blue'
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'black',
    },
    background: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        paddingBottom: 8,
        // paddingHorizontal: 16,
        backgroundColor: '#00000055',
    },

    paletteBox: {
        // flexDirection: 'row',
        padding: 16,
        paddingEnd: 64,
        height: '100%',
        width: '100%',
        // direction: 'rtl',
    },

    paletteItem: {
        flexDirection: 'row',
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 8,
        overflow: 'hidden',
    },

    paletteCloseButton: {
        position: 'absolute',
        top: 16,
        right: 32,
        backgroundColor: '#444444aa',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})