import { format } from "date-fns";
import Style from "styled-components";

const User = Style.div`
    padding: 1em;
    margin: 2rem 0;
`;


const UserDetails = ({ currentUser }) => {
  return (
    <>
      <div className="w-full flex justify-between py-[3em] px-[4em] border-b">
        {currentUser && (
          <div className="flex">
            <div className="w-[150px] h-[150px] overflow-hidden rounded-full">
              <img
                src={currentUser ? `http://localhost:8080/${currentUser.image}` : "/images/profile.png"}
                alt="logo"
                className="rounded-full w-auto h-auto"
              />
            </div>
            <div className="p-[1em] my-[.8rem]">
              <p className="text-3xl font-semibold underline font-serif">
                {currentUser?.name}
              </p>
              <p className="text-sm py-1">
                {currentUser?.bio}
              </p>
              <p className="text-sm py-1">
                {currentUser?.phone}
              </p>
              <div className="text-sm opacity-60 py-1">
                <p>
                  Joined At{" "}
                  {format(new Date(currentUser?.createdAt), "yyyy MMM dd")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetails;
