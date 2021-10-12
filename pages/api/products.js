import ProductRepository from '~/repositories/ProductRepository';

export default async function handler(req, res) {
  let resp;
  try {
    resp = await ProductRepository.getProducts({ limit: 10 });
    res.status(200).json(resp);
  } catch (error) {
    console.log('🚀 ~ handler ~ error', error);
  }
}
