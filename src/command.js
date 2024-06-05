import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { newNotes, getAllNotes ,findNotes ,removeAllNotes ,removeNote } from './notes.js'

const listNotes = (notes) => {
  notes.forEach(note => {
    console.log('\n')
    console.log('id: ', note.id)
    console.log('tags: ', note.tags.join(', ')),
    console.log('content: ', note.content)
  })
}



yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note', yargs => {
    //Positional arguments are the arguments that come after the command and are identified by their position in the argument list.
    return yargs.positional('note', {
      describe: 'The content of the note you want to create',
      type: 'string'
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : []
    const note = await newNotes(argv.note , tags )
    console.log('New Note', note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })

  //Command to get all the notes 
  .command('all', 'get all notes', () => {}, async (argv) => {
    const notes = await getAllNotes()
    listNotes(notes)
    
  })



  //command to find the notes 
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter)
    listNotes(matches)
  })


  // Command to delete the notes 
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await removeNote(argv.id)
    console.log(id, 'Deleted the note with following Id ')
    
  })


  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {

  })



  //Clearing the whole database
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNotes()
    console.log('db reseted')
  })
  .demandCommand(1)
  .parse()