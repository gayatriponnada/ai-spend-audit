function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Spend Audit
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find out if your startup is overspending on AI tools.
          Get a free instant audit and see how much you can save.
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
          Start Free Audit →
        </button>
        <p className="text-sm text-gray-400 mt-4">
          No login required. Takes 2 minutes.
        </p>
      </div>
    </div>
  )
}

export default App