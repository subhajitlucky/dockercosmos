import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function FilesystemVisualizer() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [modifiedFiles, setModifiedFiles] = useState<Set<number>>(new Set())
  const [showOverlay, setShowOverlay] = useState(false)

  const layers = [
    { id: 0, name: 'Base', color: 'bg-secondary', content: ['/bin', '/etc', '/usr', '/lib'] },
    { id: 1, name: 'Layer 1', color: 'bg-primary/80', content: ['/etc/nginx/nginx.conf'] },
    { id: 2, name: 'Layer 2', color: 'bg-primary/70', content: ['/usr/share/nginx/html/index.html'] },
    { id: 3, name: 'Container', color: 'bg-primary', content: ['/app/config.json', '/app/data/'] },
  ]

  const handleLayerClick = (layerId: number) => {
    if (layerId === 3) {
      setShowOverlay(!showOverlay)
    } else {
      setActiveLayer(activeLayer === layerId ? null : layerId)
    }
  }

  const toggleFile = (fileId: number) => {
    const newSet = new Set(modifiedFiles)
    if (newSet.has(fileId)) {
      newSet.delete(fileId)
    } else {
      newSet.add(fileId)
    }
    setModifiedFiles(newSet)
  }

  const files = [
    { id: 0, name: '/etc/config.json', layer: 2 },
    { id: 1, name: '/app/secrets.json', layer: 3 },
    { id: 2, name: '/app/logs/app.log', layer: 3 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-primary">Overlay Filesystem</h4>
        <p className="text-sm text-muted-foreground">
          Stack read-only layers with a writable container layer
        </p>
      </div>

      {/* Layer Stack */}
      <div className="flex items-end justify-center gap-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLayerClick(layer.id)}
            className={`relative cursor-pointer rounded-lg border-2 bg-secondary p-4 text-center text-foreground transition-all ${
              activeLayer === layer.id || (layer.id === 3 && showOverlay)
                ? 'border-primary shadow-lg'
                : 'border-transparent hover:border-primary/30'
            }`}
            style={{
              width: index < 3 ? '80px' : '120px',
              height: index < 3 ? '60px' : '80px',
              opacity: index < 3 && activeLayer !== null && activeLayer !== layer.id ? 0.5 : 1,
            }}
          >
            <div className="text-xs font-medium">{layer.name}</div>
            <div className="mt-1 text-[10px] opacity-80">
              {layer.id === 3 ? 'R/W' : 'R/O'}
            </div>

            {/* Modified indicator for container layer */}
            {layer.id === 3 && modifiedFiles.size > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-yellow-500 text-[8px] flex items-center justify-center"
              >
                {modifiedFiles.size}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Active Layer Details */}
      <AnimatePresence>
        {(activeLayer !== null || showOverlay) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg bg-secondary/50 p-4">
              <h5 className="mb-2 text-sm font-medium">
                {activeLayer !== null ? layers[activeLayer].name : 'Container Layer (Overlay)'}
              </h5>
              <div className="space-y-2">
                {(activeLayer !== null ? layers[activeLayer].content : ['/app/', '/data/']).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded bg-background/50 px-3 py-1 text-sm font-mono"
                  >
                    <span className="text-muted-foreground">
                      {item.startsWith('/') ? '📁' : '📄'}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy-on-Write Demo */}
      <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
        <h5 className="mb-3 text-sm font-medium text-orange-500">Copy-on-Write Demo</h5>
        <p className="mb-3 text-sm text-muted-foreground">
          Click files to simulate modifying them - they get copied to the container layer!
        </p>

        <div className="space-y-2">
          {files.map((file) => (
            <motion.button
              key={file.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleFile(file.id)}
              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm font-mono transition-colors ${
                modifiedFiles.has(file.id)
                  ? 'bg-orange-500/20 text-orange-500'
                  : 'bg-background/50 hover:bg-background'
              }`}
            >
              <span>{modifiedFiles.has(file.id) ? '📝' : '📄'}</span>
              <span>{file.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                Layer {file.layer}
              </span>
              {modifiedFiles.has(file.id) && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-orange-500"
                >
                  → copied to layer 3!
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-secondary border" />
          <span>Base Image (R/O)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-primary" />
          <span>Container Layer (R/W)</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📝</span>
          <span>Copy-on-Write</span>
        </div>
      </div>
    </div>
  )
}
