import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the Product Schema using Zod
const ProductSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(2),
  hsn: z.string().min(2),
  batchNumber: z.string().min(2),
  expiry: z.string().min(2),
  mrp: z.number().min(0),
  quantity: z.string().min(1),
  freeQuantity: z.number().default(0),
  rate: z.number().default(0),
  amount: z.number().default(0),
  discount: z.number().default(0),
  cgst: z.number().default(0),
  sgst: z.number().default(0),
});

// Bill Generation Form Schema
const BillGenerationFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  products: z.array(ProductSchema),
});

const BillGenerationForm = () => {
  // Initialize the form with React Hook Form and Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BillGenerationFormSchema),
    defaultValues: {
      products: [
        {
          id: 1,
          name: '',
          hsn: '',
          batchNumber: '',
          expiry: '',
          mrp: 0,
          quantity: '',
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
    name: 'products',
  });

  // Handle form submission
  const onSubmit = (data) => {
    const { products } = data;

    // Calculate total amount
    let totalBill = 0;

    products.forEach((product) => {
      const rate = product.rate;
      const quantity = parseFloat(product.quantity) || 0;
      const discount = product.discount || 0;
      const cgst = product.cgst || 0;
      const sgst = product.sgst || 0;

      const discountedPrice = rate * quantity * (1 - discount / 100);
      const taxAmount = (discountedPrice * (cgst + sgst)) / 100;
      const amount = discountedPrice + taxAmount;

      // Update product amount
      product.amount = amount;

      totalBill += amount;
    });

    console.log('Final Total Bill: ', totalBill);
    console.log('Form Data: ', data);
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md'>
      <h1 className='text-3xl font-semibold text-center mb-6'>Bill Generation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Name Field */}
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-lg'>Name</label>
          <input
            type='text'
            id='name'
            {...register('name')}
            className='inputField'
          />
          {errors.name && <span className='text-red-500 mt-2'>{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-lg'>Email</label>
          <input
            type='email'
            id='email'
            {...register('email')}
            className='inputField'
          />
          {errors.email && <span className='text-red-500 mt-2'>{errors.email.message}</span>}
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
                  {errors.products?.[index]?.name && <span className='text-red-500 mt-2'>{errors.products[index].name?.message}</span>}
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
                    {...register(`products.${index}.mrp`, { valueAsNumber: true })}
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
                    {...register(`products.${index}.freeQuantity`, { valueAsNumber: true })}
                    placeholder='Free Quantity'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>Rate</label>
                  <input
                    type='number'
                    {...register(`products.${index}.rate`, { valueAsNumber: true })}
                    placeholder='Rate'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>Discount</label>
                  <input
                    type='number'
                    {...register(`products.${index}.discount`, { valueAsNumber: true })}
                    placeholder='Discount'
                    className='inputField'
                  />
                </div>

                <div className='flex flex-col'>
                  <label>CGST</label>
                  <input
                    type='number'
                    {...register(`products.${index}.cgst`, { valueAsNumber: true })}
                    placeholder='CGST'
                    className='inputField'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='flex flex-col'>
                  <label>SGST</label>
                  <input
                    type='number'
                    {...register(`products.${index}.sgst`, { valueAsNumber: true })}
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
                name: '',
                hsn: '',
                batchNumber: '',
                expiry: '',
                mrp: 0,
                quantity: '',
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
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillGenerationForm;
