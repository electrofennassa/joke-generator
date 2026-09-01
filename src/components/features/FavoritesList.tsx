import React from 'react'
import { Trash2, Download } from 'lucide-react'
import { Favorite } from '@/types'
import { Card, Button, Badge } from '@/components/ui'
import { downloadJSON, formatDate } from '@/utils'

interface FavoritesListProps {
  favorites: Favorite[]
  onRemove: (id: string) => void
  onClear: () => void
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemove, onClear }) => {
  const handleExport = () => {
    downloadJSON(favorites, `favorites-${Date.now()}.json`)
  }

  if (favorites.length === 0) {
    return (
      <Card className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 text-lg">❤️ No favorites yet! Add some jokes to get started.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ❤️ Favorites ({favorites.length})
        </h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={18} className="mr-1" />
            Export
          </Button>
          {favorites.length > 0 && (
            <Button variant="danger" size="sm" onClick={onClear}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid gap-4">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="animate-fadeIn">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2 items-start">
                  <Badge variant="primary">{favorite.category || 'General'}</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                    {formatDate(favorite.favoritedAt)}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{favorite.setup}</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{favorite.delivery}</p>
              </div>
              <button
                onClick={() => onRemove(favorite.id)}
                className="flex-shrink-0 p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                aria-label="Remove from favorites"
              >
                <Trash2 size={20} className="text-red-600 dark:text-red-400" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList
