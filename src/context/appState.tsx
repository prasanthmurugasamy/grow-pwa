import get from 'lodash/get'
import { gql, useQuery } from '@apollo/client'
import userContext from './userContext'

const EMPLOYEE_QUERY = gql`
query employee_name($email:String!) @cached(ttl: 300){
  employee (where:{email:{_eq:$email}}){
    id
    name
    user_id
    branch_employees(where:{deleted_at:{_is_null:true}}){
      branch_id
      team_id
    }
  }
}`

const AppState = (props:any) => {
  const email = get(props, 'authState.user.email', null)
  const roles = get(props, 'authState.roles', null)

  const { loading, data, error } = useQuery(
    EMPLOYEE_QUERY,
    {
      variables: { email: email },
      skip: !email
    }
  )

  let _data = {}
  if (!loading) {
    _data = data
  }
  const employees = get(_data, 'employee[0].branch_employees', [])
  const employee_id = get(_data, 'employee[0].id', null)
  const branch_ids = employees.map((employee: { branch_id: any }) => employee.branch_id)
  const team_ids=employees.map((employee: { team_id: any })=>employee.team_id)
  const employee_name = get(_data, 'employee[0].name', null)
  const auth_user_id = get(_data, 'employee[0].user_id', null)

  const user = { email, roles, employee_id,branch_ids,employee_name,team_ids, auth_user_id}

  return (
    <userContext.Provider value={user}>
        {props.children}
    </userContext.Provider>
  )
}

export default AppState
