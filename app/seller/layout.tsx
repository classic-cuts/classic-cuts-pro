import { getCurrentUser } from "@/actions/getCurrentUser";
import SellerNav from "../components/seller/SellerNav";

export const metadata = {
  title: "Seller | Classic Cuts",
  description: "Classic Cuts Seller Dashboard",
};

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <SellerNav currentUser={currentUser} />
      {children}
    </div>
  );
};

export default SellerLayout;
