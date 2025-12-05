import { Appearance, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, FeDropShadow, Filter, Line, Text as SvgText, TSpan } from "react-native-svg";
import { FigtreeFont } from "../shared/constants/font";
import { useEffect, useState } from "react";
import { DAYS } from "../shared/constants/dates";
import { AnalogClockColor } from "../shared/constants/color";
import SharedModal from "../shared/SharedModal";
import ColorPaletteItem from "../components/ColorPaletteItem";


const { width, height } = Dimensions.get('window');
const VIEWABLE_WIDTH = width - 70;
const VIEWABLE_HEIGHT = height - 20;
const CENTER_WIDTH = (VIEWABLE_WIDTH + 20) / 2;
const CENTER_HEIGHT = (VIEWABLE_HEIGHT + 20) / 2;


const polarToCartesian = (angleDeg: number, height: number, width: number) => {
    const angleRad = (Math.PI / 180) * (angleDeg - 90);
    const dx = Math.cos(angleRad);
    const dy = Math.sin(angleRad);

    const scaleX = (width / 2) / Math.abs(dx);
    const scaleY = (height / 2) / Math.abs(dy);
    const scale = Math.min(scaleX, scaleY);
    return {
        x: CENTER_WIDTH + scale * Math.cos(angleRad),
        y: CENTER_HEIGHT + scale * Math.sin(angleRad)
    }
}

