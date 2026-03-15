import { Colors, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface HorizontalProductCardProps {
    item: any;
    index: number;
}

export const HorizontalProductCard = ({ item, index }: HorizontalProductCardProps) => {
    const scale = useSharedValue(1);
    const { language } = useLanguage();
    const translated = getTranslatedProduct(item, language);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
        scale.value = withSpring(0.98);
    };

    const onPressOut = () => {
        scale.value = withSpring(1);
    };

    if (!item || !item.id) return null;

    return (
        <Link href={`/menu/${item.id}` as any} asChild>
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View
                    entering={FadeInRight.delay(index * 50).springify()}
                    style={[styles.container, animatedStyle]}
                >
                    {/* Image Section */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={[
                                styles.image,
                                item.available === false && styles.imageUnavailable
                            ]}
                            resizeMode="cover"
                        />
                        {item.available === false && (
                            <View style={styles.unavailableOverlay}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="#FFF" />
                            </View>
                        )}
                    </View>

                    {/* Content Section */}
                    <View style={styles.contentContainer}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title} numberOfLines={1}>{translated.title}</Text>
                            <Text style={styles.price}>{item.price.toFixed(2)}€</Text>
                        </View>

                        <Text style={styles.description} numberOfLines={2}>
                            {translated.description}
                        </Text>

                        {/* Footer / Badges */}
                        <View style={styles.footerRow}>
                            {item.isNew && (
                                <View style={styles.badgeNew}>
                                    <Text style={styles.badgeText}>NUEVO</Text>
                                </View>
                            )}
                            {item.allergens && item.allergens.length > 0 && (
                                <View style={styles.allergensRow}>
                                    <MaterialCommunityIcons name="silverware-fork-knife" size={14} color={Colors.textSecondary} />
                                    <Text style={styles.allergensText}>{item.allergens.length}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Arrow Indicator */}
                    <View style={styles.arrowContainer}>
                        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.border} />
                    </View>
                </Animated.View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.s,
        marginBottom: Spacing.m,
        ...Shadows.small,
        alignItems: 'center',
        ...Platform.select({
            web: {
                cursor: 'pointer',
                maxWidth: 800,
                alignSelf: 'center',
                width: '100%',
            }
        })
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageUnavailable: {
        opacity: 0.5,
    },
    unavailableOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        marginLeft: Spacing.m,
        justifyContent: 'space-between',
        height: 90, // Match roughly image height minus padding
        paddingVertical: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    title: {
        ...Typography.h3,
        fontSize: 16,
        color: Colors.text,
        flex: 1,
        lineHeight: 20,
    },
    price: {
        ...Typography.price,
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '700',
    },
    description: {
        ...Typography.caption,
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 18,
        flex: 1,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badgeNew: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    allergensRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.background,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    allergensText: {
        fontSize: 10,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    arrowContainer: {
        justifyContent: 'center',
        paddingLeft: Spacing.s,
    }
});
