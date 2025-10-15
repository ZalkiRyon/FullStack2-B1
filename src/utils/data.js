export const listaProductos = [
  {
    id: 1,
    nombre: "FR001 - Manzanas Fuji",
    categoria: "Frutas frescas",
    precio: 1200,
    stock: 150,
    descripcion:
      "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.",
    imagen: "manzana.jpg",
  },
  {
    id: 2,
    nombre: "FR002 - Naranjas Valencia",
    categoria: "Frutas frescas",
    precio: 1000,
    stock: 200,
    descripcion:
      "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.",
    imagen: "naranja.jpg",
  },
  {
    id: 3,
    nombre: "FR003 - Plátanos Cavendish",
    categoria: "Frutas frescas",
    precio: 800,
    stock: 250,
    descripcion:
      "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
    imagen: "platano.jpg",
  },
  {
    id: 4,
    nombre: "VR001 - Zanahorias Organicas",
    categoria: "Verduras organicas",
    precio: 900,
    stock: 100,
    descripcion:
      "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
    imagen: "zanahoria.jpg",
  },
  {
    id: 5,
    nombre: "VR002 - Espinacas Frescas",
    categoria: "Verduras organicas",
    precio: 700,
    stock: 80,
    descripcion:
      "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.",
    imagen: "espinaca.jpg",
  },
  {
    id: 6,
    nombre: "VR003 - Pimentones Tricolores",
    categoria: "Verduras organicas",
    precio: 1500,
    stock: 120,
    descripcion:
      "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.",
    imagen: "pimenton.jpg",
  },
  {
    id: 7,
    nombre: "PO001 - Miel Organica",
    categoria: "Productos organicos",
    precio: 5000,
    stock: 50,
    descripcion:
      "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
    imagen: "miel.jpg",
  },
  {
    id: 8,
    nombre: "PO002 - Quinua Organica",
    categoria: "Productos organicos",
    precio: 3000,
    stock: 70,
    descripcion:
      "Grano andino altamente nutritivo, ideal para ensaladas, sopas y guarniciones. La quinua es una excelente fuente de proteínas completas y fibra, cultivada sin el uso de pesticidas.",
    imagen: "quinoa.jpg",
  },
  {
    id: 9,
    nombre: "PL001 - Leche Entera",
    categoria: "Productos lacteos",
    precio: 1200,
    stock: 100,
    descripcion:
      "Leche fresca y pasteurizada, rica en calcio y vitaminas. Ideal para el consumo diario, ya sea sola o como ingrediente en diversas recetas.",
    imagen: "leche.jpg",
  },
];


export const usuarios = [
  // ADMINISTRADORES
  {
    id: 1,
    email: "admin",
    password: "admin123",
    role: "admin",
    nombre: "Super",
    apellido: "Administrador",
    run: "12.345.678-9",
    telefono: "912345678",
    region: "region-metropolitana",
    comuna: "santiago",
    direccion: "Av. Providencia 1234, Oficina 501",
    comentario: "Usuario administrador principal del sistema",
    fechaRegistro: "2024-01-15T08:00:00.000Z"
  },
  {
    id: 2,
    email: "maria.gonzalez@duoc.cl",
    password: "admin456",
    role: "admin",
    nombre: "María José",
    apellido: "González Pérez",
    run: "15.678.234-5",
    telefono: "987654321",
    region: "region-valparaiso",
    comuna: "valparaiso",
    direccion: "Calle Esmeralda 789, Casa 12",
    comentario: "Administradora de sistemas y base de datos",
    fechaRegistro: "2024-02-10T09:30:00.000Z"
  },
  {
    id: 3,
    email: "carlos.torres@profesor.duoc.cl",
    password: "admin789",
    role: "admin",
    nombre: "Carlos Eduardo",
    apellido: "Torres Silva",
    run: "18.234.567-8",
    telefono: "956789123",
    region: "region-biobio",
    comuna: "concepcion",
    direccion: "Av. O'Higgins 2456, Depto 34B",
    comentario: "Administrador de contenido y gestión académica",
    fechaRegistro: "2024-01-25T14:15:00.000Z"
  }, 

  // CLIENTES
  {
    id: 4,
    email: "ana.martinez@gmail.com",
    password: "cliente123",
    role: "cliente",
    nombre: "Ana María",
    apellido: "Martínez López",
    run: "19.876.543-2",
    telefono: "945678912",
    region: "region-metropolitana",
    comuna: "las-condes",
    direccion: "Av. Apoquindo 4567, Casa 78",
    comentario: "Cliente VIP, compra productos orgánicos semanalmente",
    fechaRegistro: "2024-03-05T10:20:00.000Z"
  },
  {
    id: 5,
    email: "pedro.ramirez@gmail.com",
    password: "cliente456",
    role: "cliente",
    nombre: "Pedro Antonio",
    apellido: "Ramírez Castro",
    run: "16.789.123-4",
    telefono: "934567891",
    region: "region-ohiggins",
    comuna: "rancagua",
    direccion: "Calle San Martín 1234, Villa El Sauce",
    comentario: "Cliente frecuente, prefiere frutas frescas locales",
    fechaRegistro: "2024-02-28T16:45:00.000Z"
  },
  {
    id: 6,
    email: "lucia.fernandez@duoc.cl",
    password: "cliente789",
    role: "cliente",
    nombre: "Lucía Elena",
    apellido: "Fernández Morales",
    run: "21.456.789-1",
    telefono: "923456789",
    region: "region-araucania",
    comuna: "temuco",
    direccion: "Pasaje Los Aromos 567, Población Nueva",
    comentario: "Estudiante DUOC, compra productos económicos y saludables",
    fechaRegistro: "2024-03-12T11:30:00.000Z"
  },

  // VENDEDORES
  {
    id: 7,
    email: "rodrigo.silva@duoc.cl",
    password: "vendedor123",
    role: "vendedor",
    nombre: "Rodrigo Alejandro",
    apellido: "Silva Mendoza",
    run: "17.345.678-9",
    telefono: "967891234",
    region: "region-metropolitana",
    comuna: "maipu",
    direccion: "Av. Pajaritos 3456, Block 12, Depto 204",
    comentario: "Vendedor especializado en productos orgánicos y frutas",
    fechaRegistro: "2024-02-15T08:45:00.000Z"
  },
  {
    id: 8,
    email: "sofia.herrera@gmail.com",
    password: "vendedor456",
    role: "vendedor",
    nombre: "Sofía Alejandra",
    apellido: "Herrera Vásquez",
    run: "20.123.456-7",
    telefono: "956781234",
    region: "region-maule",
    comuna: "talca",
    direccion: "Calle 1 Norte 2345, Villa Los Jardines",
    comentario: "Vendedora con experiencia en atención al cliente y productos lácteos",
    fechaRegistro: "2024-01-30T13:20:00.000Z"
  },
  {
    id: 9,
    email: "miguel.rojas@profesor.duoc.cl",
    password: "vendedor789",
    role: "vendedor",
    nombre: "Miguel Ángel",
    apellido: "Rojas Contreras",
    run: "14.567.890-1",
    telefono: "912347856",
    region: "region-valparaiso",
    comuna: "vina-del-mar",
    direccion: "Av. Libertad 1789, Casa 45",
    comentario: "Vendedor tiempo parcial, especialista en verduras orgánicas",
    fechaRegistro: "2024-02-05T15:10:00.000Z"
  }
];

