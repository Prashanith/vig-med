import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../../components/inputField/InputField";
import { Authentication, AuthenticationSchema } from "./types/authenticate";
import Button from "../../components/button/button";

function Authenticate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(AuthenticationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Authentication) => {
    console.log(data);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-start items-start gap-y-6 w-72'
      >
        <img src='/logo.svg' className='h-12' />
        <InputField id={""} {...register("email")} placeHolder='Email' />
        <InputField id={""} {...register("password")} placeHolder='Password' />
        {isLoading && <p>Loading</p>}
        <Button type='submit' isBlock={true}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Authenticate;
