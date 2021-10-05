import { createContext } from "react";

export const localContext = {
    userAlias: localStorage.getItem("userAlias")
}

const UserInfoContext = createContext(localContext);

export function userAliasRefresh(newAlias: string) {
    localContext.userAlias = newAlias
}

export default UserInfoContext;