export const regionesComunas = {
    'region-metropolitana': {
        nombre: 'Región Metropolitana',
        comunas: [
            { value: 'santiago', text: 'Santiago' },
            { value: 'las-condes', text: 'Las Condes' },
            { value: 'maipu', text: 'Maipú' },
            { value: 'providencia', text: 'Providencia' },
            { value: 'vitacura', text: 'Vitacura' }
        ]
    },
    'region-valparaiso': {
        nombre: 'Región de Valparaíso',
        comunas: [
            { value: 'valparaiso', text: 'Valparaíso' },
            { value: 'vina-del-mar', text: 'Viña del Mar' },
            { value: 'quilpue', text: 'Quilpué' },
            { value: 'villa-alemana', text: 'Villa Alemana' }
        ]
    },
    'region-biobio': {
        nombre: 'Región del Biobío',
        comunas: [
            { value: 'concepcion', text: 'Concepción' },
            { value: 'talcahuano', text: 'Talcahuano' },
            { value: 'chiguayante', text: 'Chiguayante' },
            { value: 'san-pedro', text: 'San Pedro de la Paz' }
        ]
    },
    'region-maule': {
        nombre: 'Región del Maule',
        comunas: [
            { value: 'talca', text: 'Talca' },
            { value: 'curico', text: 'Curicó' },
            { value: 'linares', text: 'Linares' },
            { value: 'molina', text: 'Molina' }
        ]
    },
    'region-ohiggins': {
        nombre: 'Región de O\'Higgins',
        comunas: [
            { value: 'rancagua', text: 'Rancagua' },
            { value: 'san-fernando', text: 'San Fernando' },
            { value: 'rengo', text: 'Rengo' },
            { value: 'machali', text: 'Machalí' }
        ]
    },
    'region-araucania': {
        nombre: 'Región de La Araucanía',
        comunas: [
            { value: 'temuco', text: 'Temuco' },
            { value: 'angol', text: 'Angol' },
            { value: 'villarrica', text: 'Villarrica' },
            { value: 'pucon', text: 'Pucón' }
        ]
    }
};

export const regionesYComunas = {
    "XV": {
        "nombre": "Región de Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    "I": {
        "nombre": "Región de Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
    "II": {
        "nombre": "Región de Antofagasta", 
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },
    "III": {
        "nombre": "Región de Atacama",
        "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
    "IV": {
        "nombre": "Región de Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    },
    "V": {
        "nombre": "Región de Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    },
    "RM": {
        "nombre": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
    },
    "VI": {
        "nombre": "Región del Libertador General Bernardo O'Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
    "VII": {
        "nombre": "Región del Maule",
        "comunas": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
    "XVI": {
        "nombre": "Región de Ñuble",
        "comunas": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
    },
    "VIII": {
        "nombre": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"]
    },
    "IX": {
        "nombre": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
    },
    "XIV": {
        "nombre": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    },
    "X": {
        "nombre": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    },
    "XI": {
        "nombre": "Región Aysén del General Carlos Ibáñez del Campo",
        "comunas": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    },
    "XII": {
        "nombre": "Región de Magallanes y de la Antártica Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    }
};

export const PREFIJOS_CATEGORIA = {
    'Frutas frescas': 'FR',
    'Verduras organicas': 'VR', 
    'Productos organicos': 'PO',
    'Productos lacteos': 'PL',
    'Cereales': 'CE',
    'Bebidas': 'BE',
    'Condimentos': 'CO',
    'Frutos secos': 'FS',
    'Carnes': 'CA',
    'Pescados': 'PE',
    'Panadería': 'PA',
    'Snacks': 'SN'
};