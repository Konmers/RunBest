import storage from './storage'

const baseFormData = async () => {
  const key =await storage.get('key')
  const devicesid =await storage.get('devicesid')
  const formData = new FormData()
  formData.append('key', key)
  formData.append('devicesid', devicesid)
  return formData
}

export {
  baseFormData
}
