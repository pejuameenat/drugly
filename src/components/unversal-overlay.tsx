
const UniversalOverlay = ({overlay, setOverlay}:{overlay:boolean, setOverlay:(value:boolean)=>void}) => {
  return (
    <div className={`fixed inset-0 z-10 bg-black/30 ${overlay?'visible':'invisible'}`} onClick={()=>setOverlay(false)}></div> )
}

export default UniversalOverlay;