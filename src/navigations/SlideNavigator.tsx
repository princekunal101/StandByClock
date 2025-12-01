import PagerView from "react-native-pager-view";
import { StyleSheet } from "react-native";
import DigitalClock from "../screens/DigitalClock";
import ColoredDigitalClock from "../screens/ColoredDigitalClock";
import AnalogClock from "../screens/AnalogClock";

export default function SlideNavigator() {
    return (
        <PagerView style={styles.container} initialPage={0} orientation={"vertical"}>
            <DigitalClock key="1" />
            <ColoredDigitalClock key="2" />
            {/* <AnalogClock key="3"/> */}
        </PagerView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});