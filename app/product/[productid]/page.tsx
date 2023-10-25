import Container from "@/app/components/Container";

import getProductById from "@/actions/getProductById";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AddRating from "./AddRating";
import { useEffect } from "react";

interface IParams {
  productid?: string;
}

const Product = async ({ params }: { params: IParams }) => {

  const product = await getProductById(params);
  const currentUser = await getCurrentUser();
  if (!product) {
    return (
      <NullData title="Oops! The product you are looking for does not exist" />
    );
  }
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} currentUser={currentUser} />

        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={currentUser} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
