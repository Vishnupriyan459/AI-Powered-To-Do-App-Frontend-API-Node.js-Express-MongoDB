import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col  xl:h-screen items-center justify-center text-center px-6 py-24 whitespace-normal">
        <h1 className="font-bold mb-4 leading-tight max-md:text-lg text-4xl md:text-5xl">
          Organize Your Life With <span className="text-blue-600 inline-block max-md:whitespace-nowrap max-sm:text-2xl  text-4xl md:text-5xl font-bold">AI-Powered To-Dos  ✨</span>
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Plan tasks, manage time efficiently, and let AI help you stay ahead every day.
        </p>

        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-all"
        >
          <span className="text-white">Get Started →</span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-6  py-20 bg-white w-screen overflow-x-hidden">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Use Our AI-Task Manager?
        </h2>

        <div className="grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["📌 Add & Track Tasks", "Create to-dos and update progress easily anytime."],
            ["🤖 AI Suggestions", "Smart suggestions based on your habits and urgency."],
            ["⏳ Time Management", "Never miss deadlines — get reminders and alerts."],
            ["📱 Works On All Devices", "Use it on mobile, tablet, or desktop."],
            ["🔒 Secure & Private", "Your tasks are safely stored — only you can see them."],
            ["🚀 Free to Use", "Start managing tasks today — no credit card needed."]
          ].map(([title, text], i) => (
            <div key={i} className="p-6 bg-gray-100 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-medium mb-2">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center w-screen overflow-x-hidden mt-auto">
        <p>© {new Date().getFullYear()} AI-Powered Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
}
