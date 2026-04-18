import useTab from '@/hooks/useTab'

const NotePage = () => {
  const {currentTab} =useTab()
  return (
    <div>
      {currentTab.name}
    
    
    </div>
  )
}

export default NotePage