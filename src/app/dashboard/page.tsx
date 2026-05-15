import DashboardContainer from './container/DashboardContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default function DashboardPage() {
  return (
    <>
      <main className="">
        <Navbar />
        <DashboardContainer />
        <Footer />
      </main>
    </>
  );
}
