import Layout from '../components/Layout'
import ProductGrid from '../components/ProductGrid'

import { getProducts } from '../lib/moltin'

const Home = ({ products }) => (
  <Layout title='Home'>
    <ProductGrid products={products} />
  </Layout>
)

Home.getInitialProps = async () => {
  const { json: { data, included: { main_images } } } = await getProducts(['main_image'])

  const products = data.map(product => {
    const imageId = product.relationships.main_image
      ? product.relationships.main_image.data.id
      : false

    return {
      ...product,
      image: imageId
        ? main_images.find(img => img.id === imageId).link.href
        : '/static/moltin-light-hex.svg'
    }
  })

  return { products }
}

export default Home
