import { useState } from "react";

import { useConfirm } from "../../../providers/ConfirmContext";
import { useFavImages } from "../../../providers/FavoriteImagesContext";
import { useLanguage } from "../../../providers/LanguageContext";

import { MdDelete } from "react-icons/md";
import { SiCodereview } from "react-icons/si";

import SelectedImagesInfos from "./SelectedImagesInfos";

const FavoriteImage = ({ id, image, prompts }) => {

  const { t } = useLanguage();
  const { confirm } = useConfirm();
  const { removeFavImage } = useFavImages();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Removing the image unmounts this card, which also closes the detail view.
  const handleDelete = () => {
    confirm({ content: t("deleteImageConfirm"), onConfirm: () => removeFavImage(id) });
  };

  return (
    <>
      <div className="image-box">
        <img src={image} alt="" />

        <button onClick={() => setIsDetailOpen(true)} className="review-btn"><SiCodereview /></button>
        <button onClick={handleDelete} className="delete-image-btn"><MdDelete /></button>
      </div>

      {isDetailOpen &&
        <SelectedImagesInfos
          image={image}
          prompts={prompts}
          onDelete={handleDelete}
          onClose={() => setIsDetailOpen(false)}
        />}
    </>
  )
}

export default FavoriteImage
