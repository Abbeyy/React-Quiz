import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";
import Home from "../../home/home";

type OriginSide = "top" | "left" | "bottom" | "right";

export const NavigationDrawer = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: OriginSide, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //   <nav>
  //             <ul>
  //               <li>
  //                 <Link to="/">Home</Link>
  //               </li>
  //               <li>
  //                 <Link to="/quiz">React Quiz</Link>
  //               </li>
  //             </ul>
  //           </nav>

  const list = (anchor: OriginSide) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home"].map((text) => (
          <Link to="/">
            <ListItem button key={text}>
              <ListItemIcon>{<p>icon here </p>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Quiz"].map((text) => (
          <Link to="quiz">
            <ListItem button key={text}>
              <ListItemIcon>{<p>icon here </p>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const title = "Menu";
  const anchor: OriginSide = "left";

  return (
    <div>
      <React.Fragment key={title}>
        <Button onClick={toggleDrawer(anchor, true)}>{title}</Button>
        <Drawer
          anchor={anchor as OriginSide}
          open={state[anchor as OriginSide]}
          onClose={toggleDrawer(anchor as OriginSide, false)}
        >
          {list(anchor as OriginSide)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
