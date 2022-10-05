import { createContext } from 'react'

interface contextType{
    email:string|null,
    roles:number|null,
    employee_id:number|null,
    branch_ids:any|null,
    team_ids:any|null,
    auth_user_id:any|null
}

const userContext = createContext<contextType>({email:null,roles:null,employee_id:null,branch_ids:null,team_ids:null,auth_user_id:null})

export default userContext
