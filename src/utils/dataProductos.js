import manzana from "../assets/img/manzana.jpg";
import naranja from "../assets/img/naranja.jpg";
import platano from "../assets/img/platano.jpg";
import zanahoria from "../assets/img/zanahoria.jpg";
import espinaca from "../assets/img/espinaca.jpg";
import pimenton from "../assets/img/pimenton.jpg";
import miel from "../assets/img/miel.jpg";
import quinoa from "../assets/img/quinoa.jpg";
import leche from "../assets/img/leche.jpg";
import defaultImage from "../assets/img/img-principal.jpg";

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

export const productImages = {
  "manzana.jpg": manzana,
  "naranja.jpg": naranja,
  "platano.jpg": platano,
  "zanahoria.jpg": zanahoria,
  "espinaca.jpg": espinaca,
  "pimenton.jpg": pimenton,
  "miel.jpg": miel,
  "quinoa.jpg": quinoa,
  "leche.jpg": leche,
  "default": defaultImage,
};

export const initializeDataProductos = () => {
  if (!localStorage.getItem("ListaProductos")) {
    console.log("Inicializando productos en localStorage...");
    localStorage.setItem("ListaProductos", JSON.stringify(listaProductos));
  }
};

export const getProductosFromStorage = () => {
  const storedProducts = localStorage.getItem("ListaProductos");
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return [];
};

export const saveProductoToStorage = (nuevoProducto) => {
  try {
    // Obtener productos actuales
    const productos = getProductosFromStorage();
    
    // Generar nuevo ID (máximo ID + 1)
    const nuevoId = productos.length > 0 
      ? Math.max(...productos.map(p => p.id)) + 1 
      : 1;
    
    // Generar código del producto basado en categoría
    const prefijos = {
      "Frutas frescas": "FR",
      "Verduras organicas": "VR",
      "Productos organicos": "PO",
      "Productos lacteos": "PL",
    };
    
    // Contar cuántos productos hay de esta categoría
    const productosCategoria = productos.filter(p => p.categoria === nuevoProducto.categoria);
    const numeroConsecutivo = String(productosCategoria.length + 1).padStart(3, '0');
    const prefijo = prefijos[nuevoProducto.categoria] || "XX";
    const codigoProducto = `${prefijo}${numeroConsecutivo}`;
    
    // Crear objeto de producto completo
    const productoCompleto = {
      id: nuevoId,
      nombre: `${codigoProducto} - ${nuevoProducto.nombre}`,
      categoria: nuevoProducto.categoria,
      precio: parseInt(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock),
      descripcion: nuevoProducto.descripcion || "",
      imagen: nuevoProducto.imagen || "img-principal.jpg",
    };
    
    // Agregar nuevo producto
    productos.push(productoCompleto);
    
    // Guardar en localStorage
    localStorage.setItem("ListaProductos", JSON.stringify(productos));
    
    return { success: true, producto: productoCompleto };
  } catch (error) {
    console.error("Error al guardar producto:", error);
    return { success: false, error: error.message };
  }
};
