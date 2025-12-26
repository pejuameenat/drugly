const UniversalOverlay = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value:boolean) => void;
}) => {
  return (
    <>{isOpen ? <div className="fixed inset-0 bg-black/40" onClick={()=>setIsOpen(false)}></div> : null}</>
  );
};

export default UniversalOverlay;
