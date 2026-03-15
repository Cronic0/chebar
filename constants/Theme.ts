import { Platform, TextStyle } from 'react-native';

export const Colors = {
    // Minimalist Grayscale Palette
    background: '#FFFFFF', // Pure white
    surface: '#F5F5F5', // Light gray surface
    primary: '#171717', // Near black
    primaryDark: '#0A0A0A', // Black
    secondary: '#525252', // Medium gray
    secondaryDark: '#404040', // Dark gray
    accent: '#262626', // Darker gray
    text: '#171717', // Near black for primary text
    textSecondary: '#737373', // Light gray for secondary text
    border: '#E5E5E5', // Light gray border
    error: '#EF4444', 
    success: '#10B981', 
    overlay: 'rgba(0, 0, 0, 0.6)', // Black overlay
};

export const LightColors = {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#fc0103',
    primaryDark: '#c50102',
    secondary: '#F7B500',
    secondaryDark: '#C49000',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    error: '#DC2626',
    success: '#fc0103',
    cardShadow: 'rgba(148, 163, 184, 0.1)',
    overlay: 'rgba(255, 255, 255, 0.9)',
};

export const Spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
};

export const Shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    large: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
};

interface TypographyStyles {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    price: TextStyle;
    button: TextStyle;
}

const fontPrimary = Platform.select({ ios: 'System', android: 'Roboto', web: 'Inter, sans-serif' });
const fontDisplay = Platform.select({ ios: 'Georgia', android: 'serif', web: 'Playfair Display, serif' }); // Elegant Serif for headers

export const Typography: TypographyStyles = {
    h1: {
        fontFamily: fontDisplay,
        fontSize: 48, // Increased size for impact
        fontWeight: '700',
        letterSpacing: -0.5,
        color: Colors.text,
    },
    h2: {
        fontFamily: fontDisplay,
        fontSize: 32,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: Colors.text,
    },
    h3: {
        fontFamily: fontDisplay,
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: Colors.text,
    },
    body: {
        fontFamily: fontPrimary,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        color: Colors.textSecondary,
    },
    caption: {
        fontFamily: fontPrimary,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.5,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    price: {
        fontFamily: fontDisplay, // Serif for prices looks premium
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: Colors.primary,
    },
    button: {
        fontFamily: fontPrimary,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
};
