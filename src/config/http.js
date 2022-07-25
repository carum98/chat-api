import { createServer } from "http"
import ExpressApp from './express.js'

const httpServer = createServer(ExpressApp)

export default httpServer