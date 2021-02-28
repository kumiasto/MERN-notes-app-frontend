import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory } from "react-router-dom";
import { delete_note } from "../../request/delete_note_request";

const AllNotes = ({ userNotes }) => {
  const history = useHistory();

  return userNotes.map(({ _id, title, createdAt }) => (
    <div key={_id} className="notes-data">
      <div className="note-title">
        <Link to={`note/${_id}`}>
          <p className="note-title-element">{title}</p>
        </Link>
      </div>
      <div className="note-date">
        <p className="note-date-element">{createdAt.slice(0, 10)}</p>
      </div>
      <div className="note-button">
        <Link to={`note/${_id}`}>
          <button className="edit-button">
            <EditIcon className="edit-button-icon" />
          </button>
        </Link>
      </div>
      <div className="note-button">
        <button
          className="delete-button"
          onClick={async () => {
            await delete_note("/note/delete", _id);
            history.push("/");
            history.push("/notes");
          }}
        >
          <DeleteIcon className="delete-button-icon" />
        </button>
      </div>
    </div>
  ));
};
export default AllNotes;
