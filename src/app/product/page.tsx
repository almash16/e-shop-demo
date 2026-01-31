import { ProductInfo } from "core/components/product-info/product-info";
import { FakeAPIProduct } from "core/types/product";

interface PageProps {
  searchParams: { id: string };
}

export default async function Page(props: PageProps) {
  const {
    searchParams: { id },
  } = props;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: FakeAPIProduct = await data.json();

  return <ProductInfo product={product} />;
}
