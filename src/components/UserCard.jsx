const UserCard = ({ user }) => {
    if (!user) return null;
  
    const { firstName, lastName, photoUrl } = user;
  
    return (
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl || "https://cdn-icons-png.flaticon.com/256/149/149071.png"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
        </div>
      </div>
    );
  };
  
export default UserCard;
