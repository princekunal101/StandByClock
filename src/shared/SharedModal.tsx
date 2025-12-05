import { BlurView } from "@react-native-community/blur";
import { useEffect } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import RNHapticFeedback from "react-native-haptic-feedback";

interface SharedModalProps {
    visible: boolean,
    onClose: () => void,
    title?: string,
    children: React.ReactNode,
}
export default function SharedModal({ visible, onClose, title, children }: SharedModalProps) {

    useEffect(() => {
        if (visible) {
            RNHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true
            })
        }
    }, [visible])

    const haptickFeedback = () => {
        RNHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        })
    }

    return (

        <Modal visible={visible} transparent animationType={'slide'} onMagicTap={onClose}>
            <Pressable style={{ flex: 1 }} onPress={() => { haptickFeedback(); onClose(); }}>
                <View style={styles.modalOverlay}>
                    <Pressable style={{ flex: 1 }} onPress={() => { }}>

                        <BlurView style={styles.modalBlurOverlay} blurAmount={5} blurRadius={18} blurType='light' overlayColor="transparent" >

                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
                            <ScrollView style={styles.paletteBox} bounces={true} horizontal showsHorizontalScrollIndicator={false}>
                                {children}
                            </ScrollView>
                            <Pressable style={styles.paletteCloseButton}
                                onPress={() => { haptickFeedback(); onClose(); }}>
                                <Text style={{ color: 'white', fontSize: 22 }}>&times;</Text>
                            </Pressable>
                        </BlurView>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalOverlay: {
        position: 'absolute',
        bottom: 0,
        // justifyContent: 'center',
        borderTopEndRadius: 26,
        borderTopStartRadius: 22,
        height: 130,
        width: '100%',
        // paddingHorizontal: 16,
        overflow: 'hidden'
    },

    modalBlurOverlay: {
        position: 'absolute',
        paddingVertical: 8,
        flexDirection: 'column',
        gap: 28,
        height: 130,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#88888835',

    },

    paletteBox: {
        height: '100%',
        width: '100%',
        // direction: 'rtl',
    },

    paletteCloseButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#777777aa',
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    }

})