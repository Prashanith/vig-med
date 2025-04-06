import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema } from "./types/invoice";
import { Product } from "./types/product";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceViewer from "./components/InvoiceViewer";
import ProductTable from "./components/ProductTable";
import { useState } from "react";

const Invoice = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
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
      products: [
        {
          id: 1,
          name: "",
          hsn: "",
          batchNumber: "",
          expiry: "",
          mrp: 0,
          quantity: 1,
          freeQuantity: 0,
          rate: 0,
          amount: 0,
          discount: 0,
          cgst: 0,
          sgst: 0,
        },
      ],
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
  };

  return (
    <div className='w-full flex flex-col justify-center items-start space-y-6 pagePadding'>
      <h3 className='text-left justify-self-start text-3xl py-2 font-bold'>
        Invoice
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='flex flex-row justify-start items-start space-x-4'>
          <div className='flex flex-col justify-start items-start'>
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
              <h3>Product List</h3>
              <div className='flex justify-center'>
                <button
                  type='button'
                  onClick={() => {
                    // setCurrentIndex(fields.length + 1);
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
                  }}
                  className='bg-blue-500 text-white py-2 px-4 rounded-md'
                >
                  Add Product
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
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
              currentIndex != -1
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <h3 className='text-xl mb-3'>Product {currentIndex + 1}</h3>
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
        )}
        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded-md mt-6'
          >
            Generate Invoice
          </button>
        </div>
      </form>
      {getValues() != null && getValues().products.length > 0 && (
        <PDFViewer className='w-full h-screen'>
          <InvoiceViewer invoice={getValues()} />
        </PDFViewer>
      )}
    </div>
  );
};

export default Invoice;
