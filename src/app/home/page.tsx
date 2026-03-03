
import HomeContainer from './container/HomeContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default function HomePage() {
  return (
    <>
      <main className="">
        <Navbar />
        <HomeContainer />
        <Footer />
      </main>
    </>
  );
}
