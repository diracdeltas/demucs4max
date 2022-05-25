const path = require('path')
const Max = require('max-api')
const { exec, execSync, spawnSync } = require('child_process')
const done = () => {
  Max.outlet('spleeterDone')
}

const MODEL_NAME = 'mdx_extra_q'
const isWindows = process.platform === 'win32'
const PYTHON = isWindows ? 'python' : 'python3'

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
  const opener = isWindows ? 'start ""' : 'open'
  execSync(`${opener} "${dir}"`)
  Max.outlet('set', `Select a clip; then press the button to start.`)
}

const demucsInPath = () => {
  Max.outlet('set', 'Checking demucs installation...')
  const which = isWindows ? : 'where' : 'which'
  // Return true if demucs is in the path
  return spawnSync(which, ['demucs']).status === 0
}

const runSpleeter = (filename) => {
  let cmd = `demucs -n ${MODEL_NAME} "${filename}"`
  cmd = demucsInPath() ? cmd : `${PYTHON} -m ${cmd}`
  Max.outlet('set', `Demucs is running. This will take a while...`)
  Max.post(cmd)

  // Calls the spleeter python process
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      Max.outlet('set', err.message)
      Max.post(err.message)
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
