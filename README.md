# 🥩 Che Bar - Interactive Menu App

Una experiencia digital moderna para **Che Bar**, construido con React Native y Expo. Esta aplicación transforma la carta tradicional en una experiencia interactiva. ¡Las mejores tapas y empanadas argentinas en la playa de La Barrosa, Chiclana!

## ✨ Características Principales

### Para Clientes
- 📱 **Carta Digital Interactiva**: Navegación visual e intuitiva por nuestras tapas y platos.
- 🔍 **Filtro de Alérgenos Inteligente**: Seguridad alimentaria ante todo. Filtra la carta según tus necesidades.
- 🐟 **Eventos Especiales**: Secciones dedicadas para eventos como la **Semana del Atún**.
- ⭐ **Favoritos**: Guarda tus tapas preferidas para tu próxima visita.
- 🌐 **Multi-idioma**: Bienvenidos turistas. Soporte completo para Español, Inglés, Francés y Alemán.
- 🎨 **Experiencia Premium**: Diseño inmersivo con animaciones fluidas y estética andaluza moderna.

### Tecnología GastroCode
Esta aplicación está impulsada por **GastroCode**, nuestra plataforma de gestión integral para hostelería:
- 📊 **Analítica Avanzada**: Datos reales sobre las preferencias de los clientes.
- 🔄 **Sincronización en Tiempo Real**: Cambios de precios y disponibilidad instantáneos.
- 🛠️ **Panel de Control**: Gestión total del restaurante desde el móvil.

### Para Administradores (Panel de Gestión)
- 🔐 **Acceso Seguro**: Panel protegido para gerencia.
- 📝 **Gestión de Carta**: Añade, edita o retira platos al instante.
- 📸 **Gestión Multimedia**: Actualiza las fotos de tus platos.
- ⏰ **Horarios Dinámicos**: Ajusta los horarios de apertura según la temporada.
- 🎪 **Gestión de Campañas**: Activa banners y secciones especiales (ej. Semana del Atún).

## 🚀 Instalación

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Expo CLI
- Expo Go app (para pruebas en dispositivos físicos)

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Cronic0/chebar.git

# Ir al directorio del proyecto
cd chebar

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

## 📱 Uso

### Para Desarrollo
```bash
# Iniciar en modo desarrollo
npm start

# Iniciar en Android
npm run android

# Iniciar en iOS
npm run ios

# Iniciar en Web
npm run web
```

### Acceso al Panel Admin
1. Navega a la sección "Admin" desde el menú o el footer de la landing page.
2. Contraseña por defecto: `1234`
3. Accede a:
   - **Dashboard**: Estadísticas y resumen.
   - **Editar Menú**: Gestión de productos y categorías.
   - **Configuración**: Horarios y secciones especiales.

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático y seguridad
- **Expo Router** - Navegación basada en archivos
- **Reanimated** - Animaciones fluidas a 60fps
- **Linear Gradient** - Estética visual
- **AsyncStorage** - Persistencia de datos local

## 📁 Estructura del Proyecto

```
CHE_BAR_APP/
├── app/                    # Pantallas de la aplicación
│   ├── admin/             # Panel de administración
│   ├── menu/              # Menú y detalles de productos
│   ├── allergens.tsx      # Filtro de alérgenos
│   ├── favorites.tsx      # Productos favoritos
│   ├── gastrocode.tsx     # Landing page
│   ├── semana-del-atun.tsx # Sección especial de evento
│   └── index.tsx          # Landing page principal (Che Bar)
├── components/            # Componentes reutilizables
├── constants/             # Constantes, temas y traducciones
├── context/              # Estado global (Admin, Idioma, Favoritos, Analytics)
├── data/                 # Datos iniciales del menú
└── assets/               # Recursos gráficos
```

## ⚙️ Configuración Especial

### Secciones Dinámicas
Desde el panel de administración puedes activar secciones temáticas:
- **Semana del Atún**: Activa una vista especial con platos de atún.
- **Recomendaciones**: Destaca platos específicos.
- **Fuera de Carta**: Muestra especiales del día.

## 📧 Contacto y Soporte

- **Soporte Técnico**: info@chebar.com
- **Restaurante**: info@chebar.com


**Powered by GastroCode con ❤️** - *Digitalizando la hostelería con alma.*


