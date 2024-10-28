import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";

export const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto pb-4">
      {!loading ? (
        <BiLogOut
          className="w-8 h-8 text-black cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div> // mt-auto will fix this logout button at the bottom
  );
};
