import React from "react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center py-16 lg:py-24">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                Organize Your Life, One Task at a Time
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6">
                Manage your daily tasks with ease using our simple and intuitive Todo App. Keep track of everything and boost your productivity!
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                className="w-full max-w-md lg:max-w-lg"
                src="https://source.unsplash.com/500x500/?notebook,task"
                alt="Todo Illustration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Why Use Our Todo App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive design for quick and effortless task management.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m-6-8h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Organized Tasks</h3>
              <p className="text-gray-600">
                Keep all your tasks neatly organized in one place.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 14.828a4 4 0 105.657-5.657"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Productive</h3>
              <p className="text-gray-600">
                Never miss a task and maximize your daily productivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to Stay Organized?</h2>
          <p className="text-lg sm:text-xl mb-6">
            Start managing your tasks effectively with our Todo App today!
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow hover:bg-gray-100">
            Get Started Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
