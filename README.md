# Huerto Hogar - Frontend

## Descripción del Proyecto

Huerto Hogar es una plataforma e-commerce que conecta a los productores del campo con las familias chilenas, ofreciendo productos frescos y de calidad directamente desde el origen. El frontend proporciona una experiencia completa para dos tipos de usuarios:

- **Tienda**: Interfaz para clientes que pueden explorar catálogos, gestionar su carrito de compras y realizar pedidos.
- **Administración**: Panel para gestionar usuarios, productos, categorías, órdenes y operaciones del negocio, con roles diferenciados (Administrador, Vendedor, Cliente).

## Tecnologías

- **React 19.1.1** - Framework principal
- **React Router DOM 6.28** - Enrutamiento y navegación
- **Axios 1.13.2** - Cliente HTTP para consumo de APIs
- **React Scripts 5.0.1** - Configuración y build tools
- **CSS3** - Estilos y diseño responsivo
- **Karma + Jasmine** - Framework de testing

## Requisitos Previos

- **Node.js** >= 16.x
- **npm** >= 8.x
- **Backend**: API REST en Spring Boot

## Instalación


## Instalar dependencias
```bash
npm install
```

## Configuración

El frontend está configurado para conectarse al backend en `http://localhost:8080`. Si necesitas cambiar esta URL, edita los archivos de servicio en `/src/services/` o la configuración de Axios en `/src/config/axiosConfig.js`.

## Ejecución

### Desarrollo
```bash
npm start
```
La aplicación se abrirá automáticamente en `http://localhost:3000`

## Testing

### Ejecutar pruebas unitarias
```bash
npm test
```