export default function AnalogClock() {

    const [time, setTime] = useState(new Date());
    const colorScheme = Appearance.getColorScheme();
    const isTickSelectedColor = colorScheme === 'dark' ? true : false;

    const [selectedColor, setSelectedColor] = useState(AnalogClockColor.deepOrange);
    // const [isTickSelectedColor, setIsTickSelectedColor] = useState(true);
    const [showPalette, setShowPalette] = useState(false);

    const minutesTick = Array.from({ length: 60 }, (_, i) => i);
    const hoursTick = Array.from({ length: 4 }, (_, i) => i);

    useEffect(() => {
        const timer = setInterval(() => {

            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const day = time.getDay();
    const date = time.getDate();

    const secondDegree = (seconds / 60) * 360;
    const minuteDegree = ((minutes + seconds / 60) / 60) * 360;
    const hourDegree = (((hours % 12) + minutes / 60) / 12) * 360;


    return (
        <View style={styles.container}>
            <Pressable style={styles.container} onLongPress={() => { setShowPalette(true); }}>

                <View style={[styles.clockContainer]}>
                    <Svg width={VIEWABLE_WIDTH + 20} height={VIEWABLE_HEIGHT + 20}>

                        {/* Minutes Tick line all around */}
                        {minutesTick.map((m) => {
                            const angle = m * 6;
                            const outer = polarToCartesian(angle, VIEWABLE_HEIGHT, VIEWABLE_WIDTH);
                            const inner = polarToCartesian(
                                angle,
                                ((m % 5 === 0 && m != 0 && m != 30) ? VIEWABLE_HEIGHT - 150 : VIEWABLE_HEIGHT - 50),
                                ((m % 5 === 0) ? VIEWABLE_WIDTH - 150 : VIEWABLE_WIDTH - 50));

                            return (

                                <Line key={`tick-${m}`}
                                    x1={inner.x}
                                    y1={inner.y}
                                    x2={outer.x}
                                    y2={outer.y}
                                    stroke={isTickSelectedColor ? selectedColor : '#ffffff'}
                                    opacity={m % 5 === 0 ? 0.7 : 0.6}
                                    strokeLinecap='round'
                                    strokeWidth={m % 5 === 0 ? 4 : 2} />

                            );
                        })}

                        {/* Hours text all around  */}
                        {hoursTick.map((h) => {
                            const angle = h * 90;
                            const inner = polarToCartesian(
                                angle,

                                (VIEWABLE_HEIGHT - 110),
                                (VIEWABLE_WIDTH - 200));
                            return (
                                <SvgText
                                    key={h}
                                    x={inner.x}
                                    y={inner.y}
                                    fontSize={42}
                                    alignmentBaseline='central'
                                    textAnchor='middle'
                                    fontFamily={FigtreeFont.semiBold}
                                    fill={isTickSelectedColor ? selectedColor : '#ffffff'}>
                                    {h === 0 ? '12' : h * 3}
                                </SvgText>
                            )
                        })}

                        {/* Adding the day and date */}
                        <SvgText
                            x={CENTER_WIDTH + CENTER_WIDTH / 2 - 20}
                            y={CENTER_HEIGHT}
                            alignmentBaseline='central'
                            fontSize={22}
                            textAnchor='middle'
                            fontWeight={400}
                        >
                            <TSpan
                                fill={selectedColor}>
                                {DAYS[day].slice(0, 3).toUpperCase()}
                            </TSpan>
                            <TSpan
                                fill={isTickSelectedColor ? selectedColor : '#ffffff'}
                            >{date}</TSpan>
                        </SvgText>

                        {/* for hour hand */}
                        <Line
                            x1={CENTER_WIDTH}
                            y1={CENTER_HEIGHT}
                            x2={CENTER_WIDTH}
                            y2={'18%'}
                            stroke={isTickSelectedColor ? selectedColor : '#ffffff'}
                            strokeWidth={6}
                            strokeLinecap='round'
                            transform={`rotate(${hourDegree} ${CENTER_WIDTH} ${CENTER_HEIGHT}) `}
                        />
                        <Line
                            x1={CENTER_WIDTH}
                            y1={CENTER_HEIGHT - 28}
                            x2={CENTER_WIDTH}
                            y2={'18%'}
                            stroke={isTickSelectedColor ? selectedColor : '#ffffff'}
                            strokeWidth={13}
                            strokeLinecap='round'
                            transform={`rotate(${hourDegree} ${CENTER_WIDTH} ${CENTER_HEIGHT}) `}
                        />


                        {/* for clock minutes hand */}
                        <Line
                            x1={CENTER_WIDTH}
                            y1={CENTER_HEIGHT}
                            x2={CENTER_WIDTH}
                            y2={'8%'}
                            stroke={isTickSelectedColor ? selectedColor : '#ffffff'}
                            strokeWidth={6}
                            strokeLinecap='round'
                            transform={`rotate(${minuteDegree} ${CENTER_WIDTH} ${CENTER_HEIGHT}) `}

                        />

                        <Line
                            x1={CENTER_WIDTH}
                            y1={CENTER_HEIGHT - 28}
                            x2={CENTER_WIDTH}
                            y2={'8%'}
                            stroke={isTickSelectedColor ? selectedColor : '#ffffff'}
                            strokeWidth={13}
                            strokeLinecap='round'
                            transform={`rotate(${minuteDegree} ${CENTER_WIDTH} ${CENTER_HEIGHT}) `}

                        />

                        <Circle
                            cy={CENTER_HEIGHT}
                            cx={CENTER_WIDTH}
                            r={10}
                            fill={isTickSelectedColor ? selectedColor : '#ffffff'} />

                        {/* for second hand */}
                        <Line
                            x1={CENTER_WIDTH}
                            y1={CENTER_HEIGHT + 27}
                            x2={CENTER_WIDTH}
                            y2={'7%'}
                            stroke={selectedColor}
                            strokeWidth={3}
                            strokeLinecap='round'
                            transform={`rotate(${secondDegree} ${CENTER_WIDTH} ${CENTER_HEIGHT}) `}

                        />


                        {/* Center circle for dials */}
                        <Circle
                            cy={CENTER_HEIGHT}
                            cx={CENTER_WIDTH}
                            r={7}
                            fill={selectedColor} />
                        <Circle
                            cy={CENTER_HEIGHT}
                            cx={CENTER_WIDTH}
                            r={3}
                            fill={'#000'} />
                    </Svg>

                </View>
                <SharedModal visible={showPalette} title="Colors" onClose={() => { setShowPalette(false); }}>
                    {Object.entries(AnalogClockColor).map((colorSet, index) => (
                        <ColorPaletteItem
                            key={index}
                            isSelected={colorSet[1] === selectedColor}
                            color1={colorSet[1]}
                            color2={colorSet[1]}
                            onPress={() => {
                                setSelectedColor(colorSet[1]);
                                setShowPalette(false)

                            }} />


                    ))}

                    {/* <View style={{ height: '60%', margin: 8, backgroundColor: 'gray', width: 2 }} />
                    <ColorPaletteItem
                        isSelected={isTickSelectedColor}
                        color1={isTickSelectedColor ? 'white' : selectedColor}
                        onPress={() => {
                            setIsTickSelectedColor(!isTickSelectedColor)
                            setShowPalette(false)
                        }} /> */}
                </SharedModal>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 16,
    },
    clockContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        // borderColor: 'red',
        borderWidth: 2,
        // backgroundColor: '#ffffff67'
    }
});
