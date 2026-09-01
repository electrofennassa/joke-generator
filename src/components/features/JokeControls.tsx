import React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui'
import { JOKE_CATEGORIES } from '@/constants'

interface JokeControlsProps {
  isLoading: boolean
  selectedCategory: string | null
  onFetchJoke: (category?: string) => void
  onCategoryChange: (category: string) => void
  responseTime?: number
}

const JokeControls: React.FC<JokeControlsProps> = ({
  isLoading,
  selectedCategory,
  onFetchJoke,
  onCategoryChange,
  responseTime = 0,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📂 Select Category
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {JOKE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Action Button */}
      <div className="pt-2">
        <Button
          onClick={() => onFetchJoke(selectedCategory || 'any')}
          isLoading={isLoading}
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          {isLoading ? 'Loading Joke...' : 'Get Random Joke 😄'}
        </Button>
      </div>

      {/* Response Time */}
      {responseTime > 0 && (
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          ⚡ Response time: {responseTime.toFixed(0)}ms
        </div>
      )}
    </div>
  )
}

export default JokeControls
