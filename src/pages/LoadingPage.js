const LoadingPage = () => {
  return (
    <div className='fixed w-full h-full bg-opacity-50 bg-black left-0 top-0 right-0 bottom-0 z-[99999]'>
      <div className="absolute left-1/2 top-1/2 -ml-10 -mt-10 border-8 border-[#ae2d33] w-20 h-20 rounded-full border-b-transparent animate-spin"></div>
    </div>
  );
}

export default LoadingPage;