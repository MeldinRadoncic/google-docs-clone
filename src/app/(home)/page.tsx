import Documents from "@/app/documents/page";
import { Navbar } from "@/app/(home)/navbar";
import { TemplatesGallery } from "@/app/(home)/templates-gallery";

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='fixed top-0 left-0 right-0 h-16 z-10 bg-white p-4'>
        <Navbar />
      </div>

      <div className='mt-16'>
       <TemplatesGallery />
      </div>
    </main>
  );
};

export default Home;
