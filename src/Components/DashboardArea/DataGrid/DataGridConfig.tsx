import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { MouseEventHandler } from "react";
import CouponModel from "../../../Models/CouponModel";

/*
  Functionality that is presented in this helper: 
  - Definitions for MUI DataGrid
*/
export const couponFields = (
  setOpenModal: (x: boolean) => void,
  setCoupon: (c: CouponModel) => void,
  handleDelete: (t: GridRowId) => MouseEventHandler<HTMLButtonElement>
): GridColDef[] => [
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
    width: 120,
  },
  { field: "valid", headerName: "Valid", width: 60 },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    cellClassName: "actions",
    getActions: (gridRowObj: GridRowParams<CouponModel>) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
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
