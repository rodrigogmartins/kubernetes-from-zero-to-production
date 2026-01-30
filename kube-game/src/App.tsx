'use client'

import { Suspense } from 'react'
import KubeGame from './KubeGame'
import './App.css'

function LoadingFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-foreground">Loading Kube Game...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <Suspense fallback={<LoadingFallback />}>
        <KubeGame />
      </Suspense>
    </div>
  )
}
