"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { formatPrice } from "@/utils/formatPrice";
import firebaseApp from "@/libs/firebase";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <div data-tooltip-id="toggleStock">
              <ActionBtn
                icon={MdCached}
                onClick={() => {
                  handleToggleStock(params.row.id, params.row.inStock);
                }}
              />
            </div>
            <div data-tooltip-id="deleteProduct">
              <ActionBtn
                icon={MdDelete}
                onClick={() => {
                  handleDelete(params.row.id, params.row.images);
                }}
              />
            </div>
            <div data-tooltip-id="view_product">
              <ActionBtn
                icon={MdRemoveRedEye}
                onClick={() => {
                  router.push(`/product/${params.row.id}`);
                }}
              />
            </div>
            <ReactTooltip
              id="toggleStock"
              place="bottom"
              content="Toggle in stock"
            />
            <ReactTooltip
              id="deleteProduct"
              place="bottom"
              content="Remove product"
            />
            <ReactTooltip
              id="view_product"
              place="bottom"
              content="Go to item"
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((error) => {
        toast.error("oops! something went wrong");
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any) => {
    toast("Deleting product, please wait!");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
          }
        }
      } catch (error) {
        return error;
      }
    };
    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete the product");
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
