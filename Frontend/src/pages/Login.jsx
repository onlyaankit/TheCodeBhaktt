// MongoDB Password = c7o0sgGR1BetH3XG
// username = workforaankit1
// URL = mongodb+srv://workforaankit1:c7o0sgGR1BetH3XG@cluster0.ikpmp.mongodb.net/
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/features/api/authApi";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "signup failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "login failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    registerIsSuccess,
    loginIsSuccess,
  ]);
  
  return (
    <div className="flex items-center justify-center mt-10">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup Here</CardTitle>
              <CardDescription>
                Welcome! Create your account by filling in the details below.
                Click Signup to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="name"
                  type="Email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                  placeholder="ankit@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={signupInput.username}
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                  placeholder="@codefactory"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input
                  id="Password"
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => {
                    changeInputHandler(e, "signup");
                  }}
                  placeholder="code@123"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login Here</CardTitle>
              <CardDescription>
                Welcome back! Enter your details to log in and continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="UserName"
                  type="Email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => {
                    changeInputHandler(e, "login");
                  }}
                  placeholder="ankit@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input
                  id="Password"
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => {
                    changeInputHandler(e, "login");
                  }}
                  placeholder="code@123"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
