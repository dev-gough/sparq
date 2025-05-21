'use client'

import { useState } from 'react'

const DropdownButtons = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="w-full">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full font-semibold transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              Button {index + 1}
            </button>
            {openIndex === index && (
              <div className="mt-2 p-4 bg-gray-100 rounded-md text-gray-700 shadow-sm">
                Dropdown content for button {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownButtons