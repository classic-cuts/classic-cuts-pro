"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";

import AdminNavItem from "./AdminNavItem";
import Container from "../Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";

interface AdminNavTypes {
  currentUser: SafeUser | null | undefined;
}

const AdminNav: React.FC<AdminNavTypes> = ({ currentUser }) => {
  const pathName = usePathname();
  const router = useRouter();
  if (!currentUser || currentUser?.role !== "ADMIN") {
    router.replace("/");
  }
  return (
    <div className="w-full shadow-sm border-b-[1px] top-20 pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === "/admin"}
            />
          </Link>
          {/* <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === "/admin/manage-products"}
            />
          </Link> */}
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
