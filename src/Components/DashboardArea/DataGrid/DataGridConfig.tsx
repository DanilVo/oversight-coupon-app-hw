import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { MouseEventHandler } from "react";
import CouponModel from "../../../Models/CouponModel";

/*
  Functionality that is presented in this helper: 
  - Definitions for MUI DataGrid
*/
export const couponFields: GridColDef[] = (
  setOpenModal: (x: boolean) => void,
  setCoupon: (c: CouponModel) => void,
  handleDelete: (t: number) => MouseEventHandler<HTMLButtonElement>
) => [
  {
    field: "description",
    headerName: "Description",
    width: 140,
  },
  {
    field: "creationDate",
    headerName: "Creation Date",
    width: 120,
  },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    width: 120,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 120,
  },
  {
    field: "discountType",
    headerName: "Discount Type",
    width: 120,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 80,
  },
  {
    field: "usageLimit",
    headerName: "Usage Limit",
    width: 100,
  },
  {
    field: "stackable",
    headerName: "Stackable",
    width: 80,
  },

  {
    field: "uniqueCode",
    headerName: "Unique Code",
    width: 140,
  },
  { field: "valid", headerName: "Valid", width: 60 },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    cellClassName: "actions",
    getActions: (gridRowObj: { row: CouponModel; id: number }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={() => {
          setOpenModal(true);
          setCoupon(gridRowObj.row);
        }}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDelete(gridRowObj.id)}
        color="inherit"
      />,
    ],
  },
];
