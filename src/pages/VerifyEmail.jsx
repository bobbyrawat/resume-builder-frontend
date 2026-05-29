export default function VerifyEmail() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-96">
        
        <h2 className="text-2xl font-bold mb-4">📧 Check Your Email</h2>
        
        <p className="text-gray-600">
          We’ve sent a verification link to your email.
          Please check your inbox and verify your account.
        </p>

        <p className="text-sm text-gray-400 mt-3">
          Didn’t receive it? Check spam or try again.
        </p>
      </div>
    </div>
  );
}