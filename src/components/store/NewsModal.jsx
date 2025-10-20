import PrimaryButton from "../common/PrimaryButton";

const NewsModal = ({
  isOpen,
  onClose,
  title,
  bannerImageSrc,
  bodyText,
  authorImageSrc,
  authorName,
  publishDate,
  tags = [],
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="newsModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="newsHeaderTitle">
          <h1>{title}</h1>
        </div>

        <div className="imgBlogMaxContainer">
          <img
            src={bannerImageSrc}
            alt={`Banner para: ${title}`}
            className="imgBlogMax"
          />
        </div>

        <div className="newsBodyWrapper">
          <div>
            {bodyText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="newsTags">
            {tags.map((tag) => (
              <span key={tag} className="tagItem">
                {tag}
              </span>
            ))}
          </div>

          <div className="newsAuthorInfo">
            <img
              src={authorImageSrc}
              alt={`Avatar de ${authorName}`}
              className="authorAvatar"
            />
            <div className="authorDetails">
              <p className="authorName">{authorName}</p>
              <p className="publishDate">Publicado el {publishDate}</p>
            </div>
          </div>
        </div>

        <div className="newsFooter">
          <PrimaryButton onClick={onClose} text={"Cerrar"} width="auto" />
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
