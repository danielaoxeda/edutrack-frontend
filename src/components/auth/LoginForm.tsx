import Input from "../ui/Input";

const LoginForm = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2">
                    Welcome Back
                </h2>

                <p className="text-gray-500">
                    Access your institutional dashboard.
                </p>
            </div>

            <form className="space-y-4">
                <Input
                    label="Institutional Email"
                    type="email"
                    placeholder="name@university.edu"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                />

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:opacity-90">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;