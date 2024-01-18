import { useState, useEffect } from 'react';
import { ClassicSpinner } from 'react-spinners-kit';
import axios from '../../api/axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumb';
import AlbumCard from './albumCard';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';

// Define the type for your data
interface Data {
  coverId: number;
  albumId: number;
  coverTitle: string;
  imageName: string;
  created_at: string;
  coverImage: string;
  path: string;
}

const Albums = () => {
  const {
    state: { user },
  } = useAuth();

  const [data, setData] = useState<Data[]>([]);
  const [galleryIages, setGalleryIages] = useState<Data[]>([]);
  const [path, setPath] = useState<string>('');
  const [galleyPath, setGalleyPath] = useState<string>('');
  const [albumId, setAlbumId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const fetchImages = async (data: Data) => {
    try {
      const response = await axios.get(`/listOfGalleryImages`, {
        params: {
          id: `${user?.user_id}`,
          coverId: data?.coverId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);
      setGalleryIages(response.data.gallery);
      setGalleyPath(response.data.imagePath);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, data: Data) => {
    setAlbumId(data?.coverId);

    fetchImages(data);
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    data: Data
  ) => {
    try {
      const response = await axios.get(`/deleteImages`, {
        params: {
          id: `${user?.user_id}`,
          albumId: data?.albumId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      const responseNew = await axios.get(`/listOfGalleryImages`, {
        params: {
          id: `${user?.user_id}`,
          coverId: albumId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setGalleryIages(responseNew.data.gallery);
      setLoading(false);
      setGalleryIages(response.data.gallery);
      setGalleyPath(response.data.imagePath);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    fetchImages(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/listOfAlbums`, {
          params: {
            id: `${user?.user_id}`,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        setLoading(false);
        setData(response.data.Albums);
        setPath(response.data.imagePath);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const setSelectedImages = [...files];

      try {
        const formData = new FormData();

        setSelectedImages.forEach((image, index) => {
          formData.append(`imageName[${index}]`, image);
        });

        formData.append('id', `${user?.user_id}`);
        formData.append('coverId', `${albumId}`);
        const response = await axios.post(`/addMoreImages`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        const responseNew = await axios.get(`/listOfGalleryImages`, {
          params: {
            id: `${user?.user_id}`,
            coverId: albumId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        setLoading(false);
        setGalleryIages(responseNew.data.gallery);
        toast.success(response?.data?.message || 'Success');
      } catch {}
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery / Albums" />

      <div className="mx-3 bg-[#F4F4F4] dark:bg-[#292A33]">
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className=" grid grid-cols-12">
            {data &&
              data.map((data) => (
                <div
                  className=" col-span-2 m-5"
                  key={data?.coverId}
                  onClick={(event) => handleClick(event, data)}
                >
                  <AlbumCard
                    title={data?.coverTitle}
                    id={data?.coverId}
                    file={data?.coverImage}
                    path={path}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      {showModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
          <div className="h-[80%] w-[60%] overflow-auto rounded-lg border bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
            <div className=" mt-0 mb-2 ">
              <Button
                variant="text"
                component="label"
                className="uploadBtn"
                sx={{ textTransform: 'capitalize' }}
              >
                {/* <button className="rounded-lg bg-[#04BE5B] px-8 py-2  font-medium text-white"> */}
                Add More Images
                <input
                  hidden
                  className="form-control"
                  id="vehicleImages"
                  accept=".jpg,.jpeg,.png,"
                  multiple
                  onChange={handleImageChange}
                  type="file"
                />
                {/* </button> */}
              </Button>
            </div>
            <div className="  grid h-[80%] grid-cols-5">
              {galleryIages &&
                galleryIages.map((data) => (
                  <div className="m-2 mb-0 ">
                    <i
                      title="Delete"
                      className="fa-solid fa-trash cursor-pointer  text-red"
                      onClick={(event) => handleDelete(event, data)}
                    ></i>
                    <img
                      className="m-0 mb-0  h-[80px] object-contain object-top pb-0"
                      src={`${galleyPath}/${data?.imageName}`}
                      loading={'lazy'}
                    />
                  </div>
                ))}
            </div>
            <div className=" mt-0 mb-2   text-end">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-[#b9b9b9] px-8 py-2 font-medium text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </DefaultLayout>
  );
};

export default Albums;
