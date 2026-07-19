import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";

import Card from "../Common/Card";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Logo from "../Common/Logo";

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await login(email, password);

      toast.success("Login Successful");

      navigate("/dashboard");

    }

    catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Login Failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: .5 }}

      >

        <Card className="w-[430px]">

          <div className="flex justify-center mb-6">

            <Logo size={90} />

          </div>

          <h1 className="text-3xl font-bold text-center text-white">

            Deepfake Voice

          </h1>

          <p className="text-slate-400 text-center mb-8">

            AI Powered Voice Authentication

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
            >

              {
                loading
                ? "Signing In..."
                : "Login"
              }

            </Button>

          </form>
            <div className="mt-6 text-center text-slate-400">

                 Don't have an account?

                <span

                    onClick={()=>navigate("/register")}

                    className="ml-2 text-blue-500 cursor-pointer hover:underline"

                >

                Register

                </span>

            </div>

        </Card>

      </motion.div>

    </div>

  );

};

export default Login;