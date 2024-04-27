import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { CustomProvider } from 'rsuite'

import App from './app'
import './index.less'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <CustomProvider theme='dark'>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </CustomProvider>
  )
}
