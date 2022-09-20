import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteSate = (props) => {
const notesInitial = [
    {
      "_id": "630730775cd69630469a46a7",
      "user": "62ea807d257261569689d04b",
      "title": "my title2",
      "description": "one step ahead to the success",
      "tag": "persnal",
      "date": "2022-08-25T08:19:03.878Z",
      "__v": 0
    },
    {
      "_id": "631b53612973a8bcc4c85228",
      "user": "62ea807d257261569689d04b",
      "title": "my title1",
      "description": "one step ahead to the success",
      "tag": "persnal",
      "date": "2022-09-09T14:53:21.335Z",
      "__v": 0
    },
    {
      "_id": "631c9c9abcbc48ad632aa368",
      "user": "62ea807d257261569689d04b",
      "title": "my title1",
      "description": "one step ahead to the success",
      "tag": "persnal",
      "date": "2022-09-10T14:18:02.894Z",
      "__v": 0
    }
  ]
  const [notes ,setnotes] = useState(notesInitial);
return (
    <NoteContext.Provider value={{notes , setnotes}}>
        {props.children }
    </NoteContext.Provider>
)
}

export default NoteSate;