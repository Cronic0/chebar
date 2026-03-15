import { Colors, Spacing } from '@/constants/Theme';
import { useAdmin } from '@/context/AdminContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function BannerEditScreen() {
    const { bannerConfig, updateBannerConfig, showBannerCarousel, toggleBannerCarousel } = useAdmin();
    const router = useRouter();

    const [title, setTitle] = useState(bannerConfig.title || '');
    const [subtitle, setSubtitle] = useState(bannerConfig.subtitle || '');
    const [image, setImage] = useState(bannerConfig.imageUrl || '');
    const [linkPath, setLinkPath] = useState(bannerConfig.linkPath || '');
    const [darkOpacity, setDarkOpacity] = useState(bannerConfig.darkOverlayOpacity ?? 0.7);
    const [whiteOpacity, setWhiteOpacity] = useState(bannerConfig.whiteOverlayOpacity ?? 0.0);
    const [isSaving, setIsSaving] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.2, // Lower quality to avoid huge base64 strings
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
            const sizeInBytes = result.assets[0].base64.length * 0.75;
            if (sizeInBytes > 1000000) {
                Alert.alert('Error', 'La imagen es demasiado grande incluso comprimida. Por favor, pega un enlace directo de internet abajo.');
                return;
            }
            setImage(base64Image);
        }
    };

    const handleSave = async () => {
        const safeTitle = (title || '').trim();
        const safeSubtitle = (subtitle || '').trim();
        const safeLinkPath = (linkPath || '').trim();

        if (!safeTitle) {
            window.alert('Error: El título es obligatorio');
            return;
        }
        if (!image) {
            window.alert('Error: La imagen es obligatoria');
            return;
        }

        setIsSaving(true);

        try {
            await updateBannerConfig({
                title: safeTitle,
                subtitle: safeSubtitle,
                imageUrl: image,
                linkPath: safeLinkPath,
                darkOverlayOpacity: darkOpacity,
                whiteOverlayOpacity: whiteOpacity,
            });

            setIsSaving(false);
            window.alert('✅ Banner actualizado correctamente');
            setTimeout(() => {
                router.back();
            }, 100);
        } catch (error) {
            console.error('Error saving banner:', error);
            setIsSaving(false);
            window.alert(`Error: Hubo un problema al guardar: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Stack.Screen options={{ headerShown: false }} />

            <LinearGradient
                colors={['#0f172a', '#1e293b']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Pressable
                        onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.replace('/admin');
                            }
                        }}
                        style={styles.backButton}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Editar Banner</Text>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Título *</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Semana del Atún"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </View>

                    {/* Subtitle Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Slogan / Subtítulo</Text>
                        <TextInput
                            style={styles.input}
                            value={subtitle}
                            onChangeText={setSubtitle}
                            placeholder="Descubre nuestros platos especiales"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </View>

                    {/* Image Picker */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Imagen del Banner *</Text>
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            value={image}
                            onChangeText={setImage}
                            placeholder="https://ejemplo.com/imagen.jpg o pega base64..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                        <Text style={[styles.helpText, { marginBottom: 12 }]}>
                            Pega un enlace de internet (recomendado) o sube una foto comprimida:
                        </Text>
                        <Pressable style={styles.imagePickerButton} onPress={pickImage}>
                            <MaterialCommunityIcons name="image-plus" size={24} color="#FFF" />
                            <Text style={styles.imagePickerText}>
                                {image && image.startsWith('data:') ? 'Cambiar Archivo' : 'Subir desde la Galería'}
                            </Text>
                        </Pressable>
                        {image && (
                            <View style={styles.imagePreview}>
                                <Text style={styles.previewLabel}>Vista previa:</Text>
                                <View style={styles.previewContainer}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.previewImage}
                                        resizeMode="cover"
                                    />
                                    <LinearGradient
                                        colors={[`rgba(255,255,255,${whiteOpacity})`, `rgba(0,0,0,${darkOpacity})`]}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.previewTextContainer}>
                                        <Text style={styles.previewTitle}>{title || 'Título del Banner'}</Text>
                                        <Text style={styles.previewSubtitle}>{subtitle || 'Subtítulo del Banner'}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Link Path Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ruta de Enlace</Text>
                        <Text style={styles.helpText}>
                            Ruta interna de la app (ej: /semana-del-atun)
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={linkPath}
                            onChangeText={setLinkPath}
                            placeholder="/semana-del-atun"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </View>

                    {/* Overlay Opacity Controls */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Filtro Oscuro (Inferior)</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={1}
                                step={0.1}
                                value={darkOpacity}
                                onValueChange={setDarkOpacity}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor="rgba(255,255,255,0.3)"
                                thumbTintColor="#FFF"
                            />
                            <Text style={styles.sliderValue}>{darkOpacity.toFixed(1)}</Text>
                        </View>
                        <Text style={styles.helpText}>Ajusta la oscuridad del fondo en la parte inferior para leer mejor el texto.</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Filtro Blanco (Superior)</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={1}
                                step={0.1}
                                value={whiteOpacity}
                                onValueChange={setWhiteOpacity}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor="rgba(255,255,255,0.3)"
                                thumbTintColor="#FFF"
                            />
                            <Text style={styles.sliderValue}>{whiteOpacity.toFixed(1)}</Text>
                        </View>
                        <Text style={styles.helpText}>Ajusta el brillo en la parte superior.</Text>
                    </View>

                    {/* Carousel Toggle */}
                    <View style={styles.toggleSection}>
                        <View style={styles.toggleInfo}>
                            <MaterialCommunityIcons
                                name="view-carousel"
                                size={24}
                                color={showBannerCarousel ? Colors.primary : 'rgba(255,255,255,0.5)'}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.toggleTitle}>Carrusel de Productos</Text>
                                <Text style={styles.toggleSubtitle}>
                                    {showBannerCarousel ? '✓ Muestra productos marcados como banner' : '✕ Solo muestra el banner estático'}
                                </Text>
                            </View>
                        </View>
                        <Pressable
                            style={[styles.toggleButton, showBannerCarousel && styles.toggleButtonActive]}
                            onPress={() => {
                                console.log('Toggling banner carousel, current:', showBannerCarousel);
                                toggleBannerCarousel();
                            }}
                        >
                            <View style={[styles.toggleThumb, showBannerCarousel && styles.toggleThumbActive]} />
                        </Pressable>
                    </View>

                    {/* Save Button */}
                    <Pressable
                        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                        onPress={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <ActivityIndicator color="#FFF" size="small" />
                                <Text style={styles.saveButtonText}>Guardando...</Text>
                            </>
                        ) : (
                            <>
                                <MaterialCommunityIcons name="content-save" size={20} color="#FFF" />
                                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                            </>
                        )}
                    </Pressable>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.l,
        paddingTop: 60,
        paddingBottom: Spacing.m,
        gap: Spacing.m,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.l,
    },
    inputGroup: {
        marginBottom: Spacing.l,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: Spacing.s,
    },
    helpText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: Spacing.s,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: Spacing.m,
        color: '#FFF',
        fontSize: 16,
    },
    imagePreview: {
        marginTop: Spacing.m,
    },
    previewLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: Spacing.s,
    },
    previewImage: {
        width: '100%',
        height: 150,
    },
    previewContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
        height: 150,
        position: 'relative',
    },
    previewTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.m,
    },
    previewTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    previewSubtitle: {
        color: '#FFF',
        fontSize: 14,
        opacity: 0.9,
    },
    imagePickerButton: {
        flexDirection: 'row',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 12,
        padding: Spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.s,
    },
    imagePickerText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    toggleSection: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: Spacing.m,
        borderRadius: 12,
        marginBottom: Spacing.l,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: Spacing.m,
    },
    toggleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 2,
    },
    toggleSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    toggleButton: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    toggleButtonActive: {
        backgroundColor: Colors.primary,
        alignItems: 'flex-end',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleThumbActive: {
        // Position handled by parent alignItems
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        padding: Spacing.m,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.s,
        marginTop: Spacing.m,
        marginBottom: Spacing.xl * 2,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
    sliderValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        width: 40,
        textAlign: 'right',
    },
});
