import authService from "@/appwrite/auth";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface InputProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<InputProps>();
  const [loading, setLoading] = useState(false)

  const submit: SubmitHandler<InputProps> = async (data) => {
    setLoading(true);
    try {
      const session = await authService.login(data)
      if (session) {
        await authService.getCurrentUser();
        sessionStorage.setItem('isLoggedIn', 'true');
        toast.success("Login successful")
        navigate('/')
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false)
  };

  return (
    <main className="h-screen w-full flex justify-center items-center bg-gray-200">
      {!loading ? (
        <Card className="w-full max-w-sm space-y-6 ">
          <CardHeader>
            <div className="space-y-2 text-center">
              <CardTitle className="text-center text-3xl font-bold ">Admin Panel</CardTitle>
              <p className="text-muted-foreground">Sign in to manage your portfolio website.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(submit)}>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email :</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password :</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-base"
              >
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>) :
        <Loading />
      }
    </main>
  );
};

export default Login;
