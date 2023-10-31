import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

import ManageProductsClient from "./ManageProductsClient";

import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "SELLER") {
    return <NullData title="Oops! Access Denied" />;
  }
  const { sellerId } = currentUser;

  const sellerProducts = products.filter(
    (product) => product.sellerId === sellerId
  );
  if (!sellerProducts.length) {
    return <NullData title="No products found" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={sellerProducts} />
      </Container>
    </div>
  );
};

export default ManageProducts;
