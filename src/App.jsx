import { ModalForm } from "./components/ModalForm";
import React from "react";

function App() {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <div >
      {modalOpen && <ModalForm setModalOpen={()=> setModalOpen(!modalOpen)}/>}
      <button onClick={() => setModalOpen(!modalOpen)} className="form_button">Open Form</button>
    </div>
  );
}

export default App;
