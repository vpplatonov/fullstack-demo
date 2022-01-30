import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export const SpendingTracker = () => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [spendings, setSpendings] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          description,
          category,
          amount,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          description,
          category,
          amount,
        }),
      });
      const data = await res.json();

      setEditing(false);
      setId("");
    }
    await getSpendings();

    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
    nameInput.current.focus();
  };

  const getSpendings = async () => {
    const res = await fetch(`${API}/api`);
    const data = await res.json();
    setSpendings(data);
  };

  const deleteSpending = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/api/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getSpendings();
    }
  };

  const editSpending = async (id) => {
    const res = await fetch(`${API}/api/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setDate(data.date);
    setDescription(data.description);
    setCategory(data.category);
    setAmount(data.amount);
    nameInput.current.focus();
  };

  useEffect(() => {
    getSpendings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <label className="form-label mt-4">Date</label>
            <input
              type="text"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="form-control"
              placeholder="2022-01-29"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label mt-4">Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              placeholder="Description"
            />
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="form-group">
                <label className="form-label mt-4">Category</label>
                <input
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="form-control"
                  placeholder="Category"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="form-label mt-4">Amount $</label>
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className="form-control"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <p className="bs-component"></p>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">Clear</button>
            <button className="btn btn-primary btn-group">
              {editing ? "Update" : "Create"}
            </button>
        </div>

        </form>
      </div>
      <div className="col-md-8 card card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {spendings.map((spending) => (
              <tr key={spending._id}>
                <td>{spending.date}</td>
                <td>{spending.description}</td>
                <td>{spending.category}</td>
                <td>${spending.amount}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editSpending(spending._id)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteSpending(spending._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
