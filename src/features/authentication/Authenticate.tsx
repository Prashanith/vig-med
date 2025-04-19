import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../../components/inputField/InputField";
import { Authentication, AuthenticationSchema } from "./types/authenticate";
import Button from "../../components/button/button";
import { loginWithEmailAndPassword } from "./services/authService";

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
    await loginWithEmailAndPassword(data.email, data.password);
    console.log(data);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-start items-start gap-y-7 w-96 p-7 rounded-lg shadow-sm shadow-secondary'
      >
        <img src='/logo.svg' className='h-12' />
        <InputField
          id={""}
          {...register("email")}
          placeHolder='Email'
          error={errors.email?.message}
        />
        <InputField
          id={""}
          {...register("password")}
          placeHolder='Password'
          error={errors.password?.message}
        />
        {isLoading && <p>Loading</p>}
        <Button type='submit' isBlock={true}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Authenticate;
