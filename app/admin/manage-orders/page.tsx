import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

// import ManageOrdersClient from "./ManageOrdersClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersCLient";

const ManageOrders = async () => {
  const orders = await getOrders();
  if(!orders.length){
    return <NullData title="No orders yet"/>
  }
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
