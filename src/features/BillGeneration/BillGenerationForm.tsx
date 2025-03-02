import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const ProductSchema = z.object({
  id:z.number().min(1),
  name:z.string().min(2),
  hsn:z.string().min(2),
  batchNumber:z.string().min(2),
  expiry:z.string().min(2),
  mrp:z.number().min(2),
  quantity:z.string().min(2),
  freeQuantity:z.number().default(0),
  rate:z.number().default(0),
  amount:z.number().default(0),
  discount:z.number().default(0),
  cgst:z.number().default(0),
  sgst:z.number().default(0),
});

const BillGenerationFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  products:z.array(ProductSchema),
});

const BillGenerationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(BillGenerationFormSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
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

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BillGenerationForm;
