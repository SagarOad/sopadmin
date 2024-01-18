import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const AddNewAlbum = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitting(true);
  
    if (formRef.current) {
      const params = {
        data: new FormData(formRef.current),
      };
  
      if (selectedImages.length > 0) {
        selectedImages.forEach((image, index) => {
          params.data.append(`imageName[${index}]`, image);
        });
      }
  
      params.data.append('id', `${user?.user_id}`);
  
      try {
        const response = await axios.post(`/createAlbum`, params?.data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
          },
        });
  
        toast.success(response?.data?.message || 'Success');
        navigate('/gallery/albums');
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  
  // If you want to keep the dependency array, you can add dependencies as needed:
  // const onSubmit = React.useCallback(async (e: { preventDefault: () => void }) => {...}, [/* dependencies */]);
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery / Add New Album" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-center text-4xl text-black-2">New Album</h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="coverTitle">
                  Title
                </label>
                <input
                  required
                  type="text"
                  name="coverTitle"
                  id="coverTitle"
                  placeholder="Enter Album Title"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setAlbumTitle(e.target.value)}
                />
              </div>

              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="imageName">
                  Album Images
                </label>
                <input
                  required
                  type="file"
                  multiple
                  accept="image/*"
                  name="imageName[]"
                  id="imageName"
                  placeholder=" Marks"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="selected-images">
              <div className="grid grid-cols-5 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                    />
                    {/* <button onClick={() => handleRemoveImage(index)}>
                      Remove
                    </button> */}
                  </div>
                ))}
              </div>
            </div>

            <div className=" mt-7 text-center">
            {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
              Submitting...
            </button> :

              <button
              ref={btnRef}
              type="submit"
              className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>
              }
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default AddNewAlbum;
