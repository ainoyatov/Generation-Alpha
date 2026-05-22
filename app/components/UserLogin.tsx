"use client"

type Props = {
  username: string
  savedUsername: string
  tempUsername: string
  tempPassword: string
  showSavedLogin: boolean
  showUserPopup: boolean
  userMessage: string
  setTempUsername: (value: string) => void
  setTempPassword: (value: string) => void
  continueSavedLogin: () => void
  createDifferentUser: () => void
  createUser: () => void
}

export default function UserLogin({
  savedUsername,
  tempUsername,
  tempPassword,
  showSavedLogin,
  showUserPopup,
  userMessage,
  setTempUsername,
  setTempPassword,
  continueSavedLogin,
  createDifferentUser,
  createUser,
}: Props) {
  return (
    <>
      {showSavedLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-green-900 shadow-2xl">
            <h2 className="text-3xl font-black">Welcome Back</h2>

            <p className="mt-3 text-green-700">
              Log into this saved account?
            </p>

            <div className="mt-6 rounded-xl bg-green-100 p-4 text-center text-2xl font-black">
              @{savedUsername}
            </div>

            <button
              onClick={continueSavedLogin}
              className="mt-4 w-full rounded-lg bg-green-900 px-6 py-3 text-white"
            >
              Continue as @{savedUsername}
            </button>

            <button
              onClick={createDifferentUser}
              className="mt-3 w-full rounded-lg bg-gray-700 px-6 py-3 text-white"
            >
              Create Different Account
            </button>
          </div>
        </div>
      )}

      {showUserPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-green-900 shadow-2xl">
            <h2 className="text-3xl font-black">Create Account</h2>

            <input
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Username"
              className="mt-6 w-full rounded-lg border p-4"
            />

            <input
              type="password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Password"
              className="mt-4 w-full rounded-lg border p-4"
            />

            <button
              onClick={createUser}
              className="mt-4 w-full rounded-lg bg-green-900 px-6 py-3 text-white"
            >
              Save Account
            </button>

            {userMessage && (
              <p className="mt-4 rounded-lg bg-green-100 p-3">
                {userMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}