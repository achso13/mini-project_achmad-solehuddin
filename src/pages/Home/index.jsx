import { Helmet } from 'react-helmet-async';
import { CONST } from '../../common/constants';
import Banner from '../../components/Banner';
import OtherNews from '../../components/OtherNews';
import MainLayout from '../../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title}</title>
      </Helmet>
      <Banner />
      <OtherNews />
    </MainLayout>
  );
}
