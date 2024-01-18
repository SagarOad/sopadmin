import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

const AddNewBlog = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [instructionHtml, setInstructionHtml] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInstructionChange = (html: React.SetStateAction<string>) => {
    setInstructionHtml(html);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const CreatExam = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/SaveBlog`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          navigate('/blog/bloglist');
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };
  
    if (formRef.current) {
      try {
        await CreatExam();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs / Add New Blog" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-center text-4xl text-black-2">New Blog</h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="blogTitle">
                  Title
                </label>
                <input
                  type="text"
                  name="blogTitle"
                  id="blogTitle"
                  placeholder="Enter Blog Title"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="blogImage">
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="blogImage"
                  id="blogImage"
                  placeholder=" Marks"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Status
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="status"
                  id=""
                >
                  <option value=""> -- Please Select Status --</option>

                  <option value="1">Publish</option>
                  <option value="2">Save</option>
                </select>
              </div>
            </div>

            <h4 className=" my-5 text-3xl font-medium text-black-2">Content</h4>
            <div>
              <input
                hidden
                type="text"
                name="content"
                id="content"
                placeholder=" Blog Content"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                value={instructionHtml}
              />
              <ReactQuill
                onChange={handleInstructionChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['code-block'],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['image'],
                  ],
                }}
                formats={[
                  'header',
                  'list',
                  'bold',
                  'italic',
                  'underline',
                  'link',
                  'color',
                  'background',
                  'align',
                  'code-block',
                  'size',
                  'image',
                ]}
              />
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

export default AddNewBlog;
