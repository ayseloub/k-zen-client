
import ArtikelContainer from './container/ArtikelContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default function ArtikelPage() {
  return (
    <>
      <main className="">
        <Navbar />
        <ArtikelContainer />
        <Footer />
      </main>
    </>
  );
}
