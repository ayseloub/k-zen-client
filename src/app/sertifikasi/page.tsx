import Navbar from '@/shared/container/navbar/navbar';
import SertifikasiContainer from './container/SertifikasiContainer';
import Footer from '@/shared/container/footer/footer';

export default function SertifikasiPage() {
  return (
    <>
      <main className="">
        <Navbar />
        <SertifikasiContainer />
        <Footer />
      </main>
    </>
  );
}
