import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema } from "./types/invoice";
import { Product } from "./types/product";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceViewer from "./components/InvoiceViewer";
import ProductTable from "./components/ProductTable";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaFileInvoice, FaPlus } from "react-icons/fa6";

const Invoice = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [previewInvoice, setPreviewInvoice] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: "",
      email: "",
      totalAmount: 0,
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: { products: Product[] }) => {
    const { products } = data;
    let totalBill = 0;
    products.forEach((product: Product) => {
      const { mrp, quantity, discount, cgst, sgst } = product;

      // Step 1: Apply discount
      const discountedPrice = mrp * quantity * (1 - discount / 100);

      // Step 2: Apply CGST and SGST
      const totalGST = cgst + sgst; // Total GST percentage
      const taxAmount = (discountedPrice * totalGST) / 100;

      // Step 3: Final amount calculation
      const amount = discountedPrice + taxAmount;
      product.amount = parseFloat(amount.toFixed(2)); // Round to 2 decimal places
      totalBill += amount;
    });
    setValue("products", products);
    setValue("totalAmount", totalBill);
    setPreviewInvoice((prev) => true);
  };

  return (
    <div className='w-full flex flex-col justify-center items-start space-y-6 pagePadding'>
      <h3 className='text-left justify-self-start text-3xl py-2 font-bold'>
        Invoice
      </h3>
      <div className='w-full border-b-teal-700 border-[1px]'></div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='flex flex-row justify-start items-start space-x-6'>
          <div className='flex flex-col justify-start items-start space-y-6'>
            <div className='w-full flex justify-between items-center'>
              <h3 className='font-bold text-xl'>Invoice Information</h3>
            </div>
            {/* Name Field */}
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-lg'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register("name")}
                className='inputField'
              />
              {errors.name && (
                <span className='text-red-500 mt-2'>{errors.name.message}</span>
              )}
            </div>

            {/* Email Field */}
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-lg'>
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register("email")}
                className='inputField'
              />
              {errors.email && (
                <span className='text-red-500 mt-2'>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col justify-start items-start space-y-4'>
            <div className='w-full flex justify-between items-center'>
              <h3 className='font-bold text-xl'>Product List</h3>
              <div className='flex flex-row justify-center items-center space-x-3'>
                {getValues() != null && getValues().products.length > 0 && (
                  <div className='flex justify-center'>
                    <button
                      type='submit'
                      className='bg-secondary text-primary-text py-2 px-4 rounded-md  flex justify-center items-center space-x-2'
                    >
                      <FaFileInvoice />
                      <span>Generate Invoice</span>
                    </button>
                  </div>
                )}
                <button
                  type='button'
                  onClick={() => {
                    append({
                      id: fields.length + 1,
                      name: "",
                      hsn: "",
                      batchNumber: "",
                      expiry: "",
                      mrp: 0,
                      quantity: 0,
                      freeQuantity: 0,
                      rate: 0,
                      amount: 0,
                      discount: 0,
                      cgst: 0,
                      sgst: 0,
                    });
                    setCurrentIndex(fields.length);
                  }}
                  className='bg-primary text-white py-2 px-4 rounded-md flex justify-center items-center space-x-2'
                >
                  <FaPlus /> <span>Add Product</span>
                </button>
              </div>
            </div>
            <ProductTable
              products={getValues().products}
              onDelete={(idx) => remove(idx)}
              onEdit={(idx) => setCurrentIndex(idx)}
            />
          </div>
        </div>

        {currentIndex != -1 && (
          <div
            className={`flex justify-center items-center fixed z-20 top-0 left-0 w-full h-screen border border-gray-300 rounded-lg shadow-lg p-4 transition-transform duration-300 `}
          >
            <div className='w-[550px] rounded-lg bg-white shadow-2xl p-6'>
              <div className='w-full flex justify-between items-start'>
                <h3 className='text-md mb-8 font-bold'>
                  Add/Modify Product {currentIndex + 1}{" "}
                  <span className='text-sm text-gray-700 font-light italic'>
                    (Information is autosaved)
                  </span>
                </h3>
                <FaTimes
                  className='cursor-pointer'
                  onClick={() => setCurrentIndex(-1)}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    {...register(`products.${currentIndex}.name`)}
                    placeholder='Name'
                    className='inputField'
                  />
                  {errors.products?.[currentIndex]?.name && (
                    <span className='text-red-500 mt-2'>
                      {errors.products[currentIndex].name?.message}
                    </span>
                  )}
                </div>

                <div className='flex flex-col'>
                  <label>HSN</label>
                  <input
                    type='text'
                    {...register(`products.${currentIndex}.hsn`)}
                    placeholder='HSN'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>Batch Number</label>
                  <input
                    type='text'
                    {...register(`products.${currentIndex}.batchNumber`)}
                    placeholder='Batch Number'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>Expiry Date</label>
                  <input
                    type='text'
                    {...register(`products.${currentIndex}.expiry`)}
                    placeholder='Expiry'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>MRP</label>
                  <input
                    type='number'
                    {...register(`products.${currentIndex}.mrp`, {
                      valueAsNumber: true,
                    })}
                    placeholder='MRP'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>Quantity</label>
                  <input
                    type='text'
                    {...register(`products.${currentIndex}.quantity`)}
                    placeholder='Quantity'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>Free Quantity</label>
                  <input
                    type='number'
                    {...register(`products.${currentIndex}.freeQuantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder='Free Quantity'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>Discount</label>
                  <input
                    type='number'
                    {...register(`products.${currentIndex}.discount`, {
                      valueAsNumber: true,
                    })}
                    placeholder='Discount'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>CGST</label>
                  <input
                    type='number'
                    {...register(`products.${currentIndex}.cgst`, {
                      valueAsNumber: true,
                    })}
                    placeholder='CGST'
                    className='inputField'
                  />
                </div>
                <div className='flex flex-col'>
                  <label>SGST</label>
                  <input
                    type='number'
                    {...register(`products.${currentIndex}.sgst`, {
                      valueAsNumber: true,
                    })}
                    placeholder='SGST'
                    className='inputField'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
      {getValues() != null &&
        getValues().products.length > 0 &&
        previewInvoice && (
          <PDFViewer className='w-full h-screen'>
            <InvoiceViewer invoice={getValues()} />
          </PDFViewer>
        )}
    </div>
  );
};

export default Invoice;
