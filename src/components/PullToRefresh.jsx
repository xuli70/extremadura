import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

const PullToRefresh = ({ onComplete }) => {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let startY = 0
    let currentY = 0
    let isDragging = false

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
        isDragging = true
      }
    }

    const handleTouchMove = (e) => {
      if (!isDragging || window.scrollY > 0) return
      
      currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY)
      
      if (distance > 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, 80))
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance >= 60 && !isRefreshing) {
        setIsRefreshing(true)
        setPullDistance(60)
        
        setTimeout(() => {
          onComplete?.()
          setPullDistance(0)
          setIsRefreshing(false)
        }, 1000)
      } else {
        setPullDistance(0)
      }
      
      isDragging = false
    }

    // Agregar event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance, isRefreshing, onComplete])

  return (
    <div 
      className="pull-refresh"
      style={{ 
        height: `${pullDistance}px`,
        transform: `translateY(-${60 - pullDistance}px)`
      }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full transition-all duration-300 ${
          isRefreshing ? 'animate-spin' : pullDistance >= 60 ? 'rotate-180' : ''
        }`} />
        <span className="text-xs text-primary-600 mt-1 font-medium">
          {isRefreshing ? 'Actualizando...' : pullDistance >= 60 ? 'Suelta para actualizar' : 'Desliza hacia abajo'}
        </span>
      </div>
    </div>
  )
}

export default PullToRefresh