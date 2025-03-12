import { useState } from "react";

function Day41() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
  });
  const setFormValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <input
        type="text"
        value={formValues.firstName}
        name="firstName"
        onChange={setFormValue}
      />

      <input
        type="text"
        value={formValues.lastName}
        name="lastName"
        onChange={setFormValue}
      />
    </div>
  );
}

export default Day41;
