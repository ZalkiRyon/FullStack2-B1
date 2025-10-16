import React from "react";
import blog1 from "../../assets/img/blog1.jpg";
import blog2 from "../../assets/img/blog2.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";

const BlogPage = () => {
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
          <PrimaryButton text={"Ver blog"} />
        </div>

        <div className="containerImgBlogMin">
          <img alt="Imagen blog 1" src={blog1} className="imgBlogMin" />
        </div>
      </article>

      <article className="articleBlog">
        <div>
          <h3>
            Cómo armar una despensa saludable con productos de Huerto Hogar
          </h3>
          <p>
            Aprende a organizar tu despensa con productos frescos y orgánicos
            que te ayudarán a llevar una alimentación balanceada y consciente.
          </p>
          <PrimaryButton text={"Ver blog"} />
        </div>
        <div className="containerImgBlogMin">
          <img alt="Imagen blog 2" src={blog2} className="imgBlogMin" />
        </div>
      </article>
    </main>
  );
};

export default BlogPage;
