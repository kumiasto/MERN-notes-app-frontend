import { useState } from "react";
import { format } from "timeago.js";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Note = ({ note }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            <>
              <IconButton onClick={handleOpenEdit} color="secondary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleOpenDelete} color="secondary">
                <DeleteOutlined />
              </IconButton>
            </>
          }
          title={note.title}
          subheader={`added ${format(note.createdAt)}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.content}
          </Typography>
        </CardContent>
      </Card>
      <DeleteModal open={openDelete} setOpen={setOpenDelete} note={note} />
      <EditModal open={openEdit} setOpen={setOpenEdit} note={note} />
    </div>
  );
};

export default Note;
