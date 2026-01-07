
const UniversalOverlay = ({overlay, setOverlay}:{overlay:boolean, setOverlay:(value:boolean)=>void}) => {
  return (
    <div className={`fixed inset-0 z-5 bg-black/40 ${overlay?'visible':'invisible'}`} onClick={()=>setOverlay(false)}></div> )
}

export default UniversalOverlay;