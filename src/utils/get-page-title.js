import defaultSettings from '@/settings'

const title = defaultSettings.title || 'e-守护后台管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
