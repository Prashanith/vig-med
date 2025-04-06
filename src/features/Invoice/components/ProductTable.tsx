import React from "react";
import { Product } from "../types/product";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface ProductTableProps {
  products: Product[];
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <table className='w-full bg-white text-sm text-gray-700 border-none'>
      <thead className='bg-primary text-secondary-text sticky top-0 z-10'>
        <tr>
          {[
            "ID",
            "Name",
            "HSN",
            "BATCH",
            "EXP",
            "MRP",
            "QTY",
            "Free QTY",
            "Rate",
            "AMT",
            "DISC (%)",
            "CGST (%)",
            "SGST (%)",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              className='border px-4 py-3 font-semibold text-center uppercase'
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr
            key={product.id}
            className={`text-center ${
              index % 2 === 0 ? "bg-[#ececec]" : "bg-white"
            } hover:bg-gray-100 transition duration-300`}
          >
            <td className='border border-gray-300 px-4 py-3'>{product.id}</td>
            <td className='border border-gray-300 px-4 py-3'>{product.name}</td>
            <td className='border border-gray-300 px-4 py-3'>{product.hsn}</td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.batchNumber}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.expiry}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.mrp.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.quantity}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.freeQuantity}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.rate.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.amount.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.discount.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.cgst.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              {product.sgst.toFixed(2)}
            </td>
            <td className='border border-gray-300 px-4 py-3'>
              <FaDeleteLeft onClick={() => onDelete(index)} />
              <FaEdit onClick={() => onEdit(index)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
