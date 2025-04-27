import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Sale, SaleSchema } from "../types/sale";
import InputField from "../../../../components/inputField/InputField";
import Button from "../../../../components/button/button";

const generateDefaultValues = (): Sale => ({
  id: uuidv4(),
  date: new Date().toISOString().split("T")[0],
  netAmount: 0,
  categoryBreakdown: {
    medicine: 0,
    general: 0,
  },
});

const SaleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Sale>({
    resolver: zodResolver(SaleSchema),
    defaultValues: generateDefaultValues(),
  });

  // 👀 Watch category values
  const medicine = watch("categoryBreakdown.medicine");
  const general = watch("categoryBreakdown.general");

  // 🔁 Update netAmount whenever categories change
  useEffect(() => {
    const total = (medicine || 0) + (general || 0);
    setValue("netAmount", total, { shouldValidate: true });
  }, [medicine, general, setValue]);

  const onSubmit = (data: Sale) => {
    console.log("Sale submitted:", data);
    reset(generateDefaultValues()); // Re-generate UUID + reset form
  };

  return (
    <div className='w-full flex flex-col justify-center items-start space-y-6 pagePadding'>
      <h3 className='text-left justify-self-start text-3xl py-2 font-bold'>
        Add Sale
      </h3>
      <div className='w-full border-b-teal-700 border-[1px]'></div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md'>
        <InputField
          id='date'
          label='Date'
          type='date'
          {...register("date")}
          error={errors.date?.message}
        />
        <InputField
          id='netAmount'
          label='Net Amount'
          type='number'
          readOnly={true}
          {...register("netAmount")}
          error={errors.netAmount?.message}
        />
        <InputField
          id='medicineSales'
          label='Medicine Category Sales'
          type='number'
          {...register("categoryBreakdown.medicine", { valueAsNumber: true })}
          error={errors.categoryBreakdown?.medicine?.message}
        />
        <InputField
          id='generalSales'
          label='General Category Sales'
          type='number'
          {...register("categoryBreakdown.general", { valueAsNumber: true })}
          error={errors.categoryBreakdown?.general?.message}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
};

export default SaleForm;
