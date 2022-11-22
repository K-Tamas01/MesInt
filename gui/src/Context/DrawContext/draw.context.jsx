import { createContext, useState } from "react";

export const DrawContext = createContext({})

const DrawProvider = ({ children }) => {
    const [drawData, setDrawData] = useState(null)
    return(
        <DrawContext.Provider value={{drawData, setDrawData}}>
            {children}
        </DrawContext.Provider>
    )
}

export default DrawProvider