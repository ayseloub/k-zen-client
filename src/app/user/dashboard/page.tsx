import DashboardContainer from './container/DashboardContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default function DashboardPage() {
  return (
    <>
        <Navbar />
        <DashboardContainer />;
        <Footer />
    </>
    ); 
}