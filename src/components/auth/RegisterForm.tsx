import Input from "../ui/Input";

const RegisterForm = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2">
                    Create Account
                </h2>

                <p className="text-gray-500">
                    Join the EduTrack academic community.
                </p>
            </div>

            <form className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Dr. Jane Smith"
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@edu.com"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                />

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:opacity-90">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;