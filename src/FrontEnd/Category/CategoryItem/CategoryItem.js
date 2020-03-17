import React, { useState, useContext } from "react";
import Card from "../../Shares/Card/Card";
import { AppContext } from "../../../FrontEnd/Shares/Context/AppContext";
import { useHttpHook } from "../../Shares/Hooks/httpRequest";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

function CategoryItem(props) {
  const Auth = useContext(AppContext);
  const { Categories } = props;
  const [state, setstate] = useState(Categories);
  const [, , , , makeRequest] = useHttpHook();
  const DeleteCategory = async Id => {
    try {
      await makeRequest(
        "http://localhost:5000/Category/" + Id,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + Auth.token
        }
      );

      let FilteredCategory = state.filter(
        Cat => Cat._id.toString() !== Id.toString()
      );
      setstate(FilteredCategory);
    } catch (error) {}
  };
  if (state.length === 0) {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>
        Not Found Any Category :(
      </h1>
    );
  }
  return (
    <div id="Categories">
      <h1 style={{ color: "white", textAlign: "center" }}>Our Categories</h1>

      <Card>
        {state.map(Category => (
          <div id="Category" key={Category._id}>
            <h3>{Category.name}</h3>
            <div className="Btn">
              <Link to={`/updateCategory/${Category._id}`} className="Btns">
                Update
              </Link>
              <Link
                to="#"
                className="Btns"
                onClick={() => DeleteCategory(Category._id)}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default CategoryItem;
