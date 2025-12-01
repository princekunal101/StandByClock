import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { FigtreeFont } from "../shared/constants/figtree-font";

export default function DigitalClock() {

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
            <Text numberOfLines={1} style={styles.largeText}>{hour + ':' + minute}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 280,
        padding: 16,
        color: '#eee',
        textAlign: 'center',
        fontFamily: FigtreeFont.bold,
        letterSpacing: -10,

    }
});