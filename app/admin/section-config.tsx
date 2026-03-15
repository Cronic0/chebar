import { Colors, Spacing } from '@/constants/Theme';
import { SectionConfig, useAdmin } from '@/context/AdminContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View
} from 'react-native';

export default function SectionConfigScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { sectionsSettings, updateSectionSettings, isAuthenticated } = useAdmin();
    const router = useRouter();

    const [config, setConfig] = useState<SectionConfig | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/admin/login');
            return;
        }

        if (id && sectionsSettings[id]) {
            setConfig(sectionsSettings[id]);
        } else if (id) {
            // Initialize if not exists
            setConfig({
                id,
                showTitle: true,
                autoScroll: false,
                scrollSpeed: 3000
            });
        }
    }, [id, sectionsSettings, isAuthenticated]);

    const handleSave = async () => {
        if (!config || !id) return;

        setIsSaving(true);
        try {
            await updateSectionSettings(id, config);
            Alert.alert('Éxito', 'Configuración guardada correctamente');
            router.back();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar la configuración');
        } finally {
            setIsSaving(false);
        }
    };

    if (!config) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    const getSectionName = (sectionId: string) => {
        switch (sectionId) {
            case 'recommendations': return 'Recomendaciones del Chef';
            case 'offmenu': return 'Fuera de Carta';
            default: return 'Sección';
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
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Configurar {getSectionName(id!)}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* Content Configuration */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contenido</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Título Personalizado</Text>
                            <TextInput
                                style={styles.input}
                                value={config.customTitle}
                                onChangeText={(text) => setConfig({ ...config, customTitle: text })}
                                placeholder={id === 'recommendations' ? 'Sugerencias del Chef' : 'Fuera de Carta'}
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                            <Text style={styles.helpText}>Deja en blanco para usar el título por defecto.</Text>
                        </View>

                        <View style={styles.switchRow}>
                            <View style={styles.switchInfo}>
                                <Text style={styles.switchLabel}>Mostrar Título</Text>
                                <Text style={styles.switchSub}>Oculta el título si prefieres una vista más limpia.</Text>
                            </View>
                            <Switch
                                value={config.showTitle}
                                onValueChange={(val) => setConfig({ ...config, showTitle: val })}
                                trackColor={{ false: '#334155', true: Colors.primary }}
                                thumbColor={'#FFF'}
                            />
                        </View>

                        {id === 'offmenu' && (
                            <View style={styles.switchRow}>
                                <View style={styles.switchInfo}>
                                    <Text style={styles.switchLabel}>Mostrar Descripción</Text>
                                    <Text style={styles.switchSub}>Muestra el texto introductorio de la sección.</Text>
                                </View>
                                <Switch
                                    value={config.showDescription}
                                    onValueChange={(val) => setConfig({ ...config, showDescription: val })}
                                    trackColor={{ false: '#334155', true: Colors.primary }}
                                    thumbColor={'#FFF'}
                                />
                            </View>
                        )}
                    </View>

                    {/* Carousel Configuration */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Comportamiento del Carrusel</Text>

                        <View style={styles.switchRow}>
                            <View style={styles.switchInfo}>
                                <Text style={styles.switchLabel}>Movimiento Automático</Text>
                                <Text style={styles.switchSub}>Desplaza los productos automáticamente.</Text>
                            </View>
                            <Switch
                                value={config.autoScroll}
                                onValueChange={(val) => setConfig({ ...config, autoScroll: val })}
                                trackColor={{ false: '#334155', true: Colors.primary }}
                                thumbColor={'#FFF'}
                            />
                        </View>

                        {config.autoScroll && (
                            <View style={styles.inputGroup}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.label}>Velocidad</Text>
                                    <Text style={styles.valueLabel}>{(config.scrollSpeed / 1000).toFixed(1)}s</Text>
                                </View>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={1000}
                                    maximumValue={10000}
                                    step={500}
                                    value={config.scrollSpeed}
                                    onValueChange={(val) => setConfig({ ...config, scrollSpeed: val })}
                                    minimumTrackTintColor={Colors.primary}
                                    maximumTrackTintColor="rgba(255,255,255,0.3)"
                                    thumbTintColor="#FFF"
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.sliderLabel}>Rápido (1s)</Text>
                                    <Text style={styles.sliderLabel}>Lento (10s)</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Save Button */}
                    <Pressable
                        style={[styles.saveButton, isSaving && { opacity: 0.7 }]}
                        onPress={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <>
                                <MaterialCommunityIcons name="content-save" size={20} color="#FFF" />
                                <Text style={styles.saveButtonText}>Guardar Configuración</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
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
        flex: 1,
    },
    content: {
        padding: Spacing.l,
    },
    section: {
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 16,
        padding: Spacing.m,
        marginBottom: Spacing.l,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Spacing.m,
    },
    inputGroup: {
        marginBottom: Spacing.m,
    },
    label: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        padding: 12,
        color: '#FFF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    helpText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 4,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.m,
        paddingVertical: 4,
    },
    switchInfo: {
        flex: 1,
        paddingRight: 16,
    },
    switchLabel: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '600',
        marginBottom: 2,
    },
    switchSub: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    valueLabel: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    sliderLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    saveButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: Spacing.m,
        marginBottom: 40,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
