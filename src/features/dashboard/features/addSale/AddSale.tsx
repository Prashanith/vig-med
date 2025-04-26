import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Sale, SaleSchema } from "../types/sale";
import InputField from "../../../../components/inputField/InputField";

const SaleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Sale>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      id: uuidv4(),
      date: new Date().toISOString().split("T")[0],
      netAmount: 0,
      categoryBreakdown: {
        medicine: 0,
        general: 0,
      },
    },
  });

  const onSubmit = (data: Sale) => {
    console.log("Sale submitted:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md'>
      <InputField
        id={"date"}
        label='Date'
        type='date'
        {...register("date")}
        error={errors.date?.message}
      />
      <InputField
        id='netAmount'
        type='number'
        {...register("netAmount", { valueAsNumber: true })}
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
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        Submit Sale
      </button>
    </form>
  );
};

export default SaleForm;
