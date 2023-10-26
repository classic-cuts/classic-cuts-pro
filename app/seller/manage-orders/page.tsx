import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

// import ManageOrdersClient from "./ManageOrdersClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersCLient";
import getProducts from "@/actions/getProducts";

const ManageOrders = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "SELLER") {
    return <NullData title="Oops! Access Denied" />;
  }
  const { sellerId } = currentUser;
  const sellerProducts = products.filter(
    (product) => product.sellerId === sellerId
  );
  const orders = await getOrders();
  const sellerOrders = orders.filter((order) =>
    sellerProducts.some((product) => product.id === order.products[0].id)
  );

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={sellerOrders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
