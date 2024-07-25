import {ID,Account,Client} from "appwrite"
import Config from "react-native-config"
import Snackbar from "react-native-snackbar"

const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_project_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    name: string,
    email: string,
    password: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}


class AppwriteService {
    account;

    constructor() {
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT)
        appwriteClient.setProject(APPWRITE_project_ID)

        this.account = new Account(appwriteClient)
    }

    // create a new record  of user inside appwrite

    async createAccount ({email,password,name}:CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                name,
                email,
                password,
            )

            if(userAccount){
                // todo : create login feature
                return this.login({
                    email,
                    password,
                })
            }
            
        } catch (error:any) {
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
            })
            console.error("Appwrite servies:: createAccount() ",error)
            
        }
    }

    async login ({email,password}:LoginUserAccount){
        try {
          return  await this.account.createEmailPasswordSession(email,password)
            
        } catch (error:any) {
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
            })
            console.error("Appwrite servies:: login() ",error)
            
        }
    }

    async getCurrentUser (){
        try {
            const user = await this.account.get()
            return user
            
        } catch (error:any) {
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
            })
            console.error("Appwrite servies:: getCurrentUser() ",error)
            
        }
    }

    async logout(){
        try {
            await this.account.deleteSession('current')
            
        } catch (error:any) {
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
            })
            console.error("Appwrite servies:: logout() ",error)
            
        }
    }

}

export default  AppwriteService