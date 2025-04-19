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

  const onSubmit = async (data: Authentication) => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField id={""} {...register("email")} />
        <InputField id={""} {...register("password")} />
        {
          isLoading && <p>Loading</p>
        }
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

export default Authenticate;
