import { useState } from "react";
import Form from "./Form";
import UserList from "./UserList";
import { Grid } from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12} sm={4}>
        <Form addUser={addUser} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <UserList users={users} />
      </Grid>
    </Grid>
  );
}

export default App;