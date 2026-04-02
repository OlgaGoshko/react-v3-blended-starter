import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const fetchPhotos = await getPhotos(query);
      if (fetchPhotos.length > 0) {
        setPhotos(fetchPhotos);
      } else {
        toast.error("There are no photos");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // const handlePhotoClick = (photo: Photo) => {
  //   setPhoto(photo);
  // };
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text>Спробуйте ще раз</Text>}
          {photos.length > 0 && (
            <PhotosGallery
              photos={photos}
              onSelect={(photo) => setPhoto(photo)}
            />
          )}
          <Toaster position="top-center" />
        </Container>
      </Section>
      {photo && (
        <Modal onClose={() => setPhoto(null)}>
          <div
            style={{
              backgroundColor: photo.avg_color,
              borderColor: photo.avg_color,
            }}
          >
            <img src={photo.src.large} alt={photo.alt} />
          </div>
        </Modal>
      )}
    </>
  );
}
