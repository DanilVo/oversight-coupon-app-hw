import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";

const handleDelete = (id: GridRowId) => async () => {
  try {
    if (confirm("Are you sure?")) {
      await couponService.deleteCoupon(+id);
      notificationService.success("Coupon has been deleted!");
    }
  } catch (error) {
    notificationService.error("Could`t delete coupon, " + error);
  } 
};

export const couponFields: GridColDef[] = (
  setOpenModal: (x: boolean) => void,
  setCoupon: (c: CouponModel) => void
) => [
  {
    field: "description",
    headerName: "Description",
    width: 140,
    editable: true,
  },
  {
    field: "creationDate",
    headerName: "Creation Date",
    width: 120,
    editable: true,
  },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    width: 120,
    editable: true,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 120,
    editable: true,
  },
  {
    field: "discountType",
    headerName: "Discount Type",
    width: 120,
    editable: true,
  },
  {
    field: "usageLimit",
    headerName: "Usage Limit",
    width: 100,
    editable: true,
  },
  {
    field: "stackable",
    headerName: "Stackable",
    width: 80,
    editable: true,
  },

  {
    field: "uniqueCode",
    headerName: "Unique Code",
    width: 140,
    editable: true,
  },
  { field: "valid", headerName: "Valid", width: 60 },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    cellClassName: "actions",
    getActions: (gridRowObj) => [
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
 