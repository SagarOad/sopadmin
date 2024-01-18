import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Column {
  id: 'SNo' | 'title' | 'status' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'title',
    label: 'Blog Title',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'status',
    label: 'Status',
    minWidth: 220,
    align: 'left',
  },
  {
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const BlogsList = () => {
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
  const [selectedProgram, setSelectedProgram] = useState<string | number>();
  const [selectedBatch, setSelectedBatch] = useState<string | number>();
  const [loading, setLoading] = useState(true);

  const [blogList, setBlogList] = useState<Blogs>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [blogId, setBlogId] = React.useState<number | null>(null);
  const [blogTitle, setBlogTitle] = React.useState('');
  const [path, setPath] = React.useState('');
  const [blogImage, setBlogImage] = React.useState('-');
  const [blogStatus, setBlogStatus] = React.useState<string | number>('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleInstructionChange = (html: React.SetStateAction<string>) => {
    setInstructionHtml(html);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, blogs: Blogs) => {
    setAnchorEl(event.currentTarget);
    setBlogId(blogs?.blogId);
    setInstructionHtml(blogs?.content);
    setBlogTitle(blogs?.blogTitle);
    setBlogImage(blogs?.blogImage);
    setBlogStatus(blogs?.status);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShowModal(true);
    setAnchorEl(null);
  };
  const handleView = () => {
    setShowDetailModal(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (blogId) {
        const response = await axios.get(`/ActiveOrDeactiveBlog`, {
          params: {
            id: `${user?.user_id}`,
            blogId: `${blogId}`,
            status: 3,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchExamList();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };
  const handleActive = async () => {
    try {
      if (blogId) {
        const response = await axios.get(`/ActiveOrDeactiveBlog`, {
          params: {
            id: `${user?.user_id}`,
            blogId: `${blogId}`,
            status: 1,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchExamList();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };
  const handleDeactive = async () => {
    try {
      if (blogId) {
        const response = await axios.get(`/ActiveOrDeactiveBlog`, {
          params: {
            id: `${user?.user_id}`,
            blogId: `${blogId}`,
            status: 2,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchExamList();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const fetchExamList = async () => {
    try {
      const response = await axios.get(`/blogList`, {
        params: {
          id: user?.user_id,
          programId: selectedProgram,
          batchId: selectedBatch,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setBlogList(response?.data?.blogList);
      setPath(response?.data?.path);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchExamList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();

      const UpdateBlog = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          // formData.append('exam_instructions', `${instructionHtml}`);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/updateBlog`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');

          fetchExamList();
          setBlogId(null);
          setSelectedProgram('');
          setSelectedBatch('');
          setInstructionHtml('');
          setShowModal(false);
        }
      };

      if (formRef.current) {
        try {
          UpdateBlog();
        } catch (e) {
          console.error(e);
        }
      }
    },
    []
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs / Blogs List" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          {loading ? (
            <div className=" flex h-full w-full items-center justify-center bg-white">
              <ClassicSpinner color="#04BE5B" />
            </div>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            textTransform: 'capitalize',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogList &&
                      blogList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((blogs: Blogs, index: number) => (
                          <TableRow className="bg-light" key={blogs?.blogId}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{blogs?.blogTitle}</TableCell>
                            <TableCell>
                              {blogs?.status === 1
                                ? 'Active'
                                : blogs?.status === 2
                                ? 'Inactive'
                                : null}
                            </TableCell>

                            <TableCell>
                              <div className=' flex justify-center'>
                              <MenuItem onClick={handleDelete}>
                                <DeleteIcon />
                              </MenuItem>
                                <MenuItem onClick={handleView}>
                                  <RemoveRedEyeIcon />
                                </MenuItem>
                                <MenuItem onClick={handleEdit}>
                                  <EditIcon />
                                </MenuItem>
                                {blogStatus === 1 ? (
                                  <MenuItem onClick={handleDeactive}>
                                    Deactive
                                  </MenuItem>
                                ) : blogStatus === 2 ? (
                                  <MenuItem onClick={handleActive}>
                                    Active
                                  </MenuItem>
                                ) : null}
                              </div>
                             
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={blogList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>
        {showModal ? (
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="h-[70%] w-[60%] overflow-auto rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
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
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="blogImage">
                      Blog Image
                    </label>
                    <div className="mt-1 flex outline-none dark:bg-boxdark">
                      <input
                        type="file"
                        accept="image/*"
                        name="blogImage"
                        id="blogImage"
                        placeholder=" Marks"
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      />
                      <img src={`${path}${blogImage}`} width={150} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Status
                    </label>
                    <select
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name="status"
                      id=""
                      value={blogStatus}
                      onChange={(e) => setBlogStatus(e.target.value)}
                    >
                      <option value=""> -- Please Select Status --</option>

                      <option value={1}>Publish</option>
                      <option value={2}>Save</option>
                    </select>
                  </div>
                </div>
                <input hidden name="blogId" id="blogId" value={`${blogId}`} />
                <h4 className=" my-5 text-3xl font-medium text-black-2">
                  Content
                </h4>
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
                    defaultValue={instructionHtml}
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
                  <button
                    ref={btnRef}
                    type="submit"
                    className="mx-2  rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mx-2  rounded-lg bg-[#c2c2c2] px-8 py-2 font-medium text-white"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
        {showDetailModal ? (
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="h-[80%] w-[60%] overflow-auto rounded-lg border bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
              <div className=" mt-0 mb-2 text-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-lg bg-[#b9b9b9] px-8 py-2 font-medium text-white"
                >
                  Close
                </button>
              </div>
              <div className=" p-0">
                <img src={`${path}${blogImage}`} width={150} />
                <div className="grid grid-cols-1 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className=" " htmlFor="programName">
                      Blog Title
                    </label>
                    <p className="text-black-2">{blogTitle}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <h4 className=" my-5 text-3xl font-medium">Blog Content</h4>

                    <p className="text-black-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: instructionHtml,
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showDeleteModal ? (
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="w-[30%] rounded-lg bg-white text-center text-lg text-black-2 md:mb-6 md:p-7">
              <h3>Are you sure you want to delete it?</h3>
              <h5>This action cannot be undone.</h5>
              <div className=" mt-7 text-center">
                <button
                  onClick={onDelete}
                  type="submit"
                  className="mx-1 rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
                >
                  Yes, Delete it
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="submit"
                  className="mx-4 rounded-lg bg-[#b1b0b0] px-8 py-2 font-medium text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default BlogsList;
