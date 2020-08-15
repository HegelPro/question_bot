import parseCvs from "../../game/parseCvs"
import * as fs from 'fs'
import * as path from 'path'

const cvs = fs.readFileSync(path.join(__dirname, '../../../assets/shemas/questTwo.csv'), 'utf8');

export default parseCvs(cvs)
