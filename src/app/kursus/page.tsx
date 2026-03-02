import Navbar from '@/shared/container/navbar/navbar';
import KursusContainer from './container/KursusContainer';
import Footer from '@/shared/container/footer/footer';

export default function KursusPage() {
  return (
    <>
      <main className="">
        <Navbar />
        <KursusContainer />
        <Footer />
      </main>
    </>
  );
}
