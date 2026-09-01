import React from 'react'
import { Filter } from 'lucide-react'
import { JOKE_CATEGORIES } from '@/constants'
import { Card } from '@/components/ui'

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  disabled?: boolean
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  disabled = false,
}) => {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Filter by Category</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {JOKE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              disabled={disabled}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default CategoryFilter
