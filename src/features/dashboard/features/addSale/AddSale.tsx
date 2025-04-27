import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Sale, SaleSchema } from "../types/sale";
import InputField from "../../../../components/inputField/InputField";
import Button from "../../../../components/button/button";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../services/firebase";

// Default values for a new sale
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

  const medicine = watch("categoryBreakdown.medicine");
  const general = watch("categoryBreakdown.general");

  useEffect(() => {
    const total = (medicine || 0) + (general || 0);
    setValue("netAmount", total, { shouldValidate: true });
  }, [medicine, general, setValue]);

  const onSubmit = async (data: Sale) => {
    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", "==", data.date));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Document exists for today's date, update the first one
        const docSnap = querySnapshot.docs[0];
        const existingData = docSnap.data() as Sale;

        const updatedData: Sale = {
          ...existingData,
          netAmount: existingData.netAmount + data.netAmount,
          categoryBreakdown: {
            medicine:
              existingData.categoryBreakdown.medicine +
              data.categoryBreakdown.medicine,
            general:
              existingData.categoryBreakdown.general +
              data.categoryBreakdown.general,
          },
        };

        await updateDoc(doc(db, "sales", docSnap.id), updatedData);
        console.log("✅ Sale updated for today");
      } else {
        // No sale yet for today — create new document
        await addDoc(salesRef, data);
        console.log("🆕 New sale added for today");
      }

      reset(generateDefaultValues());
    } catch (err) {
      console.error("❌ Error submitting sale:", err);
    }
  };

  return (
    <div className='w-full flex flex-col justify-center items-start space-y-6 pagePadding'>
      <h3 className='text-left text-3xl py-2 font-bold'>Add Sale</h3>
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
          readOnly
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