import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View, Text } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Svg, { Text as SvgText, Defs, TSpan, } from "react-native-svg";
import { FigtreeFont } from "../shared/constants/font";
import { ColorPalette } from "../shared/constants/color";
import SharedModal from "../shared/SharedModal";
import ColorPaletteItem from "../components/ColorPaletteItem";

const { width, height } = Dimensions.get('window');

export default function ColoredDigitalClock() {

    const [showPalette, setShowPalette] = useState(false);
    const [selectedColors, setSelectedColors] = useState(ColorPalette.sky);

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return () => clearInterval(interval);

    }, []);

    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');

    return (
        <View style={styles.container}>
            <Pressable style={styles.container}
                onLongPress={() => setShowPalette(!showPalette)}>
                {/* <Defs> */}
                <RadialGradient style={styles.background}
                    colors={[selectedColors[0], selectedColors[1], '#00000000']}
                    stops={[0.01, 0.05, 0.7]}
                    center={[width - 200, 50]}
                    radius={700}>
                    {/* <View style={{flex:1, backgroundColor:'red'}}> */}

                    <Svg

                        width={width}
                        height={height}
                    >
                        <SvgText
                            x={width / 2}
                            y={height / 2}

                            textAnchor="middle"
                            alignmentBaseline="central"
                            fontSize="280"
                            stroke={selectedColors[2]}
                            strokeWidth="2"
                            fill={selectedColors[3]}
                            // fontWeight="900"
                            fontFamily={FigtreeFont.bold}
                            letterSpacing="-12"

                        >{hour + ':' + minute}

                            {/* 
                            <TSpan >{hour}</TSpan>
                            <TSpan dx={-50} transform={[{ translateY: -height * 0.05 }]}>&#58;</TSpan>
                            <TSpan >{minute}</TSpan> */}
                        </SvgText>
                    </Svg>
                    {/* <View style={styles.textContainer}>
                        <Text style={[styles.largeText, { color: selectedColors[2], textShadowColor: selectedColors[3] }]}>{hour}</Text>
                        <Text style={[styles.largeText, { transform: [{ translateY: '-10%' }], marginHorizontal: '-3%' }]}>:</Text>
                        <Text style={styles.largeText}>{minute}</Text>
                    </View> */}
                    {/* </View> */}
                </RadialGradient>
                {/* </Defs> */}

                <SharedModal visible={showPalette} title="Colors" onClose={() => setShowPalette(false)}>
                    {Object.entries(ColorPalette).map((colorSet, index) => (
                        <ColorPaletteItem
                            key={index}
                            isSelected={colorSet[1] === selectedColors}
                            color1={colorSet[1][1]}
                            color2={colorSet[1][2]}
                            onPress={() => {
                                setSelectedColors(colorSet[1]);
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
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    background: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeText: {
        fontSize: 280,
        padding: 16,
        color: '#eee',
        textAlign: 'center',
        fontFamily: FigtreeFont.bold,
        letterSpacing: -10,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    }

})