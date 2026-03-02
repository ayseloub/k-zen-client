
import WebinarContainer from './container/WebinarContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default function WebinarPage() {
  return (
    <>
      <main className="">
        <Navbar />
        <WebinarContainer />
        <Footer />
      </main>
    </>
  );
}
