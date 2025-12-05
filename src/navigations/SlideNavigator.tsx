import PagerView from "react-native-pager-view";
import { Dimensions, StyleSheet, View } from "react-native";
import DigitalClock from "../screens/DigitalClock";
import ColoredDigitalClock from "../screens/ColoredDigitalClock";
import AnalogClock from "../screens/AnalogClock";
import SimpleColoredDigitalClock from "../screens/SimpleColoredDigitalClock";
import FloatDigitalClock from "../screens/FloatDigitalClock";


export default function SlideNavigator() {
    return (
        <PagerView style={styles.container} initialPage={0} orientation={"vertical"}>
            <AnalogClock key="1" />
            <SimpleColoredDigitalClock key="2" />
            <FloatDigitalClock key="3" />
            <ColoredDigitalClock key="4" />
            <DigitalClock key="5" />

        </PagerView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});