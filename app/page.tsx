import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>

      {/* Right side content - hidden on mobile */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center lg:max-w-2xl lg:ml-8">
        <div className="text-white space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-balance">HR Management System</h1>
            <p className="text-xl text-blue-100">Everything you need to manage your workforce efficiently</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Employee Management</h3>
                <p className="text-sm text-blue-100">
                  Streamline your workforce with comprehensive employee profiles, onboarding workflows, and performance
                  tracking.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Secure Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
