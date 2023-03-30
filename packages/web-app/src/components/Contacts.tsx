import { useEffect, useState } from "react";
import { Contact } from "../types";
import { AddContact } from "./AddContact";

export const Contacts = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadContactList = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/contacts`)
      .then((r) => r.json())
      .then((data) => {
        setContactList(data);
      })
      .finally(() => setLoading(false));
  };

  const deleteContact = (contact: Contact) => {
    fetch(`${process.env.REACT_APP_API_URL}/contacts/${contact.id}`, {
      method: "DELETE",
      body: JSON.stringify({ email: contact.email }),
    }).then(() => loadContactList());
  };

  useEffect(() => {
    loadContactList();
  }, []);

  return (
    <div>
      <AddContact onContactAdd={loadContactList} />

      <div style={{ marginTop: 20 }}>
        {!isLoading ? (
          contactList.length ? (
            <table cellPadding={5} border={1} style={{ margin: "auto" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>
                      <button onClick={() => deleteContact(contact)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Contacts found"
          )
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};
