import React, { useEffect, useState } from 'react'
import { useJokeStore } from '@/store/jokeStore'
import { useJoke } from '@/hooks'
import {
  JokeDisplay,
  JokeControls,
  FavoritesList,
  Statistics,
  CategoryFilter,
} from '@/components/features'
import { Header, Container, Footer } from '@/components/layout'
import { Alert } from '@/components/ui'
import './App.css'

type TabType = 'home' | 'favorites' | 'statistics'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const {
    currentJoke,
    favorites,
    statistics,
    selectedCategory,
    error,
    setSelectedCategory,
    addFavorite,
    removeFavorite,
    clearFavorites,
    setError,
  } = useJokeStore()

  const { joke, isLoading, error: fetchError, responseTime, fetchJoke } = useJoke()

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      setError(fetchError)
    }
  }, [fetchError, setError])

  const handleFetchJoke = (category?: string) => {
    setError(null)
    fetchJoke(category)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    handleFetchJoke(category)
  }

  const handleFavorite = (jokeToAdd: typeof currentJoke) => {
    if (jokeToAdd) {
      if (favorites.some((fav) => fav.id === jokeToAdd.id)) {
        removeFavorite(jokeToAdd.id)
      } else {
        addFavorite(jokeToAdd)
      }
    }
  }

  const handleShare = async (jokeToShare: typeof currentJoke) => {
    if (!jokeToShare) return

    const text = `${jokeToShare.setup}\n${jokeToShare.delivery}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this joke!',
          text: text,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text)
      setError('Joke copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <Header title="😂 Joke Generator" subtitle="Get random jokes from multiple sources" />

      {/* Main Content */}
      <Container className="flex-1">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 animate-slideUp">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {(['home', 'favorites', 'statistics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'home' && '🏠 Home'}
              {tab === 'favorites' && `❤️ Favorites (${favorites.length})`}
              {tab === 'statistics' && '📊 Statistics'}
            </button>
          ))}
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Controls */}
                <JokeControls
                  isLoading={isLoading}
                  selectedCategory={selectedCategory}
                  onFetchJoke={handleFetchJoke}
                  onCategoryChange={handleCategoryChange}
                  responseTime={responseTime}
                />

                {/* Joke Display */}
                <JokeDisplay
                  joke={currentJoke || joke}
                  isLoading={isLoading}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <FavoritesList
            favorites={favorites}
            onRemove={removeFavorite}
            onClear={clearFavorites}
          />
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && <Statistics statistics={statistics} />}
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
