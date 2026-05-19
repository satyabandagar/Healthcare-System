import React, { useEffect, useState } from "react";
import "./profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:5000/api/user/profile/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile">
      <div className="insideUser">
        <div className="userProfile">
          <center><h2 style={{ fontSize: "70px" }}> Profile</h2></center>
        </div>

        <hr />
        <br />
        <br />

        <div className="userInfo">
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Mobile:</b> {profile.mobile}
          </p>
          <p>
            <b>Gender:</b> {profile.gender}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