Las pruebas se ejecutan con Karma y Jasmine, configuradas en `karma.conf.js`.

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── admin/       # Componentes del panel administrativo
│   ├── store/       # Componentes de la tienda
│   └── common/      # Componentes compartidos
├── pages/           # Páginas principales
│   ├── admin/       # Vistas administrativas
│   ├── store/       # Vistas de la tienda
│   └── common/      # Páginas comunes (404, etc.)
├── services/        # Servicios de API
├── context/         # Context API (AuthContext)
├── config/          # Configuraciones (axios, interceptors)
├── layouts/         # Layouts principales
├── styles/          # Archivos CSS
└── utils/           # Utilidades y helpers
```

## Funcionalidades Principales

### Tienda
- Navegación de catálogo de productos por categorías
- Carrito de compras con cálculo de envío
- Registro y autenticación de usuarios
- Historial de pedidos
- Páginas informativas (Sobre Nosotros, Blog, Contacto)

### Panel Administrativo
- **Gestión de Usuarios**: CRUD completo con validaciones de email y RUN
- **Gestión de Productos**: Administración con categorías y generación automática de códigos
- **Gestión de Órdenes**: Visualización y actualización de estados de pedidos
- **Dashboard**: Métricas y resumen de operaciones
- **Roles**: Control de acceso basado en roles (Admin, Vendedor, Cliente)

## Autenticación

El sistema implementa autenticación JWT con las siguientes características:
- Token Bearer almacenado en `localStorage`
- Interceptor de Axios para inyectar token en requests
- Redirección automática al login en caso de token expirado
- Context API para manejo global del estado de autenticación


## Autores

Desarrollado con mucho amor, sudor y café por:
- [Sebastián Valdivia](https://github.com/ZalkiRyon)
- [Paula Frías](https://github.com/paufriasest)

```
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⠀⠀⠀⢀⣀⠤⠤⠄⣠⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠔⠊⠉⠀⠉⠢⢄⠔⠋⠀⠀⠙⠊⠉⢀⣠⢴⣾⠿⠀⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣔⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠲⡿⠑⢛⡓⢶⣤⢸⡇⠀⠀⠀⠀⠀
⠀⢀⠔⠒⠒⠒⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢠⡤⠀⠈⢺⡓⠾⡉⠀⡸⡇⠀⠀⠀⠀⠀
⠀⠈⣖⠂⢉⣽⡫⢍⣍⠛⢫⡟⠁⠀⠀⠀⠀⠠⠤⠤⠤⠤⠀⠒⠊⠁⠀⠀⠀⠀⠹⡽⣿⣄⢳⠃⠀⠀⠀⠀⠀
⠀⠀⢻⡤⠾⠛⡸⢋⣴⢂⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⣄⠠⣀⠀⢠⡀⠀⠙⠲⣫⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠈⢷⡄⣼⡴⠗⡟⡞⠀⠀⠀⠀⢠⠀⢀⠀⢀⡄⣴⢠⣿⡸⢻⣦⡟⠓⠒⠛⠢⢄⠀⠑⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠘⢟⢏⠀⢸⣻⠁⠀⠀⠀⣰⡟⢠⣏⣠⠾⢿⣹⡏⣸⡷⠋⢹⣿⡄⠀⠀⠀⠀⠹⢤⣈⢦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠳⣍⠺⠿⠀⠀⠀⣰⣻⢷⣿⡅⠀⠀⠀⠈⠙⢷⡃⠀⠀⢿⣷⠀⠀⠀⠀⣰⣄⠹⡿⢷⣄⠀⠀⠀
⠀⠀⠀⠀⠀⡘⠀⣠⣾⠀⠀⢰⢳⠃⠀⢿⣿⡀⠀⠀⠀⠀⢀⡧⡀⠀⠈⢿⠀⠀⣀⣴⡟⠈⢦⡰⡄⠉⠀⠀⠀
⠀⠀⠀⠀⢰⣷⡿⡿⡟⠀⢠⠇⢀⠀⠀⠈⣿⣇⠀⠀⠀⣠⠎⠀⠈⠉⠒⠖⠚⠉⠁⣸⣧⡀⠀⠱⣵⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠁⠀⣧⣇⣀⣎⣂⡈⢦⣀⣀⣈⣿⠠⠔⡎⠁⠀⠀⡦⣀⣀⡔⠀⠀⣠⡋⠘⡈⠑⠦⣼⡆⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠔⠋⠀⠀⠀⢀⠉⠻⣷⣈⢦⡀⠀⠀⠈⠒⠤⠒⠁⠀⠀⠀⣀⣼⡟⢧⡀⡇⠀⠀⠈⠁⠀⠀⠀
⠀⠀⠀⠀⢠⠋⠀⠀⠀⠀⠀⠘⠚⠀⠘⠸⣷⠭⣶⣤⣀⡀⠀⠀⣀⣠⣤⡞⠙⢽⠃⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⡀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣧⣯⣷⠶⣾⢏⣩⡟⠛⠻⡿⡏⠉⠹⡝⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⡷⣄⠀⠀⠀⠀⠀⠀⢀⡞⣷⠉⠻⣆⠈⠆⠈⠉⠒⠐⠊⠁⠀⠸⣇⠀⠀⠑⢦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠢⣉⠒⠒⠀⢐⣾⣏⠉⢹⠀⠀⠘⠀⡘⠀⠀⠀⠀⠀⠀⠀⠀⢃⣩⣶⠒⠀⢹⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠰⡄⢈⡏⠀⣤⡶⠿⢽⡀⠀⠀⠀⠀⠀⠀⠀⢨⠾⢁⣀⣠⡞⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠈⠉⠁⢣⠀⠈⢏⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠈⠙⡁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠇⠀⢘⡄⠀⠀⠀⠀⠀⠀⢀⡕⠀⠉⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⡶⠋⣿⣿⡷⠶⠿⠷⡦⠤⠤⠤⠴⠛⢷⠀⠀⣀⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠋⣠⢃⣼⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡀⠽⠋⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠎⢀⣾⠕⠉⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⣰⠟⠁⠀⣸⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠃⣰⠏⠀⠀⠀⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⡀⠀⠀⠀⠀⠀⡰⠁⣰⠃⠀⠀⠀⣸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠊⡄⠀⠀⠀⠀⠀⠀⠀⠀
⣸⡁⠈⢇⠀⠀⢀⡴⠁⣼⠃⠀⠀⠀⢀⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣿⣦⡈⠓⠒⠋⣠⡾⠁⠀⠀⠀⠀⠀⢙⣿⣿⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠛⠿⣓⣲⠿⠋⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡏⠈⠉⠓⠒⠤⠤⠤⠤⢒⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠝⢿⣦⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣽⣿⣿⣷⣦⣀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⢿⣾⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣿⣿⣿⣿⢶⣤⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```
