const path = require('path')
const Max = require('max-api')
const { exec, execSync } = require('child_process')
const done = () => {
  Max.outlet('spleeterDone')
}

const MODEL_NAME = 'mdx_extra_q'

Max.post(`Loaded the ${path.basename(__filename)} script`)
// Docker's default path may not be in Max Node's env path
process.env.PATH = [process.env.PATH, '/usr/local/bin'].join(':')
Max.outlet('bang')

// Use the 'addHandler' function to register a function for a particular
// message
Max.addHandlers({
  onFile: (filename) => {
    if (!filename) {
      Max.post('No audio file found.')
      done()
      return
    }
    runSpleeter(filename)
  }
})

const showDir = (dir) => {
  // Since LOM has no way to load these files automatically into new tracks,
  // just open a file dialog and let the user drag-and-drop them.
  let opener
  if (process.platform === 'darwin') {
    opener = 'open'
  } else if (process.platform === 'win32') {
    opener = 'start ""'
  } else {
    Max.post(`Unsupported platform: ${process.platform}`)
  }
  execSync(`${opener} "${dir}"`)
  Max.outlet('set', `Select a clip; then press the button to start.`)
}

const runSpleeter = (filename) => {
  const cmd = `demucs -n ${MODEL_NAME} "${filename}"`
  Max.outlet('set', `Demucs is running. This will take a while...`)
  Max.post(cmd)

  // Calls the spleeter python process
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      Max.outlet('set', `Error: ${err.message}`)
      Max.post(`Error: ${err.message}`)
      Max.post(`Spleeter stderr: ${stderr}`)
      Max.post(`Spleeter stdout: ${stdout}`)
      done()
      return
    }
    if (stderr) {
      Max.post(`Spleeter stderr: ${stderr}`)
    }
    if (stdout) {
      Max.post(`Spleeter stdout: ${stdout}`)
    }
    const correctFilename = path.basename(filename).split('.').slice(0, -1).join('.')
    const outputFilename = path.join(__dirname, 'separated', MODEL_NAME, correctFilename)
    showDir(outputFilename)
    done()
  })
}
