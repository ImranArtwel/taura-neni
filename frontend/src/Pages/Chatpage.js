import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useRef } from "react";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const User = useRef({});
  useEffect(() => {
    User.current = user;
  }, [user]);

  return (
    <div style={{ width: "100%" }}>
      {User.current && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {User.current && <MyChats fetchAgain={fetchAgain} />}
        {User.current && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
