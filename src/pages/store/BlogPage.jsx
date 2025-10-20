import { useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import NewsModal from "../../components/store/NewsModal";
import blog1 from "../../assets/img/blog1.jpg";
import blog2 from "../../assets/img/blog2.jpg";
import author1 from "../../assets/img/pf.png";
import author2 from "../../assets/img/sv.png";

const news1Data = {
  title: "La importancia de consumir productos locales y frescos",
  bannerImgSrc: blog1,
  bodyText: [
    "En un mundo donde muchas veces priorizamos la rapidez sobre la calidad, olvidamos el verdadero valor de los alimentos frescos y locales. En Huerto Hogar creemos que cada compra es una decisión con impacto: al elegir productos directamente del campo, no solo recibes frutas y verduras llenas de sabor y nutrientes, también apoyas a familias agricultoras de distintas regiones de Chile.",
    "Además, consumir productos locales reduce la huella de carbono, ya que los alimentos no necesitan recorrer grandes distancias para llegar a tu mesa. Esto significa menos transporte, menos contaminación y más frescura.",
    "Imagina preparar un jugo con naranjas recién cosechadas o un batido verde con espinacas orgánicas cultivadas sin químicos. Esa frescura se siente, se saborea y también contribuye a un estilo de vida más sostenible.",
    "En Huerto Hogar te invitamos a ser parte de este cambio: cuidar tu salud, apoyar al campo y construir un futuro más verde con cada compra.",
  ],
  authorImgSrc: author1,
  authorName: "Paula Frias",
  publishDate: "02 de Septiembre, 2025",
  tags: ["Sostenibilidad", "Huella de carbono"],
};

const news2Data = {
  title: "Cómo armar una despensa saludable con productos de Huerto Hogar",
  bannerImgSrc: blog2,
  bodyText: [
    "Una despensa bien organizada es el primer paso hacia una vida más saludable. En Huerto Hogar sabemos que la base de una buena alimentación está en los ingredientes, por eso queremos inspirarte a llenar tu cocina con lo mejor del campo.",
    "Empieza con frutas frescas como manzanas Fuji y plátanos Cavendish, ideales para snacks rápidos o postres nutritivos. Agrega verduras orgánicas como zanahorias o pimientos tricolores, que aportan color, vitaminas y antioxidantes a tus comidas.",
    "No olvides los básicos que no pueden faltar: miel orgánica para endulzar naturalmente tus bebidas, y quinua para preparar ensaladas o acompañar platos principales. Estos productos, además de ser nutritivos, están elaborados bajo prácticas sostenibles que respetan la tierra y a quienes la trabajan.",
    "Con pequeñas elecciones diarias puedes transformar tu alimentación y la de tu familia. Y lo mejor: todo lo encuentras en un solo lugar, con la frescura y calidad que Huerto Hogar garantiza.",
  ],
  authorImgSrc: author2,
  authorName: "Sebastian Valdivia",
  publishDate: "20 de Abril, 2025",
  tags: ["Despensa saludable", "Organizacion cocina"],
};

const BlogPage = () => {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  return (
    <main className="mainPage">
      <h1>Noticias importantes</h1>

      <article className="articleBlog">
        <div>
          <h3>La importancia de consumir productos locales y frescos</h3>
          <p>
            Descubre por qué elegir frutas y verduras locales no solo beneficia
            tu salud, sino también a los agricultores y al medio ambiente.
          </p>
          <PrimaryButton
            text={"Ver blog"}
            onClick={() => setIsOpenModal1(true)}
          />
        </div>

        <div className="containerImgBlogMin">
          <img alt="Imagen blog 1" src={blog1} className="imgBlogMin" />
        </div>
      </article>

      <NewsModal
        isOpen={isOpenModal1}
        onClose={() => setIsOpenModal1(false)}
        title={news1Data.title}
        bannerImageSrc={news1Data.bannerImgSrc}
        bodyText={news1Data.bodyText}
        authorImageSrc={news1Data.authorImgSrc}
        authorName={news1Data.authorName}
        publishDate={news1Data.publishDate}
        tags={news1Data.tags}
      />

      <article className="articleBlog">
        <div>
          <h3>
            Cómo armar una despensa saludable con productos de Huerto Hogar
          </h3>
          <p>
            Aprende a organizar tu despensa con productos frescos y orgánicos
            que te ayudarán a llevar una alimentación balanceada y consciente.
          </p>
          <PrimaryButton
            text={"Ver blog"}
            onClick={() => setIsOpenModal2(true)}
          />
        </div>
        <div className="containerImgBlogMin">
          <img alt="Imagen blog 2" src={blog2} className="imgBlogMin" />
        </div>
      </article>

      <NewsModal
        isOpen={isOpenModal2}
        onClose={() => setIsOpenModal2(false)}
        title={news2Data.title}
        bannerImageSrc={news2Data.bannerImgSrc}
        bodyText={news2Data.bodyText}
        authorImageSrc={news2Data.authorImgSrc}
        authorName={news2Data.authorName}
        publishDate={news2Data.publishDate}
        tags={news2Data.tags}
      />
    </main>
  );
};

export default BlogPage;
