import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

interface Column {
    id: 'Name' | 'District' | 'Occupied' | 'Address' | 'status' | 'AssignedTo' | 'action';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: string) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    {
      id: 'District',
      label: 'District',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'Occupied',
      label: 'Occupied',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'Address',
      label: 'Address',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'status',
      label: 'status',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'AssignedTo',
      label: 'Assigned To',
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


const PhasesCenters = () => {
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Phase Management / Phase Centers" />
        <div className="block p-6 ">
      <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
        <form>
        <div className="grid grid-cols-1 mb-2 gap-4"> 
        <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2" htmlFor="programName">
                Phase Center Name
              </label>
              <input
                type="text"
                name="name"
                id="programName"
                placeholder="Phase Center Name"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Province
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
              >
                <option value=""> -- Please Select --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                District
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
              >
                <option value=""> -- Please Select --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2" htmlFor="programName">
                Address
              </label>
              <input
                type="text"
                name="name"
                id="programName"
                placeholder="Address"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Controller
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
              >
                <option value=""> -- Please Select --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Short Code
              </label>
              <input
                type="text"
                name="name"
                id="programName"
                required
                placeholder="Enter Short Code"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Status:
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
              >
                <option value=""> -- Please Select --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
          <div className=" mt-7 text-center">
            <button
              type="submit"
              className="rounded-lg bg-[orange] px-8 py-2 font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: '#000000', color: '#ffffff', textTransform: 'capitalize' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell  key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
                {/* {inspectionOrders &&
                          inspectionOrders
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((order, index) => ( */}
                <TableRow className="bg-light" key={1}>
                  <TableCell>Program 1</TableCell>
                  <TableCell>punjab</TableCell>
                  <TableCell>0000</TableCell>
                  <TableCell>punjab</TableCell>

                  <TableCell>Active</TableCell>
                  <TableCell>Ali Ahmed</TableCell>
                  <TableCell>
                    <Button
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      variant='contained'
                      sx={{ backgroundColor: 'orange', color: '#ffffff', fontWeight: 600, textTransform: 'capitalize', fontSize: '17px'  }}
                      
                    >
                     Action
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}>View</MenuItem>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            // count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <ToastContainer />
    </div>
    </DefaultLayout>
  );
};

export default PhasesCenters;
