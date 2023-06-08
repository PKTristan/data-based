import React, {useState} from "react";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/server";
import { useModal } from "../../context/Modal";
import './ServerForm.css';

const CreateServerForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    // const [errors, setErrors] = useState([]);
    const [serverName, setServerName] = useState("");
    const [serverType, setServerType] = useState("");
    const [avatar, setAvatar] = useState("");
    const [serverDetails, setServerDetails] = useState("");
    const [privateServer, setPrivateServer] = useState(false);
    const [directMessage, setDirectMessage] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newServer = {
            server_name: serverName,
            server_type: serverType,
            avatar: avatar,
            server_details: serverDetails,
            private: privateServer,
            direct_message: directMessage
        }
    
        const data = await dispatch(serverActions.createServerAction(newServer));
        dispatch(serverActions.fetchServers());
        closeModal();
    
    }
    return (
        <div className="server-form">
            <h2>Create Server</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Server Name:
                    <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Server Type:
                    <select
                        value={serverType}
                        onChange={(e) => setServerType(e.target.value)}
                        required
                    >
                        <option value="gaming">Gaming</option>
                        <option value="sports">Sports</option>
                        <option value="anime">Anime</option>
                        <option value="art">Art</option>
                        <option value="studying">Studying</option>
                        <option value="misc">Miscellaneous</option>
                    </select>
                </label>
                <br/>
                <label>
                    Avatar:
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Server Details:
                    <textarea
                        type="text"
                        value={serverDetails}
                        onChange={(e) => setServerDetails(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Private Server:
                    <input
                        type="checkbox"
                        checked={privateServer}
                        onChange={(e) => setPrivateServer(e.target.checked)}
                    />
                </label>
                <br/>
                <label>
                    DM:
                    <input
                        type="checkbox"
                        checked={directMessage}
                        onChange={(e) => setDirectMessage(e.target.checked)}
                    />
                </label>
                <br/>
                <button className="server-submit-btn" type="submit">Create Server</button>
            </form>
        </div>

    )
}

export default CreateServerForm