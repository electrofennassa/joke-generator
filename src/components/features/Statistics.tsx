import React from 'react'
import { JokeStatistics } from '@/types'
import { Card, Badge } from '@/components/ui'

interface StatisticsProps {
  statistics: JokeStatistics
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  const stats = [
    {
      label: 'Total Viewed',
      value: statistics.totalViewed,
      icon: '👀',
      color: 'blue',
    },
    {
      label: 'Favorites',
      value: statistics.totalFavorites,
      icon: '❤️',
      color: 'red',
    },
    {
      label: 'Avg Response',
      value: `${statistics.averageResponseTime.toFixed(0)}ms`,
      icon: '⚡',
      color: 'yellow',
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">📊 Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <div className="space-y-2">
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {statistics.mostUsedCategory && (
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Most Used Category</p>
          <Badge variant="primary">{statistics.mostUsedCategory}</Badge>
        </Card>
      )}

      <Card className="text-xs text-gray-500 dark:text-gray-400">
        <p>Last updated: {new Date(statistics.lastFetchedAt).toLocaleString()}</p>
      </Card>
    </div>
  )
}

export default Statistics
