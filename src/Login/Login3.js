import React from "react";

function Login3( {formData,setFormData} ) {

  return (
    <div className="other-info-container">

<div>
      <input
        type="text"
        placeholder="Ciphertext..."
        value={formData.ciphertext}
        onChange={(e) => {
          setFormData({ ...formData, ciphertext: e.target.value });
        }}
      />
     
    </div>

    </div>
  );
}

export default Login3;
