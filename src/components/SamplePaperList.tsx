
import { AiFillFolder } from 'react-icons/ai';


const SamplePaperList = () => {
  return (
    <div className='pt-8'>
        <div className='bg-[#F3F3F3] dark:bg-boxdark py-6 flex text-[20px] px-6 text-black font-medium justify-between'>
          <h1 className='dark:text-white text-[12px] md:text-[20px]'>Name</h1>
          <h1 className='dark:text-white text-[12px] md:text-[20px]'>Last Modified</h1>
          <h1 className='dark:text-white text-[12px] md:text-[20px]'>File Size</h1>
        </div>

        <div className=''>
            <div className='flex mb-1 bg-[#F3F3F3] dark:bg-boxdark border dark:border-strokedark text-[18px] px-6 py-6 text-black font-medium justify-between'>
           <div className='flex items-center'>
            <AiFillFolder className="mr-3 text-[22px] md:text-[32px] dark:text-white" />
            <h1 className='text-center text-[12px] md:text-[20px] dark:text-white'>My Projects</h1>
           </div>
           <div>
           <h1 className='mr-[82px] text-[12px] md:text-[20px] dark:text-white'>march,26,2019</h1>
           </div>
           <div>
           <h1 className='dark:text-white text-[12px] md:text-[20px]'>--</h1>
           </div>
           </div>

           <div className='flex mb-1 bg-[#F3F3F3] dark:bg-boxdark border dark:border-strokedark text-[18px] px-6 py-6 text-black font-medium justify-between'>
           <div className='flex items-center'>
            <AiFillFolder className="mr-3 text-[22px] md:text-[32px] dark:text-white" />
            <h1 className='text-center text-[12px] md:text-[20px] dark:text-white'>My Projects</h1>
           </div>
           <div>
           <h1 className='mr-[82px] text-[12px] md:text-[20px] dark:text-white'>march,26,2019</h1>
           </div>
           <div>
           <h1 className='dark:text-white text-[12px] md:text-[20px]'>67kb</h1>
           </div>
           </div>
        </div>
    </div>
  )
}

export default SamplePaperList