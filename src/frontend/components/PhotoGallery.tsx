import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Lang, tr } from '@/frontend/lib/i18n'
import { Photo, Participant } from '@/shared/types'

interface PhotoGalleryProps {
  lang: Lang
  user: Participant
}

// In the absence of env vars, these will be empty strings
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function PhotoGallery({ lang, user }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const T = (key: string) => tr(key, lang)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/photos')
      const data = await res.json()
      if (Array.isArray(data)) setPhotos(data)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError(null)

      // 1. Upload to Supabase Storage
      const fileName = `${Date.now()}_${user.name.replace(/\s+/g, '_')}_${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadError) throw new Error(uploadError.message)

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(data.path)

      // 3. Save to database via API
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: publicUrl,
          author: user.name,
          caption: ''
        })
      })

      if (!res.ok) throw new Error('Database save failed')

      await fetchPhotos()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-up">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold font-lora text-ink">{T('gallery.title')}</h3>
        <label className={`
          relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md
          ${uploading ? 'bg-muted/50 cursor-not-allowed opacity-50' : 'bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20'}
        `}>
          <span>{uploading ? '⏳' : '📸'}</span>
          {uploading ? T('gallery.uploading') : T('gallery.add')}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={uploading} 
          />
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-10 bg-muted/20 rounded-3xl border border-dashed border-muted">
          <span className="text-4xl mb-4 grayscale opacity-50">🖼️</span>
          <p className="text-sm font-medium text-muted">{T('gallery.none')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 pb-10">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square bg-muted rounded-xl overflow-hidden border border-line shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => window.open(photo.url, '_blank')}
            >
              <img 
                src={photo.url} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={photo.caption || 'Retraite Photo'} 
              />
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[8px] text-white font-medium truncate">{photo.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
