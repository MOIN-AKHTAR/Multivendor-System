import React from "react";
import "./UserItem.css";

function UserItem(props) {
  const { Vendors } = props;
  if (Vendors.length === 0) {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>No Vendor Yet</h1>
    );
  } else {
    Vendors.map(Vendor => console.log(Vendor.firstName));
    let Element = Vendors.map(Vendor => (
      <div key={Vendor._id} className="Individual_Vendor">
        <div className="Image">
          <img
            className="Vendor_Img"
            src={"http://localhost:5000/" + Vendor.image}
            alt="No Preview"
          />
        </div>
        <div className="Vendor_Name">
          <p>{Vendor.firstName}</p>
          <p>{Vendor.lastName}</p>
        </div>
        <div className="Information">
          <p>Items: {Vendor.items.length}</p>
          <p>Total: {Vendor.totalAmount}</p>
        </div>
      </div>
    ));
    console.log(Element);
    return <div id="Vendors_Div">{Element}</div>;
  }
}

export default UserItem;

// image: "src\Upload\Images\386b0020-686a-11ea-9868-e30416be876b.jpeg"
// role: "vendor"
// items: []
// totalAmount: 0
// _id: "5e70f721014045384c7ab2a9"
// firstName: "Saqib"
// lastName: "Hussain"
