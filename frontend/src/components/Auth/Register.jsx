import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth";

import Card from "../Common/Card";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Logo from "../Common/Logo";

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            await registerUser({
                email,
                password,
            });

            toast.success("Registration Successful");

            navigate("/login");

} catch (error) {

    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
        toast.error(detail[0].msg);
    } else if (typeof detail === "string") {
        toast.error(detail);
    } else {
        toast.error("Registration Failed");
    }

} finally {

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

                        Create Account

                    </h1>

                    <p className="text-slate-400 text-center mb-8">

                        Deepfake Voice Authenticator

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <Input
                            label="Email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Register"}

                        </Button>

                    </form>

                    <div className="mt-6 text-center text-slate-400">

                        Already have an account?

                        <span
                            onClick={() => navigate("/login")}
                            className="ml-2 text-blue-500 cursor-pointer hover:underline"
                        >

                            Login

                        </span>

                    </div>

                </Card>

            </motion.div>

        </div>

    );

};

export default Register;