import React from 'react'
import { Heart, Share2, Copy } from 'lucide-react'
import { Joke } from '@/types'
import { Card, Button, Badge } from '@/components/ui'
import { useJokeStore } from '@/store/jokeStore'
import { copyToClipboard } from '@/utils'

interface JokeDisplayProps {
  joke: Joke | null
  isLoading?: boolean
  onFavorite?: (joke: Joke) => void
  onShare?: (joke: Joke) => void
}

const JokeDisplay: React.FC<JokeDisplayProps> = ({ joke, isLoading = false, onFavorite, onShare }) => {
  const { isFavorite } = useJokeStore()
  const [copied, setCopied] = React.useState(false)

  if (!joke && !isLoading) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Click "Get Random Joke" to get started!</p>
      </Card>
    )
  }

  const handleCopy = async () => {
    if (joke) {
      const text = `${joke.setup}\n${joke.delivery}`
      const success = await copyToClipboard(text)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const isFav = joke ? isFavorite(joke.id) : false

  return (
    <Card className="animate-slideUp">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{joke?.category || 'General'}</Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">via {joke?.source}</span>
            </div>
          </div>
        </div>

        {/* Joke Content */}
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          </div>
        ) : joke ? (
          <div className="space-y-4">
            {/* Setup */}
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">Setup:</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{joke.setup}</p>
            </div>

            {/* Delivery */}
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">Punchline:</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{joke.delivery}</p>
            </div>
          </div>
        ) : null}

        {/* Actions */}
        {joke && (
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant={isFav ? 'danger' : 'secondary'}
              size="sm"
              onClick={() => onFavorite?.(joke)}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
              {isFav ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Copy size={18} />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onShare?.(joke)}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default JokeDisplay
