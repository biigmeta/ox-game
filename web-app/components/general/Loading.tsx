import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black/30 rounded-lg backdrop-blur-sm'>
        <div className='w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin'></div>

    </div>
  )
}
