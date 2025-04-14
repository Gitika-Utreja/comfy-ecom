import  Hero  from '../components/Hero';

import { customFetch } from '../utils';
const url = '/products?featured=true';
import FeatureProducts from '../components/FeatureProducts';

export const featuredProductQuery =  {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),

}
export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductQuery);
  console.log(response);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeatureProducts/>
    </>
  );
};
export default Landing;