import storage from './storage'
import DeviceInfo from 'react-native-device-info';

const strongFormData = async () => {
  await storage.add('devicesid',DeviceInfo.getDeviceId())
  const token =await storage.get('token')
  const devicesid =await storage.get('devicesid')
  const formData = new FormData()
  formData.append('token', token)
  formData.append('devicesid', devicesid)
  console.log(' strongformData-------  ', formData)

  return formData
}

export {
  strongFormData
}
