import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import pdf from '../images/icon/pdf.png';
import doc from '../images/icon/doc.png';
import docx from '../images/icon/docx.png';
import document from '../images/icon/document.png';
import img from '../images/icon/img.jpg';
interface Props {
  title: string;
  date: string;
  icon: string;
  extension: string;
  file: any;
  type: number;
}

const DocumentCard = ({ title, icon, date, file, extension, type }: Props) => {
  return (
    <div className="rounded-sm border-4 border-[#00A651] bg-white  p-7.5  shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="">
        <img
          className=" m-auto  h-[80px] object-contain object-top"
          src={
            extension === 'pdf'
              ? pdf
              : extension === 'doc'
              ? doc
              : extension === 'docx'
              ? docx
              : extension === 'png'
              ? img
              : extension === 'jpg'
              ? img
              : extension === 'jpeg'
              ? img
              : document
          }
        />
      </div>
      <h1 className="mt-3 text-[25px] font-medium text-[#000000] dark:text-white">
        {title}
      </h1>
      <h4
        className={`my-0 text-[13px] ${
          type === 1 ? 'text-[#00A651]' : 'text-[#252525]'
        }  `}
      >
        {type === 1 ? 'Paid' : 'Unpaid'}
      </h4>
      <div className="flex justify-center">
        <h2 className="my-3 text-[13px] text-[#252525]">{date}</h2>
      </div>
      {/* 
      <div className='flex justify-between mt-6'>
      <button className="mt-4 rounded-lg flex justify-center items-center bg-[#00A651] px-5 py-2 text-[17px] font-medium text-white">
          <FiEdit className="mr-2" />
          Edit
        </button>

        <button className="mt-4 rounded-lg bg-[#BE0404] flex justify-center items-center px-5 py-2 text-[17px] font-medium text-white">
          <RiDeleteBin5Line className="mr-2" />
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default DocumentCard;
