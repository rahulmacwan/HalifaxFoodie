import React from "react";

function Registration3( {formData,setFormData} ) {

  return (
    <div className="other-info-container">

<div>
      <input
        type="text"
        placeholder="key..."
        value={formData.key}
        onChange={(e) => {
          setFormData({ ...formData, key: e.target.value });
        }}
      />
     
    </div>
        <div>
      <input
        type="text"
        placeholder="Plaintext..."
        value={formData.plaintext}
        onChange={(e) => {
          setFormData({ ...formData, plaintext: e.target.value });
        }}
      />
     
    </div>

    


    </div>
  );
}

export default Registration3;
