import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Classic Cuts Admin",
  description: "Classic Cuts Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
