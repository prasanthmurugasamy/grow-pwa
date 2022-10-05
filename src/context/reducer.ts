import { defaultReducer } from "./defaultState";

const Reducer = (state = defaultReducer, action: { type: any; payload: any; }) => {
    const { type, payload } = action        
    switch (type) {
        default:
            return state
    }
}
export default Reducer;