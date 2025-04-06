import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema } from "./types/invoice";
import { Product } from "./types/product";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceViewer from "./components/InvoiceViewer";

const Invoice = () => {
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
    <div className='w-full flex flex-col justify-center items-center'>
      <PDFViewer className='w-full h-screen'>
        <InvoiceViewer bill={getValues()} />
      </PDFViewer>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
            <span className='text-red-500 mt-2'>{errors.email.message}</span>
          )}
        </div>

        {/* Product Fields */}
        <h2 className='text-2xl font-semibold mb-4'>Products</h2>
        <div className='space-y-4'>
          {fields.map((item, index) => (
            <div key={item.id} className='border p-4 rounded-md bg-gray-50'>
              <h3 className='text-xl mb-3'>Product {index + 1}</h3>

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    {...register(`products.${index}.name`)}
                    placeholder='Name'
                    className='inputField'
                  />
                  {errors.products?.[index]?.name && (
                    <span className='text-red-500 mt-2'>
                      {errors.products[index].name?.message}
                    </span>
                  )}
                </div>

                <div className='flex flex-col'>
                  <label>HSN</label>
                  <input
                    type='text'
                    {...register(`products.${index}.hsn`)}
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
                    {...register(`products.${index}.batchNumber`)}
                    placeholder='Batch Number'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>Expiry Date</label>
                  <input
                    type='text'
                    {...register(`products.${index}.expiry`)}
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
                    {...register(`products.${index}.mrp`, {
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
                    {...register(`products.${index}.quantity`)}
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
                    {...register(`products.${index}.freeQuantity`, {
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
                    {...register(`products.${index}.discount`, {
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
                    {...register(`products.${index}.cgst`, {
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
                    {...register(`products.${index}.sgst`, {
                      valueAsNumber: true,
                    })}
                    placeholder='SGST'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='flex justify-end mt-4'>
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='bg-red-500 text-white py-2 px-4 rounded-md'
                >
                  Remove Product
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center'>
          <button
            type='button'
            onClick={() =>
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
              })
            }
            className='bg-blue-500 text-white py-2 px-4 rounded-md'
          >
            Add Product
          </button>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded-md mt-6'
          >
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invoice;
