"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";

import SellerNavItem from "./SellerNavItem";
import Container from "../Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";

interface SellerNavTypes {
  currentUser: SafeUser | null | undefined;
}

const SellerNav: React.FC<SellerNavTypes> = ({ currentUser }) => {
  const pathName = usePathname();
  const router = useRouter();
  if (!currentUser || currentUser?.role === 'USER') {
    router.replace("/");
  }
  return (
    <div className="w-full shadow-sm border-b-[1px] top-20 pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/seller">
            <SellerNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === "/seller"}
            />
          </Link>
          <Link href="/seller/add-products">
            <SellerNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathName === "/seller/add-products"}
            />
          </Link>
          <Link href="/seller/manage-products">
            <SellerNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === "/seller/manage-products"}
            />
          </Link>
          <Link href="/seller/manage-orders">
            <SellerNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === "/seller/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SellerNav;
