import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

class DataGridStructure {
//   existingCoupons: GridColDef[] = [
//     { field: 'description', headerName: 'Description', width: 140 },
//     { field: 'usageLimit', headerName: 'Usage Limit', width: 80 },
//     {
//       field: 'stackable',
//       headerName: 'Stackable',
//       width: 60,
//       renderCell: (params) => (params.row.stackable ? 'Yes' : 'No'),
//     },
//     {
//       field: 'expiryDate',
//       headerName: 'Expire Date',
//       width: 120,
//       renderCell: (params) => moment(params.row.expiryDate).format(),
//     },
//     { field: 'discountType', headerName: 'Discount Type', width: 120 },
//     {
//       field: 'creationDate',
//       headerName: 'Creation Date',
//       width: 120,
//       renderCell: (params) => moment(params.row.creationDate).format(),
//     },
//     { field: 'createdBy', headerName: 'Created By', width: 120 },
//     { field: 'uniqueCode', headerName: 'Unique Code', width: 120 },
//   ];

  addNewCoupon: GridColDef[] = [
    {
      field: 'description',
      headerName: 'Description',
      width: 140,
      editable: true,
    },
    {
      field: 'usageLimit',
      headerName: 'Usage Limit',
      width: 100,
      editable: true,
    },
    {
      field: 'stackable',
      headerName: 'Stackable',
      width: 80,
      editable: true,
    },
    {
      field: 'expiryDate',
      headerName: 'Expiry Date',
      width: 120,
      editable: true,
      //   renderCell: (params) =>
      //     moment(params.row.expiryDate).format('DD-MM-YYYY'),
    },
    {
      field: 'discountType',
      headerName: 'Discount Type',
      width: 120,
      editable: true,
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      width: 120,
      editable: true,
      //   renderCell: (params) =>
      //     moment(params.row.creationDate).format('DD-MM-YYYY'),
    },

    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 120,
      editable: true,
    },
    {
      field: 'uniqueCode',
      headerName: 'Unique Code',
      width: 140,
      editable: true,
    },
    { field: 'valid', headerName: 'Valid', width: 60 },
    
  ];
}

const dataGridStructure = new DataGridStructure();
export default dataGridStructure;
