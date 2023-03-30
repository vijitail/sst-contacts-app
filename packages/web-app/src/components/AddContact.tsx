import { useState } from "react";

interface AddContactProps {
  onContactAdd: () => void;
}

export const AddContact = ({ onContactAdd }: AddContactProps) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const updateData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    onContactAdd();
    setValues({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={updateData}
          value={values.name || ""}
        />
        <input
          type="email"
          name="email"
          onChange={updateData}
          value={values.email || ""}
        />
        <button>Add Contact</button>
      </form>
    </div>
  );
};
