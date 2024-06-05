import { insertDB ,getDB ,saveDB } from "./db.js";

export const newNotes = async (note , tags) => {
    const newNote = {
        tags , 
        id : Date.now(),
        content : note,
    }

    await insertDB(newNote)
    return newNotes
}

export const getAllNotes = async () =>{
    const {notes} = await getDB()
    return notes
}

export const findNotes = async(filter) =>{
    const {notes} = await getDB()
    //this returns all the lines or notes containing the specific filter argument in them as a new array 
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id) => {
    const notes = await getAllNotes()
    const match = notes.find(note => note.id === id)

    if (match){
        const newNotes = notes.filter(note=>note.id != id)
        await saveDB({notes:newNotes})
        return id 
    }
}

export const removeAllNotes = () => saveDB({notes : []})




//REFER TO THE BELOW URL FOR ALL THE EXPLANATION FOR THE CODE IF STUCK REVIEWING 
//https://scottmoss.notion.site/Note-CRUD-54f302644e294d6992ba747ef1c5bf96 