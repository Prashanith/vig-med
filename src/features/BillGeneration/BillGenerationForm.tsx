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
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  products: z.array(ProductSchema),
});

const BillGenerationForm = () => {
  // Initialize the form with React Hook Form and Zod
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(BillGenerationFormSchema),
    defaultValues: {
      products: [{ id: 1, name: '', hsn: '', batchNumber: '', expiry: '', mrp: 0, quantity: '', freeQuantity: 0, rate: 0, amount: 0, discount: 0, cgst: 0, sgst: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
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
      const taxAmount = discountedPrice * (cgst + sgst) / 100;
      const amount = discountedPrice + taxAmount;

      // Update product amount
      product.amount = amount;

      totalBill += amount;
    });

    console.log('Final Total Bill: ', totalBill);
    console.log('Form Data: ', data);
  };

  return (
    <div className='w-full h-screen'>
      <h1>Bill Generation</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        {/* Product Fields */}
        <h2>Products</h2>
        {fields.map((item, index) => (
          <div key={item.id}>
            <h3>Product {index + 1}</h3>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                {...register(`products.${index}.name`)}
                placeholder="Name"
              />
              {errors.products?.[index]?.name && <span>{errors.products[index].name?.message}</span>}
            </div>

            <div>
              <label>HSN</label>
              <input
                type="text"
                {...register(`products.${index}.hsn`)}
                placeholder="HSN"
              />
            </div>

            <div>
              <label>Batch Number</label>
              <input
                type="text"
                {...register(`products.${index}.batchNumber`)}
                placeholder="Batch Number"
              />
            </div>

            <div>
              <label>Expiry Date</label>
              <input
                type="text"
                {...register(`products.${index}.expiry`)}
                placeholder="Expiry"
              />
            </div>

            <div>
              <label>MRP</label>
              <input
                type="number"
                {...register(`products.${index}.mrp`, { valueAsNumber: true })}
                placeholder="MRP"
              />
            </div>

            <div>
              <label>Quantity</label>
              <input
                type="text"
                {...register(`products.${index}.quantity`)}
                placeholder="Quantity"
              />
            </div>

            <div>
              <label>Free Quantity</label>
              <input
                type="number"
                {...register(`products.${index}.freeQuantity`, { valueAsNumber: true })}
                placeholder="Free Quantity"
              />
            </div>

            <div>
              <label>Rate</label>
              <input
                type="number"
                {...register(`products.${index}.rate`, { valueAsNumber: true })}
                placeholder="Rate"
              />
            </div>

            <div>
              <label>Discount</label>
              <input
                type="number"
                {...register(`products.${index}.discount`, { valueAsNumber: true })}
                placeholder="Discount"
              />
            </div>

            <div>
              <label>CGST</label>
              <input
                type="number"
                {...register(`products.${index}.cgst`, { valueAsNumber: true })}
                placeholder="CGST"
              />
            </div>

            <div>
              <label>SGST</label>
              <input
                type="number"
                {...register(`products.${index}.sgst`, { valueAsNumber: true })}
                placeholder="SGST"
              />
            </div>

            <div>
              <button type="button" onClick={() => remove(index)}>
                Remove Product
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={() => append({ id: fields.length + 1, name: '', hsn: '', batchNumber: '', expiry: '', mrp: 0, quantity: '', freeQuantity: 0, rate: 0, amount: 0, discount: 0, cgst: 0, sgst: 0 })}>
          Add Product
        </button>

        {/* Submit Button */}
        <button type="submit">Generate Bill</button>
      </form>
    </div>
  );
};

export default BillGenerationForm;
