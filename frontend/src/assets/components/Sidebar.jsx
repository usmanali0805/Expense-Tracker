import React from "react";
import { LayoutPanelLeft, Wallet, HandCoins, LogOut, Delete  , User} from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";

const Sidebar = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"))
    setUser(userdata)
    const usertoken = JSON.parse(localStorage.getItem("token"))
    setToken(usertoken)
  }, [])

  // const Homepage = () => {
  // const [itemscard, setItemscard] = useState(items)
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) navigate("/login");
}, []);

  const DeleteUser = () => { 
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/Login")
   }
  
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6">
      {/* User Info */}
      <div className="mb-8 flex flex-col gap-2 items-center cursor-pointer">
        <span className="rounded-full w-[90px] overflow-hidden bg-violet-600 p-2 h-[90px]">
          <User className="w-full h-full text-white"/>
        </span>
        <h2 className="text-lg font-semibold text-gray-800">{user.fullName}</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1 ">
        <Link to={"/"}>
        <div className="text-gray-700 flex items-center gap-3 cursor-pointer hover:bg-violet-600 hover:text-white rounded-[5px] px-1 py-2">
          <LayoutPanelLeft size="18" />
          <span>Dashboard</span>
        </div>
        </Link>
        <Link className="cursor-pointer" to={"/Income"} >
        <div className="text-gray-700 flex items-center gap-3 hover:bg-violet-600 hover:text-white rounded-[5px] px-1 cursor-pointer py-2">
          <Wallet size="18" />
          <span>Income</span>
        </div>
        </Link>
        <Link to={"/Expence"}>
        <div className="text-gray-700 flex items-center gap-3 hover:bg-violet-600 hover:text-white rounded-[5px] px-1 cursor-pointer py-2">
          <HandCoins size="18" />
          <span>Expense</span>
        </div>
        </Link>
        {token?
        <div onClick={DeleteUser} className="text-gray-700 flex items-center gap-3 hover:bg-violet-600 hover:text-white rounded-[5px] px-1 cursor-pointer py-2">
          <LogOut size="18" />
          <span>Logout</span>
        </div>
        :
        <Link to={"/Login"}>
        <div className="text-gray-300 flex items-center gap-3 bg-violet-600 hover:text-white rounded-[5px] px-1 cursor-pointer py-2">
          <LogOut size="18" />
          <span>Log in</span>
        </div>
        </Link>
        }
      </nav>
    </div>
  );
};

export default Sidebar;
