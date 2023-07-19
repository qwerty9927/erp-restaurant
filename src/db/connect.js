import AppDataSource from "./data-source.js"

class Connection {
  static connect() {
    AppDataSource.initialize().then(() => {
      console.log("Data source has been instialized")
    }).catch((err) => {
      console.log("Error during data sourse init", err)
    })
  }
  static getInstance() {
    if(AppDataSource.isInitialized){
      return AppDataSource
    } else {
      this.connect()
      return AppDataSource
    }
  }
}

export default Connection