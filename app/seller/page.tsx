import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Seller = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="pt-8">
        <Container>
          <p>You are not authorized to access this page.</p>
        </Container>
      </div>
    );
  }

  const { sellerId } = currentUser;

  console.log("sellerId", sellerId);

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const graphData = await getGraphData();

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} sellerId={sellerId} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Seller;
